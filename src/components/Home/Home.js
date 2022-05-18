import React from 'react';
import TodoList from '../TodoList/TodoList';

const Home = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <section>
                <TodoList/>
            </section>
            
        </div>
    );
};

export default Home;