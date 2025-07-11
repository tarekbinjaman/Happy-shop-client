import React from 'react';

import reviews from './reviews';

const ReviewComponent = () => {
    return (
        <div className='w-full border'>
            <h1>This is it</h1>
            <div className='relative w-full overflow-hidden'>
            {/* Blur effect */}
                            <div className="absolute top-0 left-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-r  from-white to-transparent" />
                            <div className="absolute top-0 right-0 w-32 h-full z-10 pointer-events-none 
               bg-gradient-to-l  from-white to-transparent" />
                <div className='w-full flex'>
                    {
                        reviews.map((review, index) => (
                            <div key={index} className='border px-4 py-2 inline-block w-[200px] h-[130px] overflow-hidden'>
                                <h1>{review.name}</h1>
                                <h1>{review.comment}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;