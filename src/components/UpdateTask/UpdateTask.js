import React, { useEffect, useState } from 'react';
import { format} from 'date-fns'
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';

const UpdateTask = ({closeModal,toast,refetch,id}) => {
    const [task,setTask]=useState({})
    //const [state,setState]=useState({task:'',description:'',dateLine:'',initialDate:''})

    const handleChange=(e)=>{
        setTask({...task,[e.target.name]:e.target.value})
    }
    
    useEffect(()=>{
        fetch(`https://blooming-forest-72562.herokuapp.com/task/${id}`)
             .then(res=>res.json())
             .then(data=>setTask(data))
        
    },[id])
    const handleSubmit =(e) => {
        e.preventDefault()
            fetch(`https://blooming-forest-72562.herokuapp.com/task/${id}`,{
               method:"PATCH",
               headers:{
                   "content-type":"application/json"
               },
               body:JSON.stringify(task)
            }).then(res=>res.json)
            .then(data=>{
                refetch()
                closeModal()
                toast.success('The task is updated successfully')

            }) 
    };
    
    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="task">Task</label>
                    <input type={'text'} name='task' className='w-full border-2 rounded-lg outline-none p-2' id='task' value={task.task} onChange={handleChange}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="description">Description</label>
                    <textarea rows={3} type={'text'} name='description' className='w-full border-2 rounded-lg outline-none p-2' id='description' value={task.description} onChange={handleChange}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="initialDate">Initial Date</label>
                    <input type={'date'} name='initialDate' className='w-full border-2 rounded-lg outline-none text-black-600 p-2' id='initialDate' value={task.initialDate} onChange={handleChange}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="dateLine">Date Line</label>
                    <input type={'date'} name='dateLine' className='w-full border-2 rounded-lg outline-none p-2' id='dateLine' value={task.dateLine} onChange={handleChange}/>
                </div>
                <div className='my-3'>
                    <input type="submit" value={'Update'} className='w-full p-2 text-white bg-blue-600 font-bold text-lg rounded-lg cursor-pointer'/>

                </div>
                
            </form>
        </div>
    );
};

export default UpdateTask;