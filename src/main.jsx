import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import router from '../Router/router.jsx';
import Authprovider from '../Context/Authprovider.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <div className='max-w-11/12 mx-auto'>
      <RouterProvider router={router} />
    </div>
    <ToastContainer />
    </Authprovider>
  </StrictMode>,
)