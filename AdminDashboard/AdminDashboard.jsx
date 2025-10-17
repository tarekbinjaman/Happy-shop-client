import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IoMdHome } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';
import currentUser from '../api/currentUser';
import UseAuth from '../Context/UseAuth';

const AdminDashboard = () => {
    const isActive = ({ isActive }) => isActive ? 'text-blue-500 bg-slate-200 p-1 rounded block w-full' : '';
    const { logOut, user } = UseAuth();
    const email = user?.email;
    const [currentUerData, refetchUserList] = currentUser(email);
    const userData = currentUerData?.[0];
    console.log('This is user data', userData, user)
    return (

        <div className=' '>
            <div className='flex  gap-2'>
                <div className='md:w-64 w-32 shadow-xl px-4 py-8 bg-blue-950 h-screen '>
                    <div className='flex flex-col items-center justify-center space-y-1 mb-8'>
                        <img src={user?.photoURL} className='rounded-full' alt="" />
                        <h1 className='text-white text-sm'>{user?.displayName}</h1>
                        <p className='text-gray-400 text-xs'>Admin</p>
                    </div>
                    <ul className='space-y-1'>
                        <li>
                            <ul className='md:text-base text-sm space-y-2 text-white'>
                                <li><NavLink className={isActive} to={'/'}><span className='flex gap-2 items-center'> <IoMdHome /> Home</span></NavLink></li>
                                <li><NavLink className={isActive} to={'/adminDashboard/adminDashBoard'}><span className='flex gap-2 items-center'> <CgProfile /> Dasboard</span></NavLink></li>
                                <li><NavLink className={isActive} to={'/adminDashboard/orderManagement'}><span className='flex gap-2 items-center'> <AiOutlineProduct /> Order Management</span></NavLink></li>
                                <li><NavLink className={isActive} to={'/adminDashboard/userManagemnet'}><span className='flex gap-2 items-center'> <AiOutlineProduct /> User Management</span></NavLink></li>
                                <li><NavLink className={isActive} to={'/adminDashboard/allProduct'}><span className='flex gap-2 items-center'> <AiOutlineProduct /> Product Management</span></NavLink></li>
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
                <div className='flex-1 bg-[#F2F0F1] p-6 overflow-y-auto h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;