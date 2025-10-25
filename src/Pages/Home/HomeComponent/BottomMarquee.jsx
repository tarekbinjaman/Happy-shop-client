import React from 'react';
import Marquee from 'react-fast-marquee';
import img1 from '../../../assets/logos/1.jpg'
import img2 from '../../../assets/logos/2.jpg'
import img3 from '../../../assets/logos/3.jpg'
import img4 from '../../../assets/logos/4.jpg'
import img5 from '../../../assets/logos/5.jpg'

const BottomMarquee = () => {
    return (
        <div className='bg-black mb-10 hidden md:hidden xl:block 2xl:block'>
            <Marquee speed={70}>
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