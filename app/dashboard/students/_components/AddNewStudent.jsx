"use client"

import React, {useEffect, useState} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LoaderIcon } from 'lucide-react';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GlobalApi from '@/app/_services/GlobalApi'
import { Option } from 'lucide-react'

const AddNewStudent = ({refreshData}) => {
    const [open, setOpen] = useState(false);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    } = useForm()

    useEffect(()=>{
        GetAllGradesList();
    }, [])

    const GetAllGradesList=()=>{
        GlobalApi.GetAllGrades().then(resp=>{
            setGrades(resp.data);
        })
    }

    const onSubmit=(data) =>{
        setLoading(true);
        GlobalApi.CreateNewStudent(data).then(resp=>{
            console.log("--",resp);
            if(resp.data){
                reset();
                refreshData();
                setOpen(false);
                toast('New Student Added!')
            }
            setLoading(false);
        })
    }


  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
                Please fill out the student details below.
            </DialogDescription>
            </DialogHeader>

            {/* Move form out of DialogDescription */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'>
                <label>Full Name</label>
                <Input placeholder='Ex. Jhon Carry ' {...register('name' , {required:true})}/>
                </div>

                <div className='flex flex-col py-2'>
                <label>Select Grade</label>
                <select className='p-3 border rounded-lg'  {...register('grade' , {required:true})}>
                    {grades.map((item, index) =>(
                        <option key={index} value={item.grade}>{item.grade}</option>
                    ))}
                </select>
                </div>

                <div className='py-2'>
                <label>Contact Number</label>
                <Input type="number" placeholder='Ex. 1234567890 '  {...register('contact' )}/>
                </div>

                <div className='py-2'>
                <label>Address</label>
                <Input placeholder='Ex. 525 N tryon Street, NC '  {...register('address')}/>
                </div>

                <div className='flex gap-3 items-center justify-end mt-5'>
                <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                <Button  type="submit" disabled={loading}>
                    {loading ? <Loader className="animate-spin" /> : 'Save'}
                </Button>
                </div>
            </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewStudent;
