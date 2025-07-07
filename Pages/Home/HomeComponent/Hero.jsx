import React from 'react';
import CountUp from 'react-countup';

const Hero = () => {
    return (
        <div className='bg-[#f2f0f1]'>
            <div className='w-11/12 mx-auto'>
            <div className='flex flex-col space-y-8 py-16'>
                {/* text area */}
                <h1 style={{ fontFamily: 'Integral CF', lineHeight: '48px', letterSpacing: '2px' }}
                    className='text-5xl font-extrabold'
                >FIND CLOTHES <br />
                    THAT MATCHES <br />
                    YOUR STYLE</h1>
                <p className='text-md font-normal text-gray-400'>Browse through our diverse range of meticulously crafted garments. designed <br />
                    to bring out your individuality and cater to your sense of style.</p>
                    <div className='inline-block'>
                <button className='text-sm text-white bg-black px-8 py-3 rounded-3xl cursor-pointer hover:bg-gray-600 transition-colors duration-400 ease-in-out'>Shop now</button>
                    </div>
                <div className='flex gap-4'>
                    {/* here will be a count up */}
                    <div>
                        <div className='text-4xl font-extrabold'>
                        <CountUp start={0} end={200} delay={0}>
                            {({ countUpRef }) => (
                                <div className='flex'>
                                    <span ref={countUpRef} />
                                    +
                                </div>
                            )}
                        </CountUp>
                        </div>
                        <p className='text-md text-gray-500 font-normal'>International Brands</p>
                    </div>
                    <div className='mx-4 border-x-1 border-gray-300 px-8'>
                        <div className='text-4xl font-extrabold'>
                        <CountUp start={0} end={2000} delay={0}>
                            {({ countUpRef }) => (
                                <div className='flex'>
                                    <span ref={countUpRef} />
                                    +
                                </div>
                            )}
                        </CountUp>
                        </div>
                        <p className='text-md text-gray-500 font-normal'>High-Quality products</p>
                    </div>
                    <div >
                        <div className='text-4xl font-extrabold'>
                        <CountUp start={0} end={30000} delay={0}>
                            {({ countUpRef }) => (
                                <div className='flex'>
                                    <span ref={countUpRef} />
                                    +
                                </div>
                            )}
                        </CountUp>
                        </div>
                        <p className='text-md text-gray-500 font-normal'>Happy Customers</p>
                    </div>
                </div>
            </div>
            <div></div>
            </div>
        </div>
    );
};

export default Hero;