import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        
        <div className='max-w-4xl flex justify-center md:mt-12'>
        <div className='flex '>
            <div className='md:w-64 w-32 shadow-xl px-4 py-8 border-gray-200 border'>
                <ul className='space-y-1'>
                    <li>
                        <span className='text-[18px] font-bold text-gray-500'>Manage my account</span>
                        <ul className='ml-4'>
                            <li>My profile </li>
                            <li>Add products </li>
                        </ul>
                    </li>
                    <li>
                        <span className='text-[18px] font-bold text-gray-500'>My orders</span>
                        <ul className='ml-4'>
                            <li>My returns</li>
                            <li>My cancellation</li>
                        </ul>
                    </li>
                    <li className='text-[18px] font-bold text-blue-500'>My reviews</li>
                    <li className='text-[18px] font-bold text-blue-500'>My wishlist</li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;