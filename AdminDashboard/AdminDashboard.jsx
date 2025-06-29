import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    const isActive = ({ isActive }) => isActive ? 'text-blue-500 bg-slate-200 p-1 rounded' : '';
    return (
        
        <div className=' md:mt-12'>
        <div className='flex  gap-2'>
            <div className='md:w-64 w-32 shadow-xl px-4 py-8 border-gray-200 border'>
                <ul className='space-y-1'>
                    <li>
                        <span className='md:text-[18px] textarea-md font-bold text-gray-500'>Manage account</span>
                        <ul className='md:ml-4 md:text-base text-sm space-y-2'>
                            <li><NavLink className={isActive} to={'/adminDashboard/adminProfile'}>My profile </NavLink></li>
                            <li><NavLink className={isActive} to={'/adminDashboard/allProduct'}>All proudcts</NavLink></li>
                            <li><NavLink className={isActive} to={'/adminDashboard/addProduct'}>Add products</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <span className='md:text-[18px] font-bold text-gray-500'>My orders</span>
                        <ul className='md:ml-4 space-y-2 md:text-base text-sm'>
                            <li>My returns</li>
                            <li>My cancellation</li>
                        </ul>
                    </li>
                    <li className='text-[18px] font-bold text-blue-500'>My reviews</li>
                    <li className='text-[18px] font-bold text-blue-500'>My wishlist</li>
                </ul>
            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;