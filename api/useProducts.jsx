import React from 'react';
import useAxiosSecure from '../axiosSecure/axiosSecure';
import UseAuth from '../Context/UseAuth';
import { useQuery } from '@tanstack/react-query';

const useProducts = (minPrice, maxPrice) => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
     const {refetch, isLoading, data: useProducts = []} = useQuery({
        queryKey: ['useProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return res.data;
        }
     })
    return [useProducts, isLoading, refetch];
};

export default useProducts;