import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';

const Todo = ({closeModal,toast,refetch}) => {
    const [agree,setAgree]=useState(false)
    const [user, loading, error] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const onSubmit = data => {
        fetch('https://blooming-forest-72562.herokuapp.com/task',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>{
            if(res.status===200){
                closeModal()
                return res.json()

            }
            
        })
          .then(data=>{
              reset()
              refetch()
              toast.success(`${data.task} has created successfully`)
              console.log(data)
            })
    };
    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-2'>
                    <label htmlFor="task">Task</label>
                    <input {...register("task",{required:true})} placeholder="Task" className='w-full border-2 rounded-lg outline-none p-2' id='task'/>
                    {errors.task?.type === 'required' && "Task name is required"}
                </div>
                <div className='mb-2'>
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description",{required:true})} placeholder="Description" className='w-full border-2 rounded-lg outline-none p-2' id='description'/>
                    {errors.description?.type === 'required' && "Description is required"}
                </div>
                <div className='mb-2'>
                    <label htmlFor="initialDate">Intial Date</label>
                    <input type={'date'}{...register("initialDate",{required:true})} className='w-full border-2 rounded-lg outline-none p-2' id='initialDate'/>
                    {errors.initialDate?.type === 'required' && "Initial date is required"}
                </div>
                <div className='mb-2'>
                    <label htmlFor="dateLine">Date Line</label>
                    <input type={'date'}{...register("dateLine",{required:true})} className='w-full border-2 rounded-lg outline-none p-2' id='dateLine'/>
                    {errors.dateLine?.type === 'required' && "Date line is required"}
                </div>
                <div className='mb-2 p-2'>
                    <input type={'checkbox'}{...register("status",)} className='outline-none text-lg mr-2' id='status' onChange={(e)=>setAgree(e.target.checked)}/>
                    <label htmlFor="status" className={agree?'text-green-600':''}>Completed</label>
                </div>

                <div className='mb-2'>
                    <input type={'email'}{...register("email",{value:user?.email})} className='w-full border-2 rounded-lg outline-none p-2' defaultValue={user?.email} readOnly disabled/>
                </div>
                <div className='my-3'>
                    <input type="submit" value={'Add'} className='w-full p-2 text-white bg-blue-600 font-bold text-lg rounded-lg cursor-pointer'/>

                </div>
                
            </form>
        </div>
    );
};

export default Todo;