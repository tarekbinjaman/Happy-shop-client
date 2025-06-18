import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosSecure/axiosSecure";
import UseAuth from "../Context/UseAuth";

const currentUser = (email) => {
    const axiousSecure = useAxiosSecure();
    const {user} = UseAuth();
    const query = useQuery({
        queryKey: ['userList', email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/users?email=${email}`);
            return res.data;
        },
        enabled: !!email,
        throwOnError: (err) => console.error('User list fetch error', err)
    });
    return [query.data ?? [], query.refetch, user?.email]
};

export default currentUser;