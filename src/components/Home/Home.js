import React from 'react';
import TodoList from '../TodoList/TodoList';

const Home = () => {
    return (
        <div className='w-5/6 mx-auto py-[100px]'>
            <h3 className='text-5xl text-blue-600 text-center'>Welcome to TodoDesk</h3>
            <div>
                <TodoList/>
            </div>
        </div>
    );
};

export default Home;