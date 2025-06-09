import React, { useState } from 'react';
import UseAuth from '../Context/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <h1>This is Registration</h1>
            <div>
                <button className='cursor-pointer' onClick={googleClick}>Google sign in</button>
            </div>
        </div>
    );
};

export default Registration;