import React from 'react';
import img1 from '../../../src/assets/browseBy/casual.png'
import img2 from '../../../src/assets/browseBy/formal.png'
import img3 from '../../../src/assets/browseBy/party.png'
import img4 from '../../../src/assets/browseBy/gym.png'
import { Link } from 'react-router-dom';

const BrowseBy = () => {
    return (
        <div className='max-w-6xl mx-auto rounded-2xl mt-14'>
            <div className='flex justify-center'>
                <div className='bg-[#f0f0f0] py-20 md:px-20 rounded-2xl'>
                    <h1 style={{fontFamily: 'Integral CF', letterSpacing: '3px'}} className='text-center mb-10 text-3xl font-bold'>Browse by dress style</h1>

                    <div className='mx-10'>
                        <div className='md:grid grid-cols-7 gap-x-4 flex flex-col gap-y-4'>
                            <Link to={'/productsList/Casual'} className='col-span-3 h-[240px] bg-white hover:bg-gray-200 transition-color duration-400 overflow-hidden rounded-2xl relative group'>
                                <h1 className='ml-5 mt-2 absolute text-xl font-bold z-10'>Casual</h1>
                                <img src={img1} alt="casual" className='h-full w-auto object-fill transition-all duration-1000 ease-in-out  group-hover:translate-x-[-20px]' />
                            </Link>
                            <Link to={'/productsList/Formal'} className='col-span-4 h-[240px] bg-white hover:bg-gray-200 transition-color duration-400  overflow-hidden rounded-2xl relative group'>
                                <h1 className='ml-5 mt-2 absolute text-xl font-bold'>Formal</h1>
                                <img src={img2} alt="casual" className='h-[380px] object-fit absolute lg:left-22 md:left-14 left-10 group-hover:lg:left-18 transition-all duration-1000 ease-in-out' />
                            </Link>
                        </div>
                        <div className='md:grid grid-cols-7 gap-x-4 mt-4 flex flex-col gap-y-4'>
                            <Link to={'/productsList/Party'} className='col-span-4 h-[240px] bg-white hover:bg-gray-200 transition-color duration-400  overflow-hidden rounded-2xl relative group'>
                               <h1 className='ml-5 mt-2 absolute text-xl font-bold'>Party</h1>
                                <img src={img3} alt="casual" className='h-[280px] rounded-2xl object-fill pr-2 absolute lg:left-20 md:left-12  group-hover:lg:left-28 transition-all duration-1000 ease-in-out' />
                            </Link>
                            <Link to={'/productsList/Gym'} className='col-span-3 h-[240px] bg-white hover:bg-gray-200 transition-color duration-400  overflow-hidden rounded-2xl relative group'>
                                <h1 className='ml-5 mt-2 absolute text-xl font-bold'>Gym</h1>
                                <img src={img4} alt="casual" className='h-[280px] object-fill absolute lg:left-14 md:left-8 left-10 group-hover:lg:left-8 transition-all duration-1000 ease-in-out' />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseBy;