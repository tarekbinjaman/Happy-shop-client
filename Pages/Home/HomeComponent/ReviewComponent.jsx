import React, { useRef } from 'react';

import reviews from './reviews';
import { BiChevronLeft } from 'react-icons/bi';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import icon from '../../../src/assets/icons8-verified-account-48.png'

const ReviewComponent = () => {
    const scrollRef = useRef();

    const scroll = (direcion) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direcion === 'left' ? -300 : 300,
                behavior: 'smooth',
            })
        }
    }
    return (
        <div className='w-full mt-20 mb-20'>
            <div className='max-w-5xl'>
            <h1
            style={{fontFamily: 'Integral CF'}}
            className='lg:ml-100 md:ml-10  mt-20 md:mb-8 text-3xl lg:w-1/2 md:w-1/2 w-1/2 mb-2 ml-2'
            >Our happy Customers</h1>
            </div>
            <div className='relative'>

                {/* Blur effect */}
                <div className="absolute top-0 left-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-r  from-white to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-l  from-white to-transparent" />

                {/* scroll bar container */}
                <div
                    ref={scrollRef}
                    style={{ scrollbarWidth: 'none' }}
                    className='flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide px-4 py-4 '>
                    {
                        reviews.map((review, index) => (
                            <div key={index} className='border border-gray-300 px-4 py-4 min-w-[300px] h-[160px] overflow-hidden rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-700'>
                                <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="currentColor" class="w-6 h-6 text-yellow-500 cursor-pointer">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"></path>
                                </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-yellow-500 cursor-pointer">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"></path>
                                </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-yellow-500 cursor-pointer">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"></path>
                                </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-yellow-500 cursor-pointer">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"></path>
                                </svg></span>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="w-6 h-6 text-yellow-500 cursor-pointer">
                                        <path fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"></path>
                                    </svg></span>
                                </div>
                                <h1 className='text-md font-bold flex items-center gap-2'>{review.name} <span><img src={icon} className='w-[22px]' alt="" /></span></h1>
                                <h1>{review.comment}</h1>
                            </div>
                        ))
                    }
                </div>

                <button onClick={() => scroll('left')} className='absolute lg:right-120  right-18 lg:-top-15 md:-top-20 -top-10 bg-white  p-2 rounded-full shadow z-20 cursor-pointer'>
                    <GoArrowLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className='absolute lg:right-105  right-4  lg:-top-15 md:-top-20 -top-10 bg-white  p-2 rounded-full shadow z-20 cursor-pointer'>
                    <GoArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ReviewComponent;