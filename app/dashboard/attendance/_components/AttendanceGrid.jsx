'use client';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import toast from 'react-hot-toast';

const AttendanceGrid = ({ attandanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  const numberOfDays = moment(selectedMonth, "MM/YYYY").daysInMonth();
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    if (!Array.isArray(attandanceList)) return;

    const uniqueRecords = getUniqueRecord(attandanceList);

    const enrichedRecords = uniqueRecords.map((record) => {
      const enriched = { ...record };
      daysArray.forEach((day) => {
        // ✅ Fixed this line (was: Object.StudentId)
        enriched[day.toString()] = isPresent(record.StudentId, day);
      });
      return enriched;
    });

    setRowData(enrichedRecords);

    setColDefs([
      {
        headerName: 'Student ID',
        field: 'StudentId',
        filter: true,
        headerClass: 'header-border', // ✅ Only header border
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        headerClass: 'header-border',
        cellStyle: { textAlign: 'center' },
      },
      ...daysArray.map((day) => ({
        headerName: day.toString(),
        field: day.toString(),
        editable: true,
        width: 80,
        headerClass: 'header-border',
        cellRenderer: CheckboxRenderer,
        cellStyle: {
          textAlign: 'center',
          padding: '2px',
          border: 'none', // ✅ No border on data cells
        },
      })),
    ]);
  }, [attandanceList, selectedMonth]);

  const isPresent = (StudentId, day) => {
    const result = attandanceList.find(
      (item) => item.day == day && item.StudentId == StudentId
    );
    return result ? true : false;
  };

  const onMarkAttendance = (day, StudentId, presentStatus) => {
      const date = moment(selectedMonth).format('MM/YYYY');

      if (presentStatus) {
        const data = {
          day: day,
          StudentId: StudentId,
          present: presentStatus,
          date: date,
        };

        GlobalApi.MarkAttendance(data).then((resp) => {
          console.log(resp);
          toast(`Student ID: ${StudentId} marked as present`); // ✅ FIXED
        });
      }
      else{
          GlobalApi.MarkAbsent(StudentId , day , date)
          .then(resp=>{
            toast(`Student ID: ${StudentId} marked as absent`);
          })
      }
  };

  const getUniqueRecord = (list) => {
    const uniqueRecord = [];
    const existingUser = new Set();
    list.forEach((record) => {
      if (!existingUser.has(record.StudentId)) {
        existingUser.add(record.StudentId);
        uniqueRecord.push(record);
      }
    });
    return uniqueRecord;
  };

  const CheckboxRenderer = (params) => {
    return (
      <input
        type="checkbox"
        checked={params.value}
        onChange={() => {
          const newValue = !params.value;
          params.node.setDataValue(params.colDef.field, newValue);
        }}
        style={{
          cursor: 'pointer',
          margin: '4px',
        }}
      />
    );
  };

  return (
    <div className="ag-theme-alpine my-7" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        onCellValueChanged={(e) => onMarkAttendance(e.colDef.field , e.data.StudentId, e.newValue)}
      />
    </div>
  );
};

export default AttendanceGrid;
