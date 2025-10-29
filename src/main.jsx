import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from '../src/Router/router.jsx';
import Authprovider from '../Context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
    
      <RouterProvider router={router} />
      </QueryClientProvider>
    <ToastContainer />
    </Authprovider>
  </StrictMode>,
)