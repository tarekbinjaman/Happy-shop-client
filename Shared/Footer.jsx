import React from 'react';
import { FaApplePay, FaCcPaypal, FaFacebook, FaGooglePay, FaTwitter } from 'react-icons/fa';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { RiMastercardFill } from 'react-icons/ri';
import { SiVisa } from 'react-icons/si';
import { TbBrandGithubFilled } from 'react-icons/tb';

const Footer = () => {
    return (
        <div className='bg-[#f0f0f0]'>
            <div className='flex justify-center'>
            <div className='flex md:flex-row flex-col space-y-2 md:space-y-0 justify-center max-w-7xl py-8 gap-10'>

           
            <div className='flex flex-col space-y-3'>
                <h1 className='text-4xl lg:ml-0 ml-4' style={{ fontFamily: 'Integral CF' }}>SHOP.CO</h1>
                <p className='text-gray-400 lg:w-1/2 lg:ml-0 ml-4'>We have clothes that suits your style and
                    which you•re proud to wear. From
                    women to men.</p>
                    {/* component 1 */}
                <div className='flex gap-2 items-center lg:ml-0 ml-4'>
                    {/* icons */}
                    <div className='p-1 border rounded-full bg-white'>
                    <FaTwitter className='text-xl' />
                    </div>
                    <div className='p-1 border rounded-full bg-white'>
                    <FaFacebook className='text-xl' />
                    </div>
                    <div className='p-1 border rounded-full bg-white'>
                    <PiInstagramLogoFill className='text-xl' />
                    </div>
                    <div className='p-1 border rounded-full bg-white'>
                    <TbBrandGithubFilled className='text-2xl' />
                    </div>
                </div>
                </div>
                 <div className='flex md:flex-row flex-col gap-14 md:gap-x-24 md:gap-y-0'> 
                {/* component 2 */}
                <div className='flex md:gap-6 gap-20 lg:ml-0 ml-4'>
                <div>
                    <h1 className='mb-4'>COMPANY</h1>
                    <ul className='textarea-md text-gray-500 space-y-2'>
                        <li>About</li>
                        <li>Features</li>
                        <li>Works</li>
                        <li>Career</li>
                    </ul>
                </div>
                <div>
                    <h1 className='mb-4'>HELP</h1>
                    <ul className='textarea-md text-gray-500 space-y-2'>
                        <li>Customer Support</li>
                        <li>Delivery Details</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy & Policy</li>
                    </ul>
                </div>
                </div>
                {/* component 3 */}
                <div className='flex md:gap-6 gap-20 lg:ml-0 ml-4'> 
                <div>
                    <h1 className='mb-4'>FAQ</h1>
                    <ul className='textarea-md text-gray-500 space-y-2'>
                        <li>Account</li>
                        <li>Manage Deliveries</li>
                        <li>Orders</li>
                        <li>Payments</li>
                    </ul>
                </div>
                <div>
                    <h1 className='mb-4'>RESOURCES</h1>
                    <ul className='textarea-md text-gray-500 space-y-2'>
                        <li>Free eBooks</li>
                        <li>Development Tutorial</li>
                        <li>How to - Blog</li>
                        <li>Youtube Playlist</li>
                    </ul>
                </div>
                </div>
                </div>
             </div>
             </div>
             <div className='max-w-7xl  mx-auto '>
             <div className='divider w-full '></div>
             </div>
             <div className='lg:max-w-7xl w-full mx-auto mb-8'>
            <div className='flex lg:flex-row flex-col lg:justify-between justify-center'>
                <p className='text-gray-400 md:text-start text-center'>Shop.co © 2000-2023. All Rights Reserved</p>
                <div className='flex items-center md:justify-start justify-center gap-3 md:mt-0 mt-2'>
                    <SiVisa className='text-blue-500 text-4xl' />
                    <RiMastercardFill className='text-4xl' />
                    <FaCcPaypal  className='text-3xl' />
                    <FaApplePay  className='text-4xl' />
                    <FaGooglePay  className='text-4xl' />
                </div>
            </div>
             </div>
            
        </div>
    );
};

export default Footer;