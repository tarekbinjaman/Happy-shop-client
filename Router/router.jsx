import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../Pages/Home';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserDashBoard from '../UserDashBoard/UserDashBoard';
import Myprofile from '../UserDashBoard/Routes/Myprofile';
import Address from '../UserDashBoard/Routes/Address';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h1>Route not found</h1>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Registration />
            },
            {
                path: "adminDashboard",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "myprofile",
                        // element: <adminProfile />
                    }
                ]
            },
            {
                path: "userDashboard",
                element: <UserDashBoard />,
                children: [
                    {
                        path: "myProfile",
                        element: <Myprofile />,
                    },
                    {
                        path: "address",
                        element: <Address />
                    }
                ]
            }
        ]
    }
])
export default router;