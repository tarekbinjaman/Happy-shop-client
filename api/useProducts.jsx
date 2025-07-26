import React from 'react';
import useAxiosSecure from '../axiosSecure/axiosSecure';
import UseAuth from '../Context/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { data } from 'react-router-dom';

const useProducts = (filterParams) => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
     const {refetch, isLoading, data: useProducts = []} = useQuery({
        queryKey: ['useProducts', filterParams],
        queryFn: async () => {
            const queryStr = new URLSearchParams(filterParams).toString();
            const res = await axiosSecure.get(`http://localhost:5000/api/products?${queryStr}`);
            return res.data;
        }
     })
     const products = useProducts.products || [];
    return [products, isLoading, refetch];
};

export default useProducts;