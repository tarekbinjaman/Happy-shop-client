import React, { useEffect, useRef, useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiHeart } from 'react-icons/ci';
import { FaAlignLeft } from 'react-icons/fa';
import { GoArrowUpRight, GoChevronDown } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineManageAccounts, MdOutlineRateReview } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbLogout2, TbShoppingCartCheck } from 'react-icons/tb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UseAuth from '../Context/UseAuth'
import currentUser from '../api/currentUser';
import { SlMagnifier } from 'react-icons/sl';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Navbar = () => {
    const { logOut, user } = UseAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownref = useRef();
    const email = user?.email;
    const [currentUerData, refetchUserList] = currentUser(email);
    const userData = currentUerData?.[0];
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const isActive = ({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : '';
    const handleLogout = () => {
        logOut();
        navigate('/login')
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownref.current && !dropdownref.current.contains(event.target)) {
                setDropdownOpen(false);
                { dropdownOpen ? console.log('dropdown true') : "dropdown false" }
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);
    console.log("userData:", userData)
    return (
        <nav
            className='py-4 bg-white md:px-12'>
            <div className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-6 whitespace-nowrap'>
                    {/* logo */}
                    <div className='flex items-end gap-2'>
                        {/* sidebar icon */}
                        <div className='xl:hidden block mr-3' onClick={() => setIsSidebarOpen(true)}>
                            <RxHamburgerMenu className='md:text-3xl text-[26px] ' />
                        </div>
                        {/* logo */}
                        <Link to={`/`}><p className='uppercase font-bold md:text-3xl text-2xl'
                            style={{ fontFamily: 'Integral CF', letterSpacing: '2px' }}
                        ><span>shop</span>.co</p></Link>
                    </div>
                    <div className='hidden 2xl:block xl:block'>
                        {/* navlinks */}
                        <div>
                            <ul className='flex text-[18px] font-normal gap-8 '>
                                <li className='hover:text-orange-300'><Link to={'/'}>Home</Link></li>
                                <div className=''>
                                    <li className='group'> <span className='flex items-center gap-1 '>Men <GoChevronDown className='group-hover:text-orange-300' /></span>
                                        <div className='relative'>
                                            <ul className='absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    '>
                                                <li className=' pl-4 cursor-pointer  font-semibold relative group/li'><Link className='flex justify-between items-center' to={'/productsList/T-Shirt'}> <span className=' hover:ml-2 transition-all duration-300'>T Shirt</span></Link></li>
                                                <li className=' pl-4 cursor-pointer  font-semibold relative group/li'><Link className='flex justify-between items-center' to={'/productsList/Polo Shirt'}> <span className=' hover:ml-2 transition-all duration-300'>Polo Shirt</span></Link></li>
                                                <li className=' pl-4 cursor-pointer font-semibold whitespace-nowrap'><span className='hover:ml-2 transition-all duration-300'>Cuban Collar Shirt</span> </li>
                                                <li className=' pl-4 cursor-pointer font-semibold whitespace-nowrap'><span className='hover:ml-2 transition-all duration-300'>Dress Shirt</span> </li>
                                                <li className=' pl-4 cursor-pointer  font-semibold'><span className='hover:ml-2 transition-all duration-300'>V-neck</span></li>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                                <li>Women</li>
                                <li>Boys</li>
                                <li>Girls</li>
                                <li>Kids</li>
                                <li>New Arrival</li>
                            </ul>
                        </div>


                    </div>
                </div>

                {/* search bar */}
                {/* <input className='md:mx-8 mx-4  lg:py-2 lg:px-4 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 hidden xl:block' placeholder='  🔍 Search for products...' type="text" name="" id="" /> */}
                {/* search bar */}
                <div class="md:mx-8 mx-4  lg:py-2 lg:px-4 p-0.5 flex-1 hidden xl:block">
                    <div class="relative">
                        <input
                            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search product..."
                        />
                        <button
                            class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>

                            Search
                        </button>
                    </div>
                </div>
                {/* <input className='md:mx-8 mx-4  lg:p-2 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 md:hidden' placeholder='  🔍 ' type="text" name="" id="" /> */}

                {/* cart and profile icons */}
                <div>
                    <div className='flex md:gap-4 gap-4 items-center whitespace-nowrap'>
                        {/* profile and cart */}
                        <div className='flex items-center gap-4'>
                            <FaMagnifyingGlass className='text-2xl font-bold text-gray-500 cursor-pointer hover:text-black 2xl:hidden xl:hidden' onClick={() => setIsSearchBarOpen(!isSearchBarOpen)} />
                            <BsCart2 className='text-3xl text-gray-500 cursor-pointer hover:text-black ' />
                        </div>
                        {user?.email
                            ? <div onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownref}>
                                <img
                                    className='w-[44px] h-[44px] rounded-full
                                 border-2 border-slate-300
                                 object-cover cursor-pointer'
                                    src={user?.photoURL}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    alt="profile iamge" />
                            </div>
                            :
                            // <CgProfile onClick={() => setIsProfileOpen(!isProfileOpen)} className='text-3xl text-gray-500 cursor-pointer hover:text-black' />
                            <button className='btn' ><Link to={'/register'}>Register</Link></button>
                        }
                    </div>
                    <div className='relative'>
                        <div className={`bg-[#f2f0f1]/60 backdrop-blur-lg border-2 border-white rounded-2xl border-black-300 px-4 py-3 -translate-y-4 absolute mt-8 md:-ml-40 -ml-44 z-50
                        invisible  transition-opacity duration-300 ease-in-out
                        ${dropdownOpen ? 'visible opacity-100 translate-y-0 ' : '-translate-y-4 opacity-0 invisible '}
                        `
                        }
                        >
                            {dropdownOpen &&
                                <div>
                                    {userData && (
                                        userData?.isAdmin ?
                                            (<NavLink className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`} to={`/adminDashboard/adminProfile`}><MdOutlineManageAccounts /> <span className='whitespace-nowrap hover:text-orange-300'>Admin Dashboard</span></NavLink>)
                                            : (<NavLink className={`flex gap-2 items-center pt-4 pb-2`} to={`/userDashboard/myprofile`}><MdOutlineManageAccounts /> <span className='whitespace-nowrap hover:text-orange-300'>User Dashboard</span></NavLink>)
                                    )
                                    }
                                    <NavLink className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`} to={`/myProfile`}><TbShoppingCartCheck /><span className='whitespace-nowrap hover:text-orange-300'>My order</span></NavLink>
                                    <NavLink className={`flex gap-2 items-center pt-4  border-b border-gray-300 pb-2`} to={`/myProfile`}><CiHeart /><span className='whitespace-nowrap hover:text-orange-300'>Wishlist</span></NavLink>
                                    <NavLink className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`} to={`/myProfile`}><MdOutlineRateReview /><span className='whitespace-nowrap hover:text-orange-300'>My reviews</span></NavLink>
                                    <NavLink className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`} to={`/myProfile`}><ImCancelCircle /><span className='whitespace-nowrap hover:text-orange-300'>My return and cancellation</span></NavLink>
                                    <NavLink className={`flex gap-2 items-center pt-4 `} onClick={handleLogout}><TbLogout2 /><span className='whitespace-nowrap hover:text-orange-300'>Logout</span></NavLink>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className='relative flex justify-center'>
                <div class={`w-full max-w-sm md:max-w-[640px] lg:max-w-[890px] min-w-[200px] ${isSearchBarOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'} transition-all  duration-700 ease-in-out`}>
                    <div class="relative flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>

                        <input
                            class="w-full bg-white backdrop-blur-md placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-white focus:shadow  hover:shadow-2xl hover:shadow-black"
                            placeholder="Search here..."
                        />

                        <button
                            class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>




            {/* Sidebar */}
            {
                <div className={`fixed top-0 left-0 w-64 h-full bg-gray-300/50 backdrop-blur-lg shadow-lg z-50 p-4
                    transform transition-transform duration-400 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className='flex justify-between mb-4'>
                        <div></div>
                        <button
                            className='text-2xl text-black'
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <IoMdClose />
                        </button>
                    </div>
                    <ul className='space-y-4'>
                        <li className='border-b border-gray-400'>
                            <span onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 justify-between'>Shop <GoChevronDown className={`group-hover:text-orange-300 text-3xl cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} /></span>

                            <div className='relative transition-all duration-300 ease-in-out'>
                                <ul className={` transition-all  duration-300 ease-in-out 
                                    ${isOpen ? 'max-h-screen opacity-100 ' : 'max-h-0 opacity-0'}
                                    `}>
                                    <li className='border-b-2 border-gray-300 pl-4 cursor-pointer hover:text-orange-300'>Mens</li>
                                    <li className='border-b-2 border-gray-300 pl-4 cursor-pointer hover:text-orange-300'>Women</li>
                                    <li className=' pl-4 cursor-pointer hover:text-orange-300'>Kids</li>
                                </ul>
                            </div>
                        </li>
                        <li className='border-b border-gray-400'>On sale</li>
                        <li className='border-b border-gray-400'>New Arrivals</li>
                        <li className='border-b border-gray-400'>Brands</li>
                        <li className='border-b border-gray-400'>Wishlist</li>
                    </ul>
                </div>

            }
        </nav>

    );
};

export default Navbar;