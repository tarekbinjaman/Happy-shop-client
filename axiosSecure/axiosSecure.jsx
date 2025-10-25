import axios from "axios";
import UseAuth from "../Context/UseAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://happy-shop-snowy.vercel.app/api/',
    withCredentials: true
});

const useAxiosSecure = () => {
    const {logOut} = UseAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response, // returning response
            (error) => {
                const {response} = error; // taking response from error object

                if(response && (response.status === 401 || response.status === 403)) {
                    console.warn('Unauthorized access detected. Loggin out user.');
                    logOut()
                    .then(() => navigate('/login'))
                    .catch((err) => console.log('Error during logout?', err));
                }
                return Promise.reject(error);
            }
        );
        // Clean up the interceptors when component unmount
        return () => {
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    },[logOut, navigate]);
    
    return axiosSecure;
}

export default useAxiosSecure;