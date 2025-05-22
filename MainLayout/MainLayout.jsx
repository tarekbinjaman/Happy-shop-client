import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;