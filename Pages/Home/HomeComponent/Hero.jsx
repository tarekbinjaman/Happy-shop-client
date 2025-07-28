import React from 'react';
import CountUp from 'react-countup';

import img1 from '../../../src/assets/hero/ChatGPT Image Jul 7, 2025, 07_53_28 PM.png'
import star from '../../../src/assets/hero/star.png'
import { Link } from 'react-router-dom';
import FluidGlass from './FluidGlass';

const Hero = () => {
    return (
        <div className='bg-[#f2f0f1] relative'>
            
            <div className='md:w-10/12 w-11/12 mx-auto'>
                <div className='md:flex lg:flex-row md:flex-col lg:justify-between'>
                    <div className='flex flex-col space-y-8 py-16'>
                        {/* text area */}
                        <h1 style={{ fontFamily: 'Integral CF', lineHeight: '66px', letterSpacing: '4px', }}
                            className='md:text-6xl text-xl font-extrabold hidden md:block'
                        >FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE</h1>
                        <h1 style={{ fontFamily: 'Integral CF', lineHeight: '36px', letterSpacing: '4px', }}
                            className='text-4xl font-extrabold md:hidden'
                        >FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE</h1>
                        <p className='text-md font-normal text-gray-400'>Browse through our diverse range of meticulously crafted garments. designed <br />
                            to bring out your individuality and cater to your sense of style.</p>
                        <div className='md:inline-block'>
                            <Link to={'/tShirts'}><button className='text-sm text-white bg-black px-12 py-3 rounded-3xl cursor-pointer hover:bg-gray-600 transition-colors duration-400 ease-in-out w-full lg:hidden'>Shop now</button></Link>
                            <Link to={'/tShirts'}><button className='text-sm hover:shadow-2xl text-white bg-black px-12 py-3 rounded-3xl cursor-pointer hover:bg-white hover:text-black transition-colors duration-400 ease-in-out hidden lg:block'>Shop now</button></Link>
                        </div>
                        <div className='flex md:gap-12 gap-4'>
                            {/* here will be a count up */}
                            <div>
                                <div className='lg:text-6xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={200} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal'>International Brands</p>
                            </div>
                            <div className='mx-4 border-x-1 border-gray-300 px-8'>
                                <div className='lg:text-6xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={2000} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal'>High-Quality products</p>
                            </div>
                            <div >
                                <div className='lg:text-6xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={30000} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal'>Happy Customers</p>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <img src={img1} className='md:w-[700px] w-[400px]' alt="" />
                        <img src={star} className='absolute -mt-100 w-[90px] hidden lg:block md:hidden' alt="" />
                        <img src={star} className='absolute -mt-150 ml-140 w-[140px] hidden lg:block md:hidden' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;