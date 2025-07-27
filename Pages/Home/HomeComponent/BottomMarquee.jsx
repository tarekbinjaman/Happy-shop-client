import React from 'react';
import Marquee from 'react-fast-marquee';
import img1 from '../../../src/assets/logos/1.jpg'
import img2 from '../../../src/assets/logos/2.jpg'
import img3 from '../../../src/assets/logos/3.jpg'
import img4 from '../../../src/assets/logos/4.jpg'
import img5 from '../../../src/assets/logos/5.jpg'

const BottomMarquee = () => {
    return (
        <div className='bg-black mb-10 hidden md:hidden lg:block'>
            <Marquee speed={120}>
                <img src={img1} className='mx-10 w-56 object-fill' alt="" />
                {/* <img src={img2} className='mx-10 w-56 object-fill' alt="" /> */}
                <img src={img3} className='mx-10 w-56 object-fill' alt="" />
                <img src={img4} className='mx-10 w-56 object-fill' alt="" />
                <img src={img5} className='mx-10 w-56 object-fill' alt="" />
                <img src={img1} className='mx-10 w-56 object-fill' alt="" />
                {/* <img src={img2} className='mx-10 w-56 object-fill' alt="" /> */}
                <img src={img3} className='mx-10 w-56 object-fill' alt="" />
                <img src={img4} className='mx-10 w-56 object-fill' alt="" />
                <img src={img5} className='mx-10 w-56 object-fill' alt="" />
            </Marquee>
        </div>
    );
};

export default BottomMarquee;