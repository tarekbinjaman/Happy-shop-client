import React from 'react';
import useAxiosSecure from '../axiosSecure/axiosSecure';
import UseAuth from '../Context/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { data } from 'react-router-dom';
import js from '@eslint/js';

const useProducts = (filterParams) => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
    const queryStr = new URLSearchParams(filterParams).toString();
     const {refetch, isLoading, data: queryData = {}} = useQuery({
        queryKey: ['useProducts', queryStr],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/api/products?${queryStr}`);
            return res.data;
        }
    
     });
     const products = queryData.products || [];
    return [products, isLoading, refetch];
};

export default useProducts;