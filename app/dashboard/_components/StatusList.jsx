"use client";

import React, { useEffect, useState } from 'react';
import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import Card from './Card';
// Dummy Card component for illustration (replace with actual one if needed)

const StatusList = ({ attendanceList }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (Array.isArray(attendanceList) && attendanceList.length > 0) {
      // Filter out valid attendance entries
      const validAttendance = attendanceList.filter(
        (item) => item.present !== null && item.name
      );

      // Unique students by name
      const uniqueNames = [...new Set(validAttendance.map((item) => item.name))];
      const total = uniqueNames.length;

      setTotalStudents(total);

      const today = Number(moment().format("D"));
      const totalSlots = total * today;

      const actualPresent = validAttendance.filter((item) => item.present === true).length;

      const percentage = totalSlots > 0 ? (actualPresent / totalSlots) * 100 : 0;
      setPresentPerc(percentage.toFixed(2));
    } else {
      setTotalStudents(0);
      setPresentPerc(0);
    }
  }, [attendanceList]);

  const absentPerc = (100 - presentPerc).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-6">
      <Card icon={<GraduationCap />} title="Total Students" value={totalStudents} />
      <Card icon={<TrendingUp />} title="Total % Present" value={`${presentPerc}%`} />
      <Card icon={<TrendingDown />} title="Total % Absent" value={`${absentPerc}%`} />
    </div>
  );
};

export default StatusList;
