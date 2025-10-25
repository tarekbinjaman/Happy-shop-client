import React from 'react';
import useWishList from '../../../api/useWishList';
import UseAuth from '../../../Context/UseAuth';
import { div } from 'framer-motion/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const {user} = UseAuth();
    const [wishList, isLoading, refetch] = useWishList(user?.email);
    console.log("Here it is dude )))))))))))))))))))))))", wishList)
    const removeWishlist = async(id) => {
        const res = await axios.delete(`http://localhost:5000/api/wishlist/${id}`)
        if(res?.data?.success) {
            toast.info("Product removed from wishlist");
            refetch();
        }
    }
    return (
        <div className='mt-8 '>
            <h1 className='md:pl-10 text-2xl font-bold mb-4'>Wishlist</h1>
            <div> 
                {
                wishList && wishList.length > 0 
                ?

                <div className='flex flex-col space-y-2 w-full md:px-10'>
                    {
                        wishList.map((item) => (
                            <div className='flex items-center justify-between border border-slate-300 px-4 py-1 bg-white'>
                                <div className='flex items-center'>
                                <div className='w-16'>
                                    <img src={item?.image} alt="" />
                                </div>
                                <div className='flex flex-col'>
                                <p className='md:text-lg text-sm'>{item?.title}</p>
                                <p className='md:text-sm text-xs text-gray-400'>{item?.description.slice(0, 30)}</p>
                                </div>
                                </div>

                                {/* buttons */}
                                <div className='flex gap-4'>
                                    <div>
                                        <Link to={`/viewProduct/${item?.productId}`}>
                                <button className='px-3 py-1 bg-green-500 cursor-pointer hover:bg-green-600 transition duration-300 text-xs md:text-base'>View</button>
                                        </Link>
                                    </div>
                                    <div>
                                <button
                                onClick={() => removeWishlist(item?._id)}
                                className='px-3 py-1 bg-red-400 cursor-pointer hover:bg-red-500 text-white transition duration-300 text-xs md:text-base'>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                    <div>
                        <h1>No wishlist product to show</h1>
                    </div>
                }
            </div>
        </div>
    );
};

export default Wishlist;