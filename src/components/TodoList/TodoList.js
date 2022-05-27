import React from 'react';
import CustomSpinner from '../CustomSpinner/CustomSpinner'
import { useQuery } from 'react-query';

const TodoList = () => {
    const {data:tasks,isLoading,refetch}=useQuery('tasks',()=>(
        fetch('https://blooming-forest-72562.herokuapp.com/tasks')
           .then(res=>res.json())
    ))
    if(isLoading){
        return <CustomSpinner/>
    }
    return (
        <div className='w-5/6 mx-auto'>
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
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                Owner
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks?.map((task,index)=>(
                                    <tr key={task._id} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.task}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.description}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.initialDate}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.dateLine}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.email}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-2 py-4 whitespace-wrap">
                                            {task?.status?<span className='text-green-600  font-[500]'>Completed</span>:<span className='text-red-600 font-[500]'>Pending</span>}   
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