import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../Pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h1>Route not found</h1>,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])
export default router;