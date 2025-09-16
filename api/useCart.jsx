import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js"

const useCart = () => {
    const {refetch, isLoading, data: cartData = []} = useQuery({
        queryKey: ['UseCart', 'cart'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/api/cartList');
            return res.data;
        }
    })
    const carts = cartData.cartData || [];
    return [carts , isLoading, refetch];
}

export default useCart;