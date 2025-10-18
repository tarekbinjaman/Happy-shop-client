import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../axiosSecure/axiosSecure";

const allUsers = () => {
        const axiousSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiousSecure.get(`/users`);
      return res.data;
    },
  });
  return [users?.users, refetch];
};

export default allUsers;
