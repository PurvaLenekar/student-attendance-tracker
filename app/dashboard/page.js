"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState([]);
  

  useEffect(() => {
    if (selectedMonth && selectedGrade) {
      getStudentAttendance();
    }
  }, [selectedMonth, selectedGrade]);

  const getStudentAttendance = () => {
    const formattedMonth = moment(selectedMonth).format("MM/YYYY");

    GlobalApi.GetAttendanceList(selectedGrade, formattedMonth)
      .then((resp) => {
        setAttendanceList(resp.data); // ✅ use resp.data
      })
      .catch((error) => {
        console.error("Failed to fetch attendance:", error);
      });
  };


 

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection onMonthSelect={setSelectedMonth} />
          <GradeSelect onGradeSelect={setSelectedGrade} />
        </div>
      </div>

      {/* ✅ pass down clean array */}
      <StatusList attendanceList={attendanceList} />
    </div>
  );
};

export default Dashboard;