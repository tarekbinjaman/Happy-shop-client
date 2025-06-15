import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import login_bg from '../Assets/img/tt.jpg'
import UseAuth from '../Context/UseAuth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { userLogin } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onsubmit = (data) => {
        const {email, password} = data;
        userLogin(email, password)
        .then(result => {
            console.log(result);
            toast.success("Login successful")
            navigate(location?.state ? location?.state : "/");
        })
        .catch(err => {
            // todo set catches
        })
    }
    return (
        <div>
            <h1>This is login page</h1>
            <div className='w-[400px] relative shadow-xl'>
                <div className='absolute text-white ml-6 mt-6 font-bold'>
                    <h2 className='text-2xl uppercase'>Welcome <br /> Back</h2>
                </div>
                <img src={login_bg} className='rounded-t-2xl h-[500px] w-full object-cover' alt="" />
                <div className='absolute bg-gradient-to-b z-50 -mt-52 ml-60 from-red-400 to-red-600 p-3 rounded-full'>
                    <GoArrowRight className='text-white text-2xl' />
                </div>
                <div className=' bg-white rounded-2xl p-6 pt-8 absolute w-full z-10 -mt-46'>
                    <h3 className='text-2xl'>Sign in</h3>

                </div>
            </div>
        </div>
    );
};

export default Login;