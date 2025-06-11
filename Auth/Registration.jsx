import React, { useState } from 'react';
import UseAuth from '../Context/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import login_bg from '../Assets/img/tt.jpg'
import { GoArrowRight } from 'react-icons/go';

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
                photo: user?.photoURL
            };

            // api call
           const res =  await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })
            
            if(!res.ok) throw new Error("User data storage failed")
            
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
    const { name, email, url, password } = data;
    
    // password validation
    const validationErrors = validatePassword(password);
    if(validationErrors.length > 0) {
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
            photoURL: url
        };

        const res = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userData)
        });

        if(!res.ok) throw new Error("User data storage failed");
        toast.success("Registration successfully");
        navigate(location?.state || "/");
    } catch(error) {
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
                    <img src={login_bg} className='rounded-t-2xl h-[500px] w-full object-cover' alt="" />
                    <div className='absolute bg-gradient-to-b z-50 -mt-50 ml-44 from-red-400 to-red-600 p-3 rounded-full'>
                    <GoArrowRight className='text-white text-2xl' />
                    </div>
                    <div className=' bg-white rounded-2xl p-6 pt-8 absolute w-full z-10 -mt-45'>
                        <h3 className='text-4xl'> <span className='font-semibold'>Welcome to </span><span className='uppercase font-bold text-red-500'>shop.co</span></h3>
                        <p className='text-sm mt-2'>Let's connect & buy your product in best price.</p>
                        <p className='text-xl mt-2 '>Sign up now!</p>
                    </div>
                </div>
                <div className='flex flex-col space-y-3'>
                    <form className='' onSubmit={handleSubmit(onsubmit)}>
                        <div className='form-control'>
                            <label className='label'>Name</label>
                            <input type="text"
                            placeholder='Name'
                            {...register('name', {require: 'Name is required'})}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className='form-control'>
                            <label className='label'>Photo URL</label>
                            <input type="url"
                            placeholder='your photo link'
                            {...register('url', {require: 'Image link is required'})}
                            />
                            {errors.url && <p>{errors.url.message}</p>}
                        </div>
                        <div className='form-control'>
                            <label className='label'>Email</label>
                            <input type="email"
                            placeholder='Email'
                            {...register('email', {require: 'Email is required'})}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className='form-control'>
                            <label className='label'>Password</label>
                            <input type="password"
                            placeholder='password'
                            {...register('password', {require: 'password is required'})}
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <div className='from-control'>
                            <button type='submit' className='btn btn-primary'>Register now</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <div className='flex justify-center mt-14'>
                <button className='cursor-pointer' onClick={googleClick}>Google sign in</button>
            </div>
        </div>
    );
};


export default Registration;