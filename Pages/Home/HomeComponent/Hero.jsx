import React from 'react';
import CountUp from 'react-countup';

import img1 from '../../../src/assets/hero/models.png'
import star from '../../../src/assets/hero/star.png'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='bg-[#f2f0f1] relative'>

            <div className='md:w-10/12 w-11/12 mx-auto'>
                <div className='md:flex lg:flex-row md:flex-col lg:justify-between'>
                    <div className='flex flex-col 2xl:space-y-8 xl:space-y-6 lg:space-y-2 md:space-y-6 md:py-10 2xl:py-16 xl:py-16 lg:py-10 space-y-6 py-5'>
                        {/* text area */}
                        {/* lg: */}
                        <h1 style={{ fontFamily: 'Integral CF', lineHeight: '46px', letterSpacing: '4px', }}
                            className='md:text-3xl lg:text-4xl xl:text-6xl text-xl font-extrabold hidden lg:block 2xl:hidden xl:hidden'
                        >FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE</h1>

                        <h1 style={{ fontFamily: 'Integral CF', lineHeight: '56px', letterSpacing: '7px', }}
                            className='md:text-6xl lg:text-4xl xl:text-6xl text-xl font-extrabold hidden lg:hidden 2xl:block xl:block md:block'
                        >FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE</h1>
                        <h1 style={{ fontFamily: 'Integral CF', lineHeight: '36px', letterSpacing: '4px', }}
                            className='text-4xl font-extrabold md:hidden'
                        >FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE</h1>
                        <p className='2xl:text-md xl:text-base lg:text-base font-normal text-gray-400 lg:text-justify hidden 2xl:block xl:block'>Browse through our diverse range of meticulously crafted garments. designed <br />
                            to bring out your individuality and cater to your sense of style.</p>
                        <p className='2xl:text-md xl:text-base lg:text-sm font-normal text-gray-400 lg:text-justify 2xl:hidden xl:hidden hidden lg:block w-sm'>Browse through our diverse range of meticulously crafted garments. designed
                            to bring out your individuality and cater to your sense of style.</p>
                        <div className='md:inline-block'>
                            <Link to={'/tShirts'}><button className='text-sm text-white bg-black px-12 py-3 rounded-3xl cursor-pointer hover:bg-gray-600 transition-colors duration-400 ease-in-out w-full lg:hidden'>Shop now</button></Link>
                            <Link to={'/tShirts'}><button className='text-sm hover:shadow-2xl text-white bg-black px-12 py-3 rounded-3xl cursor-pointer hover:bg-white hover:text-black transition-colors duration-400 ease-in-out hidden lg:block lg:my-2'>Shop now</button></Link>
                        </div>
                        <div className='flex 2xl:gap-12 xl:gap-8 lg:gap-2 md:gap-6 gap-4 md:justify-center lg:justify-start'>
                            {/* here will be a count up */}
                            <div>
                                <div className='2xl:text-6xl xl:text-3xl lg:text-xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={200} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal 2xl:whitespace-nowrap xl:whitespace-nowrap 2xl:text-xl lg:text-[12px] lg:text-start'>Total Brands</p>
                            </div>
                            <div className='mx-4 border-x-1 border-gray-300 px-8'>
                                <div className='2xl:text-6xl xl:text-3xl lg:text-xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={2000} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal  2xl:whitespace-nowrap xl:whitespace-nowrap 2xl:text-xl lg:text-[12px] lg:text-start'>High-Quality products</p>
                            </div>
                            <div >
                                <div className='2xl:text-6xl xl:text-3xl lg:text-xl md:text-4xl font-bold'>
                                    <CountUp start={0} end={30000} delay={0}>
                                        {({ countUpRef }) => (
                                            <div className='flex'>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                </div>
                                <p className='md:text-md text-sm text-gray-500 font-normal  2xl:whitespace-nowrap xl:whitespace-nowrap 2xl:text-xl lg:text-[12px] lg:text-start'>Happy Customers</p>
                            </div>
                        </div>
                    </div>
                    <div className='ml-10 relative hidden lg:block 2xl:hidden xl:hidden'>
                        <div className='flex items-end hidden lg:flex xl:hidden 2xl:hidden  relative'>
                            <img src={img1} className='2xl:w-[700px] xl:w-[600px] lg:w-[600px]  md:w-[100px] w-[400px] ' alt="" />
                        </div>
                        <img src={star} className='absolute lg:-mt-60 w-[90px] hidden lg:block 2xl:block xl:block  md:hidden' alt="" />
                        <img src={star} className='absolute  lg:-mt-90 2xl:ml-140 lg:ml-80 w-[120px] hidden lg:block 2xl:block xl:block  md:hidden' alt="" />
                    </div>
                    <div className='relative lg:hidden 2xl:block xl:block md:flex md:justify-center sm:justify-center'>
                        <img src={img1} className='2xl:w-[700px] xl:w-[600px] lg:w-[600px]  md:w-[500px] w-[400px] ' alt="" />
                        <img src={star} className='absolute 2xl:-mt-100 lg:-mt-80 w-[90px] hidden 2xl:block xl:block  md:hidden' alt="" />
                        <img src={star} className='absolute 2xl:-mt-150 lg:-mt-140 2xl:ml-140 lg:ml-120 w-[140px] hidden 2xl:block xl:block md:hidden' alt="" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;