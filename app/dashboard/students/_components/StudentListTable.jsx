'use client';

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from '@/app/_services/GlobalApi';
import {toast} from 'react-hot-toast' ;

const pagination = true;
const paginationPageSize = 10;

const StudentListTable = ({studentList , refreshData}) => {
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

    const DeleteRecord =(id) =>{
        GlobalApi.DeleteStudentRecord(id).then(resp=>{
            if(resp){
                toast('Record deleted successfully !')
                refreshData()
            }
        });
    };

  const CustomButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash size={14} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your record
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=> DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id', filter: true },
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Address', field: 'address', filter: true },
    { headerName: 'Contact', field: 'contact', filter: true },
    {
      headerName: 'Action',
      field: 'action',
      cellRenderer: CustomButtons,
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get('/api/student');
  //       setRowData(res.data);
  //     } catch (error) {
  //       console.error('Error fetching student data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    setRowData(studentList); // Bind prop to local state
  }, [studentList]);

    
  return (
    <div className="ag-theme-alpine my-7" style={{ height: 500, width: '100%' }}>
      <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
        <Search />
        <input
          type="text"
          placeholder="Search on Anything..."
          className="outline-none w-full"
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchInput}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default StudentListTable;
