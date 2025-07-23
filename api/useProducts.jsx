import React from 'react';
import useAxiosSecure from '../axiosSecure/axiosSecure';
import UseAuth from '../Context/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { data } from 'react-router-dom';

const useProducts = (minPrice = 0, maxPrice = 1000000) => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
     const {refetch, isLoading, data: useProducts = []} = useQuery({
        queryKey: ['useProducts', minPrice, maxPrice],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return res.data;
        }
     })
     const products = useProducts.products || [];
    return [products, isLoading, refetch];
};

export default useProducts;