import React from 'react';
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import CustomSpinner from '../CustomSpinner/CustomSpinner';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let location = useLocation();
    let navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    if(user){
        navigate(from, { replace: true });
    }
    if(loading){
        return <CustomSpinner/>
    }
    const handleSignInWithGoogle=()=>{
        signInWithGoogle()
    }
    return (
        <div className='w-5/6 mx-auto flex justify-center'>
            <div className='lg:w-2/6 md:w-1/2 w-full my-5 text-center'>
                <p className='text-red-600'>{error&&error.message}</p>
                <button className='bg-gray-100 p-2 rounded-lg' onClick={handleSignInWithGoogle}>Continue With Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;