import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from '../Todo/Todo';
import CustomModal from '../CustomModal/CustomModal';
import CustomSpinner from '../CustomSpinner/CustomSpinner'
import { useQuery } from 'react-query';

const TodoList = () => {
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const closeModal=()=>{
        setModalIsOpen(false)

    }
    const createTask=()=>{
        setModalIsOpen(true)
    }
    const {data:tasks,isLoading,refetch}=useQuery('tasks',()=>(
        fetch('https://blooming-forest-72562.herokuapp.com/tasks')
           .then(res=>res.json())
    ))
    if(isLoading){
        return <CustomSpinner/>
    }
    const deleteTask=(id)=>{
        fetch(`https://blooming-forest-72562.herokuapp.com/task/${id}`,{
               method:"DELETE",
               headers:{
                   "content-type":"application/json"
               }
        }).then(res=>res.json)
           .then(data=>{
               refetch()
               toast.success('The task is deleted successfully')

           })
    }
    return (
        <div className='w-5/6 mx-auto'>
            <ToastContainer/>
            <CustomModal closeModal={closeModal} modalIsOpen={modalIsOpen}>
                <Todo closeModal={closeModal} toast={toast} refetch={refetch}/>
            </CustomModal>
            <div className='text-center my-5'>
                <button className='text-5xl text-blue-600' onClick={createTask}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Task
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Description
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Date
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Owner
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks?.map((task,index)=>(
                                    <tr key={task._id} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.task}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.description}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.date}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.email}
                                        </td>
                                        <td className='text-center'>
                                            <button className='h-[30px] w-[30px] rounded-lg bg-red-600 text-white' onClick={()=>deleteTask(task?._id)}><FontAwesomeIcon icon={faTrash}/></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;