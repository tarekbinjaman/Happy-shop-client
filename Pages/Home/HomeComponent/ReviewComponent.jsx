import React, { useRef } from 'react';

import reviews from './reviews';
import { BiChevronLeft } from 'react-icons/bi';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

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
        <div className='w-full border'>
            <div className='relative'>


                <div className='relative w-full overflow-x-auto scroll-smooth scrollbar-hide px-4'>
                    {/* Blur effect */}
                    <div className="absolute top-0 left-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-r  from-white to-transparent" />
                    <div className="absolute top-0 right-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-l  from-white to-transparent" />
                    <div
                    ref={scrollRef}
                    className='flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide px-4'>
                        {
                            reviews.map((review, index) => (
                                <div key={index} className='border px-4 py-4 w-[200px] h-[130px] overflow-hidden rounded'>
                                    <h1>{review.name}</h1>
                                    <h1>{review.comment}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button onClick={() => scroll('left')} className='absolute left-2 top-1/2 bg-white  p-2 rounded-full shadow z-20'>
                    <GoArrowLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className='absolute right-2 top-1/2 bg-white  p-2 rounded-full shadow z-20'>
                    <GoArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ReviewComponent;