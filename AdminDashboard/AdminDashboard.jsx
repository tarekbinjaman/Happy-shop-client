import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IoMdHome } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    const isActive = ({ isActive }) => isActive ? 'text-blue-500 bg-slate-200 p-1 rounded block w-full' : '';
    return (
        
        <div className=' '>
        <div className='flex  gap-2'>
            <div className='md:w-64 w-32 shadow-xl px-4 py-8 bg-blue-950 border-gray-200 border h-screen'>
                <ul className='space-y-1'>
                    <li>
                        <ul className='md:text-base text-sm space-y-2 text-white'>
                            <li><NavLink className={isActive} to={'/'}><span className='flex gap-2 items-center'> <IoMdHome /> Home</span></NavLink></li>
                            <li><NavLink className={isActive} to={'/adminDashboard/adminProfile'}><span className='flex gap-2 items-center'> <CgProfile /> My profile</span></NavLink></li>
                            <li><NavLink className={isActive} to={'/adminDashboard/allProduct'}><span className='flex gap-2 items-center'> <AiOutlineProduct /> All products</span></NavLink></li>
                            <li><NavLink className={isActive} to={'/adminDashboard/addProduct'}><span className='flex gap-2 items-center'> <IoAddCircleOutline /> Add products</span></NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <span className='md:text-[18px] font-bold text-gray-500'>My orders</span>
                        <ul className='md:ml-4 space-y-2 md:text-base text-sm text-white'>
                            <li>My returns</li>
                            <li>My cancellation</li>
                        </ul>
                    </li>
                    <li className='text-[18px] font-bold text-blue-500'>My reviews</li>
                    <li className='text-[18px] font-bold text-blue-500'>My wishlist</li>
                </ul>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;