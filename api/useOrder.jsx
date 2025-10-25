// useOrder

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOrder = (email) => {
    const {refetch, isLoading, data: orderData = []} = useQuery({
        queryKey: ['cartData', email],
        queryFn: async () => {
            const res = await axios.get(`https://happy-shop-snowy.vercel.app/api/order?email=${email}`);
             return res.data.Data;
        },
        enabled: !!email
    })
    return [orderData , isLoading, refetch];
}

export default useOrder;