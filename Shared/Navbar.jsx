import React, { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaAlignLeft } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (

        <nav className='py-4 bg-white'>
            <div className='flex items-center'>
                <div className='flex items-center gap-6 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                        {/* sidebar icon */}
                        <div className='lg:hidden block' onClick={() => setIsSidebarOpen(true)}>
                            <RxHamburgerMenu className='md:text-3xl text-2xl ' />
                        </div>
                        {/* logo */}
                        <p className='uppercase font-bold md:text-3xl text-xl'><span>shop</span>.co</p>
                    </div>
                    <div className='hidden lg:block'>
                        {/* navlinks */}
                        <div>
                            <ul className='flex text-[18px] font-normal gap-4'>
                                <div className=''>
                                <li className='group'> <span className='flex items-center gap-1 '>Shop <GoChevronDown className='group-hover:text-orange-300' /></span>
                                <div className='relative'>
                                    <ul className='absolute top-2 left-0 bg-white shadow-xl py-3 w-28 space-y-1 border  border-gray-200
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0

                                    '>
                                        <li className='border-b border-gray-300 pl-4 cursor-pointer hover:text-orange-300'>Mens</li>
                                        <li className='border-b border-gray-300 pl-4 cursor-pointer hover:text-orange-300'>Women</li>
                                        <li className=' pl-4 cursor-pointer hover:text-orange-300'>Kids</li>
                                    </ul>
                                </div>
                                </li>
                                </div>
                                <li>On sale</li>
                                <li>New Arrivals</li>
                                <li>Brands</li>
                            </ul>
                        </div>


                    </div>
                </div>

                {/* search bar */}
                <input className='md:mx-8 mx-4  lg:p-2 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 hidden md:block' placeholder='  🔍 Search for products...' type="text" name="" id="" />
                <input className='md:mx-8 mx-4  lg:p-2 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 md:hidden' placeholder='  🔍 ' type="text" name="" id="" />

                <div className='flex md:gap-4 gap-2 items-center whitespace-nowrap'>
                    {/* profile and cart */}
                    <BsCart2 className='text-3xl text-gray-500 cursor-pointer hover:text-black' />
                    <CgProfile className='text-3xl text-gray-500 cursor-pointer hover:text-black' />
                </div>
            </div>
            {
                    <div className={`fixed top-0 left-0 w-64 h-full bg-gray-300 backdrop:blur-lg shadow-lg z-50 p-4
                    transform transition-transform duration-400 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                    >
                        <div className='flex justify-between'>
                            <div></div>
                        <button
                        className='text-2xl text-black'
                        onClick={() =>setIsSidebarOpen(false)}
                        >
                            <IoMdClose />
                        </button>
                        </div>
                        <ul className='space-y-4'>
                            <li>Shop</li>
                            <li>On sale</li>
                            <li>New Arrivals</li>
                            <li>Brands</li>
                        </ul>
                    </div>
                
            }
        </nav>

    );
};

export default Navbar;