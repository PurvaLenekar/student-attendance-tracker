


"use client";

import React, { useEffect, useState } from 'react';
import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import Card from './Card';

const StatusList = ({ attendanceList }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);
  const [absentPerc, setAbsentPerc] = useState(0);

  useEffect(() => {
    if (Array.isArray(attendanceList) && attendanceList.length > 0) {
      // Get unique students
      const studentIds = [...new Set(attendanceList.map((item) => item.StudentId))];
      const total = studentIds.length;
      setTotalStudents(total);

      // Get unique dates (assuming correct format in DB like '06/2025' or ISO date)
      const uniqueDates = [...new Set(attendanceList.map((item) => moment(item.date, 'MM/YYYY').format('YYYY-MM-DD')))].length;

      const totalSlots = total * uniqueDates;

      // Count actual presents
      const presentCount = attendanceList.filter((item) => item.present === true).length;

      const presentPercentage = totalSlots > 0 ? (presentCount / totalSlots) * 100 : 0;
      const absentPercentage = 100 - presentPercentage;

      setPresentPerc(presentPercentage.toFixed(2));
      setAbsentPerc(absentPercentage.toFixed(2));
    } else {
      setTotalStudents(0);
      setPresentPerc(0);
      setAbsentPerc(0);
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-6">
      <Card icon={<GraduationCap />} title="Total Students" value={totalStudents} />
      <Card icon={<TrendingUp />} title="Total % Present" value={`${presentPerc}%`} />
      <Card icon={<TrendingDown />} title="Total % Absent" value={`${absentPerc}%`} />
    </div>
  );
};

export default StatusList;





