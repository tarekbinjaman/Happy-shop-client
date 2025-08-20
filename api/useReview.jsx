import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useReview = () => {
   const {refetch, isLoading, data: reviewData = {} } = useQuery({
    queryKey: ['useReview'],
    queryFn: async () => {
        const res = await axios.get('http://localhost:5000/api/reviews');
        return res.data;
    }
   })
   return [reviewData.review, isLoading, refetch];
};

export default useReview;