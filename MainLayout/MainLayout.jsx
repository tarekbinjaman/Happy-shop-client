import React from 'react';
import Navbar from '.././src/Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '.././src/Shared/Footer';
import CustomCursor from '../src/Cursor/CustomCursor';

const MainLayout = () => {
    const location = useLocation();
    const hideLayout = 
    location.pathname.startsWith('/adminDashboard') ||
    location.pathname.startsWith('/userDashboard')
    
    return (
        <div className='flex flex-col min-h-screen'>
            {/* <div className='max-w-11/12 mx-auto'> */}
            {!hideLayout && <Navbar />}
            <div className='flex-grow'>
                <Outlet />
            </div>
            {!hideLayout && <Footer />}
            <div className='hidden lg:block'>
            <CustomCursor />
            </div>
        </div>
    );
};

export default MainLayout;