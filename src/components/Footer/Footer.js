import React from 'react';

const Footer = () => {
    return (
        <div className='w-5/6 mx-auto bg-gray-200'>
            <p className='text-center py-5'>All rights &copy;{new Date().getFullYear()} reserved by tododesk.com</p>
            
        </div>
    );
};

export default Footer;