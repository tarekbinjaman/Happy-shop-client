import useAxiosSecure from "../axiosSecure/axiosSecure";
import UseAuth from "../Context/UseAuth";

const currentUser = () => {
    const axiousSecure = useAxiosSecure();
    const {user} = UseAuth();
    const query = 
};