import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash,faEdit,faCheck} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from '../Todo/Todo';
import CustomModal from '../CustomModal/CustomModal';
import CustomSpinner from '../CustomSpinner/CustomSpinner'
import CustomConfirm from '../CustomConfirm/CustomConfirm'
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import UpdateTask from '../UpdateTask/UpdateTask';

const TodoList = () => {
    const [user]=useAuthState(auth)
    const [taskId,setTaskId]=useState('')
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [operation,setOperation]=useState('')
    const [confirmIsOpen,setConfirmIsOpen]=useState(false)
    const closeModal=()=>{
        setModalIsOpen(false)

    }
    const closeConfirm=()=>{
        setConfirmIsOpen(false)

    }
    const createTask=(create)=>{
        if(create){
            setModalIsOpen(true)
            setOperation(create)

        }
        
    }
    const email=user?.email
    const {data:tasks,isLoading,refetch}=useQuery(['tasks',email],()=>(
        fetch(`https://blooming-forest-72562.herokuapp.com/tasks?email=${email}`)
           .then(res=>res.json())
    ))
    if(isLoading){
        return <CustomSpinner/>
    }
    const handleConfirm=(confirm)=>{
        if(confirm){
            setConfirmIsOpen(false)
            fetch(`https://blooming-forest-72562.herokuapp.com/task/${taskId}`,{
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
    }
    const deleteTask=(id)=>{
        setTaskId(id)
        setConfirmIsOpen(true)
        
    }
    const updateTask=(id,update)=>{
        if(update){
            setModalIsOpen(true)
            setOperation(update)
            setTaskId(id)
        }
    }
    const completeTask=(id)=>{
        const status={status:true}
        
        if(id){
            fetch(`https://blooming-forest-72562.herokuapp.com/task/${id}`,{
               method:"PATCH",
               headers:{
                   "content-type":"application/json"
               },
               body:JSON.stringify(status)
            }).then(res=>res.json)
            .then(data=>{
                refetch()
                toast.success('The task is completed successfully')

            })
        }
    }
    return (
        <div className='w-5/6 mx-auto'>
            <ToastContainer/>
            <CustomModal closeModal={closeModal} modalIsOpen={modalIsOpen}>
                {
                    operation==='create'&&<Todo closeModal={closeModal} toast={toast} refetch={refetch}/>

                }{
                    operation==='update'&&<UpdateTask closeModal={closeModal} toast={toast} id={taskId} refetch={refetch}/>

                }
                
            </CustomModal>
            <CustomConfirm closeModal={closeConfirm} modalIsOpen={confirmIsOpen} handleConfirm={handleConfirm}/>
            <div className='text-center my-5'>
                <button className='text-5xl text-blue-600' onClick={()=>createTask('create')}><FontAwesomeIcon icon={faPlus}/></button>
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
                                  Initial date
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Dateline
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Status
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
                                            {task?.initialDate}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.dateLine}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                            {task?.status?<span className='text-green-600  font-[500]'>Completed</span>:<span className='text-red-600 font-[500]'>Pending</span>}
                                        </td>
                                        <td className='text-center'>
                                            <div>
                                            {
                                                task?.status?
                                                ''
                                                :(
                                                    <div className='flex gap-1'>
                                                      <button className='h-[30px] w-[30px] rounded-lg bg-green-600 text-white' onClick={()=>completeTask(task?._id)}><FontAwesomeIcon icon={faCheck}/></button>
                                                      <button className='h-[30px] w-[30px] rounded-lg bg-blue-600 text-white' onClick={()=>updateTask(task?._id,'update')}><FontAwesomeIcon icon={faEdit}/></button>
                                                      <button className='h-[30px] w-[30px] rounded-lg bg-red-600 text-white' onClick={()=>deleteTask(task?._id)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </div >
                                                )
                                            }

                                            </div>
                                            
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