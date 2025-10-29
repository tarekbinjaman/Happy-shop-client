import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserDashBoard from '../UserDashBoard/UserDashBoard';
import Myprofile from '../UserDashBoard/Routes/Myprofile';
import Address from '../UserDashBoard/Routes/Address';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';
import AdminProfile from '../AdminDashboard/routes/AdminProfile';
import AddProduct from '../AdminDashboard/routes/AddProduct';
import AllProduct from '../AdminDashboard/routes/AllProduct';
import Products from '../Pages/Products/Products';
import ViewProduct from '..//Pages/ViewProduct/ViewProduct';
import OrderManagement from '../UserDashBoard/Routes/OrderManagement';
import Wishlist from '../UserDashBoard/Routes/Wishlist';
import ProductReview from '../UserDashBoard/Routes/ProductReview';
import UserManagement from '../AdminDashboard/routes/userManagement';
import ViewOrder from '../UserDashBoard/Routes/ViewOrder';

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
                path: 'productsList/:categoryName?',
                element: <Products />
            },
            {
                path: 'viewProduct/:productId?',
                element: <ViewProduct />
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
                        path: "adminProfile",
                        element: <AdminProfile />
                    },
                    {
                        path: "addProduct",
                        element:<AddProduct />
                    },
                    {
                        path: "allProduct",
                        element: <AllProduct />
                    },
                    {
                        path: "userManagemnet",
                        element: <UserManagement />
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
                    },
                    {
                        path: "Order-management",
                        element: <OrderManagement />
                    },
                    {
                        path: "wish-List",
                        element: <Wishlist />
                    },
                    {
                        path: "product-review",
                        element: <ProductReview />
                    },
                    {
            path: "view-order/:id",
            element: <ViewOrder />
        }

                ]
            },
        ]
    }
])
export default router;