import React, { useState } from 'react';
import UseAuth from '../Context/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import login_bg from '../Assets/img/tt.jpg'
import { GoArrowRight } from 'react-icons/go';
import { p } from 'framer-motion/client';
import { FcGoogle } from 'react-icons/fc';

const Registration = () => {
    const { googleSignin, userRegister, updateUser } = UseAuth();
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // password validation
    const validatePassword = (passwrod) => {
        const errors = [];
        if (!/[A-Z]/.test(passwrod)) errors.push("Must contain at least one uppearcase letter.");
        if (!/[a-z]/.test(passwrod)) errors.push("Must contain at least one lowercase letter.")
        if (passwrod.length < 6) errors.push("Must be at least 6 characters long.");
        return errors;
    };

    // google signin fuction
    const googleClick = async () => {
        try {
            const result = await googleSignin();
            const user = result.user;
            console.log(user)
            const userData = {
                name: user?.displayName,
                email: user?.email,
                isAdmin: false,
                number_of_meal_added: 0,
                photo: user?.photoURL,
            };

            // api call
            const res = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })

            if (!res.ok) throw new Error("User data storage failed")

            navigate('/')
            toast.success("Registration Successfully")

        } catch (error) {
            console.log(error)
        }

    };

    const oonsubmit = (data) => {
        const { name, email, url, password } = data;
        console.log(data);
    }

    const onsubmit = async (data) => {
        const { name, email, url, password, agree } = data;

        // password validation
        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
            setPasswordErrors(validationErrors);
            return
        };
        setPasswordErrors([]); // Clear previous errors if valid

        try {
            // Register the user with email and password
            const result = await userRegister(email, password);
            const user = result.user;

            // update user profile
            await updateUser(user, {
                displayName: name,
                photoURL: url
            });

            // prepare user data to save in database
            const userData = {
                name: name,
                email: email,
                isAdmin: false,
                number_of_meal_added: 0,
                photoURL: url,
                agree: agree
            };

            const res = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!res.ok) throw new Error("User data storage failed");
            toast.success("Registration successfully");
            navigate(location?.state || "/");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("something went wrong during registration");
        }
    };
    return (
        <div>
            <h1>This is Registration</h1>
            <div className='flex justify-center'>
                <div className='flex justify-between gap-3'>
                    <div className='w-[400px] relative shadow-xl'>
                        <img src={login_bg} className='rounded-t-2xl h-[460px] w-full object-cover' alt="" />
                        <div className='absolute bg-gradient-to-b z-50 -mt-50 ml-44 from-red-400 to-red-600 p-3 rounded-full'>
                            <GoArrowRight className='text-white text-2xl' />
                        </div>
                        <div className=' bg-white rounded-2xl p-6 pt-8 absolute w-full z-10 -mt-46'>
                            <h3 className='text-4xl'> <span className='font-semibold'>Welcome to </span><span className='uppercase font-bold text-red-500'>shop.co</span></h3>
                            <p className='text-sm mt-2'>Let's connect & buy your product in best price.</p>
                            <p className='text-xl mt-2 '>Sign up now!</p>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-3 p-4 rounded-t-2xl w-[400px] bg-white shadow-2xl'>
                        <h2 className='text-2xl font-bold mb-8 mt-8 text-pink-500'>Register Form</h2>
                        <form className='' onSubmit={handleSubmit(onsubmit)}>
                            <div className='grid grid-cols-2 gap-x-3 gap-y-8 mb-8'>
                                <div className='form-control'>
                                    <label className='label text-xl text-gray-500 mb-2'>Name</label>
                                    <div>
                                        <input type="text"
                                            className='border-pink-400 border-2 p-1 w-[170px]'

                                            {...register('name', { require: 'Name is required' })}
                                        />
                                    </div>
                                    {errors.name && <p>{errors.name.message}</p>}
                                </div>
                                <div className='form-control'>
                                    <label className='label text-xl mb-2 text-gray-500'>Photo url</label>
                                    <div>
                                        <input type="url"
                                            className='border-pink-400 border-2 p-1 w-[170px]'

                                            {...register('url', { require: 'Image link is required' })}
                                        />
                                    </div>
                                    {errors.url && <p>{errors.url.message}</p>}
                                </div>
                                <div className='form-control'>
                                    <label className='label text-xl mb-2 text-gray-500'>Email</label>
                                    <div>
                                        <input type="email"
                                            className='border-pink-400 border-2 p-1 w-[170px]'

                                            {...register('email', { require: 'Email is required' })}
                                        />
                                    </div>
                                    {errors.email && <p>{errors.email.message}</p>}
                                </div>
                                <div className='form-control'>
                                    <label className='label text-xl mb-2 text-gray-500'>Password</label>
                                    <div>
                                        <input type="password"
                                            className='border-pink-400 border-2 p-1 w-[170px]'

                                            {...register('password', { require: 'password is required' })}
                                        />
                                    </div>
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                            </div>
                            <div className='form-control'>
                                <label className='flex items-center gap-2 text-sm'>
                                    <input type="checkbox"
                                        {...register("agree", { required: "you must agree to the terms and conditions" })}
                                    />
                                    I agree to the <span className='text-blue-600 underline cursor-pointer'>terms and conditions</span>
                                </label>
                                {errors.agree && <p className='text-red-500 text-sm'>{errors.agree.message}</p>}
                            </div>
                            <div className='from-control mt-8'>
                                <button type='submit' className='btn btn-primary bg-pink-500'>Register now</button>
                            </div>
                        </form>
                        <div className="divider">or</div>
                        <p className='text-center'>Already have an account? <Link to={'/login'} className='text-blue-400 underline'>Login</Link></p>
                        <div className='flex justify-center 4'>
                            <button className='cursor-pointer flex gap-2 items-center btn' onClick={googleClick}> <FcGoogle className='text-xl' /> Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Registration;