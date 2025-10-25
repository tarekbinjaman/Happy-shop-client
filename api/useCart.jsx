import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js"

const useCart = (email) => {
    const {refetch, isLoading, data: cartData = []} = useQuery({
        queryKey: ['cartData', email],
        queryFn: async () => {
            const res = await axios.get(`https://happy-shop-snowy.vercel.app/api/cartList?email=${email}`);
            return res.data;
        },
        enabled: !!email
    })
    return [cartData , isLoading, refetch];
}

export default useCart;