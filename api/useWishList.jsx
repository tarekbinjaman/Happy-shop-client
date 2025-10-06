import { useQuery } from "@tanstack/react-query";
import React from "react";

const useWishList = (email ) => {
  const {
    refetch,
    isLoading,
    data: wishList = {},
  } = useQuery({
    queryKey: ["wishlist", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/wishlist?email=${email}`
      );
      return res.data?.wishListData;
    },
  });
  return [wishList, isLoading, refetch];
};

export default useWishList;
