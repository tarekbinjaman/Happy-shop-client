import React from 'react';
import useWishList from '../../api/useWishList';
import UseAuth from '../../Context/UseAuth';
import { div } from 'framer-motion/client';

const Wishlist = () => {
    const {user} = UseAuth();
    const [wishList, isLoading, refetch] = useWishList(user?.email);
    console.log("Here it is dude )))))))))))))))))))))))", wishList)
    return (
        <div className='mt-8 '>
            <h1 className='pl-10 text-2xl font-bold mb-4'>Wishlist</h1>
            <div> 
                {
                wishList && wishList.length > 0 
                ?

                <div className='flex flex-col space-y-2 w-full px-10'>
                    {
                        wishList.map((item) => (
                            <div className='flex items-center justify-between border border-slate-300 px-4 py-1 bg-white'>
                                <div className='flex items-center'>
                                <div className='w-16'>
                                    <img src={item?.image} alt="" />
                                </div>
                                <div className='flex flex-col'>
                                <p className='text-lg'>{item?.title}</p>
                                <p className='text-sm'>{item?.description.slice(0, 30)}</p>
                                </div>
                                </div>

                                {/* buttons */}
                                <div className='flex gap-4'>
                                    <div>
                                <button className='px-3 py-1 bg-amber-300 cursor-pointer hover:bg-amber-500 transition duration-300'>Add to cart</button>
                                    </div>
                                    <div>
                                <button className='px-3 py-1 bg-green-500 cursor-pointer hover:bg-green-600 transition duration-300 '>View Product</button>
                                    </div>
                                    <div>
                                <button className='px-3 py-1 bg-red-400 cursor-pointer hover:bg-red-500 text-white transition duration-300 '>Remove</button>
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