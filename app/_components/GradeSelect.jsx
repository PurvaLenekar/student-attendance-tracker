"use client";

import React, { useState, useEffect } from 'react';
import GlobalApi from '../_services/GlobalApi';

const GradeSelect = ({ onGradeSelect }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then(resp => {
      setGrades(resp.data);
    });
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => onGradeSelect(e.target.value)}
      >
        <option value="">Select Grade</option>
        {grades.map((item, index) => (
          <option key={index} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
