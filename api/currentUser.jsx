import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/axiosSecure";
import UseAuth from "../Context/UseAuth";

const currentUser = (email) => {
    const axiousSecure = useAxiosSecure();
    const {user} = UseAuth();
    const {refetch, data: currentUser = []} = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async() => {
            const res = await axiousSecure.get(`/users?email=${email}`);
            return res.data;
        }
    })
    return [currentUser?.users, refetch]
};

export default currentUser;