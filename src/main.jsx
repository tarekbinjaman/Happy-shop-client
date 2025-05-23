import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import router from '../Router/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-11/12 mx-auto'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)