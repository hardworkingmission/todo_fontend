import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate=useNavigate()
    console.log(user?.email)
    return (
        <div>
            <nav class="
                relative
                w-5/6
                mx-auto
                flex flex-wrap
                items-center
                justify-between
                py-4
                bg-gray-100
                text-gray-500
                hover:text-gray-700
                focus:text-gray-700
                shadow-lg
                navbar navbar-expand-lg navbar-light
                ">
            <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <button class="
                navbar-toggler
                text-gray-500
                border-0
                hover:shadow-none hover:no-underline
                py-2
                px-2.5
                bg-transparent
                focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
            " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
            class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
            </path>
            </svg>
            </button>
            <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
            <Link class="text-xl text-black" to={'/'}>TodoDesk</Link>
            {/* <!-- Left links --> */}
            <ul class="navbar-nav flex flex-col pl-0 list-style-none ml-auto">
                <li class="nav-item px-2">
                    <Link class="nav-link active" aria-current="page" to={'/todotask'}>My List</Link>
                </li>
                {
                    user?.uid?
                    <li class="nav-item px-2">
                        <button className='bg-blue-600 text-white p-2 rounded-lg' onClick={()=>{
                            signOut(auth)
                            navigate('/')}}>SignOut</button>
                    </li>
                    :
                    <li class="nav-item px-2">
                        <Link class="nav-link active" aria-current="page" to={'/sociallogin'}>Login</Link>
                    </li>
                }
            </ul>
            {/* <!-- Left links --> */}
            </div>
            {/* <!-- Collapsible wrapper --> */}
            </div>
            </nav>
        </div>
    );
};

export default Header;