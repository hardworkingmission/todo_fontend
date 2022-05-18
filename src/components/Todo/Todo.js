import React from 'react';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';

const Todo = ({closeModal,toast,refetch}) => {
    const [user, loading, error] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const onSubmit = data => {
        
        fetch('http://localhost:5000/task',{
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
                    <input {...register("task",{required:true})} placeholder="Task" className='w-full border-2 rounded-lg outline-none p-2'/>
                    {errors.task?.type === 'required' && "Task name is required"}
                </div>
                <div className='mb-2'>
                    <textarea {...register("description",{required:true})} placeholder="Description" className='w-full border-2 rounded-lg outline-none p-2'/>
                    {errors.description?.type === 'required' && "Description is required"}
                </div>
                <div className='mb-2'>
                    <input type={'date'}{...register("date",{required:true})} className='w-full border-2 rounded-lg outline-none p-2'/>
                    {errors.date?.type === 'required' && "Date is required"}
                </div>
                <div className='mb-2'>
                    <input type={'email'}{...register("email",{value:user?.email})} className='w-full border-2 rounded-lg outline-none p-2' defaultValue={user?.email} readOnly/>
                </div>
                <div className='my-3'>
                    <input type="submit" value={'Complete'} className='w-full p-2 text-white bg-blue-600 font-bold text-lg rounded-lg cursor-pointer'/>

                </div>
                
            </form>
        </div>
    );
};

export default Todo;