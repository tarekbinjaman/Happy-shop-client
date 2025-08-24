import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js"

const useCart = () => {
    const {refetch, isLoading, data: cartData = {}} = useQuery({
        queryKey: ['UseCart'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/api/cartList');
            return res.data;
        }
    })
    return [cartData.cartData, isLoading, refetch];
}

export default useCart;