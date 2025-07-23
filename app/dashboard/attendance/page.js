"use client"
import React , {useState , useEffect}from 'react'
import MonthSelection from '@/app/_components/MonthSelection'
import GradeSelect from '@/app/_components/GradeSelect'
import { Button } from '@/components/ui/button'
import GlobalApi from '@/app/_services/GlobalApi'
import moment from 'moment'
import AttendanceGrid from './_components/AttendanceGrid'


const Attendance = () => {
    const [selectedMonth , setSelectedMonth] = useState(new Date());
    const [selectedGrade , setSelectedGrade] = useState('');
    const [attendanceList , setAttendceList] = useState();

    const onSearchHandler = () => {
        const month=moment(selectedMonth).format('MM/YYYY');
        GlobalApi.GetAttendanceList(selectedGrade, month).then(resp=>{
            setAttendceList(resp.data);
        }) 
    };

  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Attendance</h2>

        <div className='flex gap-5 p-5 my-5 border rounded-lg shadow-sm'>
            <div className='flex gap-2 items-center'>
                <label>Select Month:</label>
                <MonthSelection onMonthSelect={(value) =>setSelectedMonth(value)}/>
            </div>

            <div className='flex gap-2 items-center'>
                <label>Select Grade:</label>
                <GradeSelect onGradeSelect={(v) =>setSelectedGrade(v)}/>
            </div>

            <Button onClick={onSearchHandler}>Search</Button>
            
        </div>
        <AttendanceGrid attandanceList={attendanceList}
        selectedMonth={selectedMonth}/>
    </div>
  )
}

export default Attendance