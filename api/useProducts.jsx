import React from 'react';
import useAxiosSecure from '../axiosSecure/axiosSecure';
import UseAuth from '../Context/UseAuth';

const useProducts = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
    return ();
};

export default useProducts;