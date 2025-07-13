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
            <div className='flex justify-center max-w-7xl py-8'>

           
            <div className='flex flex-col space-y-3'>
                <h1 className='text-4xl' style={{ fontFamily: 'Integral CF' }}>SHOP.CO</h1>
                <p className='text-gray-400 w-1/2'>We have clothes that suits your style and
                    which you•re proud to wear. From
                    women to men.</p>
                    {/* component 1 */}
                <div className='flex gap-2 items-center'>
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
                <div className='flex gap-8'>       
                {/* component 2 */}
                <div className='flex gap-14'>
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
                <div className='flex gap-14'> 
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
             <div className='max-w-7xl  mx-auto'>
             <div className='divider w-full'></div>
             </div>
             <div className='max-w-7xl mx-auto'>
            <div className='flex justify-between '>
                <p className='text-gray-400'>Shop.co © 2000-2023. All Rights Reserved</p>
                <div className='flex items-center gap-3'>
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