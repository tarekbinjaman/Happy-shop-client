import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const useWishList = (email) => {
  const {
    refetch,
    isLoading,
    data: wishList = [],
  } = useQuery({
    queryKey: ["wishlist", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await  axios.get(
        `https://happy-shop-snowy.vercel.app/api/wishlist?email=${email}`
      );
      return res.data?.wishListData || []; // ✅ return only array
    },
  });
  return [wishList, isLoading, refetch];
};

export default useWishList;
