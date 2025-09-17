import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js"

const useCart = (email) => {
    const {refetch, isLoading, data: cartData = {}, isFetching} = useQuery({
        queryKey: ['carts', email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/cartList?email=${email}`);
            return res.data;
        }
    })
    const carts = cartData.cartData || [];
    return [carts , isLoading, refetch, isFetching];
}

export default useCart;