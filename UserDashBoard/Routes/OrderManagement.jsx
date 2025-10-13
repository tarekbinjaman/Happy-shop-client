import React from 'react';
import UseAuth from '../../Context/UseAuth';
import useOrder from '../../api/useOrder';
import { MdHome } from "react-icons/md";
import { PiPersonSimpleBikeLight } from "react-icons/pi";
import { Link } from 'react-router-dom';

const OrderManagement = () => {
    const {user} = UseAuth();
    const [orderData , isLoading, refetch]  = useOrder(user?.email);
    console.log("Here is order data+++++++++", orderData)
    return (
        <div className='mx-6'>
            <h1 className='font-bold mt-6 mb-5 text-xl'>My order</h1>
            {
                orderData?.length > 0 &&
                orderData ?
                <div className='flex flex-col space-y-3'>
                    {
                        orderData.map((item) => (
                            <div
                            key={item?._id}
                            className='border border-slate-300 rounded-2xl p-4 bg-white/40 backdrop-blur-md'>
                                <div className='pb-4 border-b-2 border-slate-300 flex justify-between'>
                                <h1 className='  text-md font-thin'><span className='font-bold'>Order ID:</span> {item?._id}</h1>
                                <div className='inline-flex items-center space-y-2 bg-gray-300  px-5 py-1 rounded-lg'>

                                        <PiPersonSimpleBikeLight className='text-xl mr-2' />

                                        <span className='text-xs'>Regular delivery</span>
                                        </div>
                                </div>
                                <div className='flex items-start mt-4 gap-2'>
                                <MdHome className='text-2xl' />
                                <div className='flex flex-col'>
                                <p>{item?.shippingAddress?.name}</p>
                                <p>{item?.shippingAddress?.phone}</p>
                                <p>{item?.shippingAddress?.address}</p>
                                </div>
                                </div>
                                <div className='flex justify-between items-center mt-6'>
                                    <h1 className='font-mono'>Amount payable</h1>
                                    <h1 className='font-mono text-xl'>{item?.totalAmount}$</h1>
                                </div>
                                <div className='divider' />
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <span>Status:</span>
                                        <span className='px-2 py-0.5 rounded bg-gray-300'>{item?.status}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='bg-green-400 px-2 py-1 rounded border border-green-400 hover:border-black transition duration-200 cursor-pointer'>Order again</button>
                                       <Link to={`/userDashboard/view-order/${item?._id}`}>
                                       <button className='bg-gray-300 px-2 py-1 rounded border border-gray-300 hover:border-black transition duration-200 cursor-pointer'>View order</button>
                                       </Link> 
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <p>Nai</p>
            }
        </div>
    );
};

export default OrderManagement;<h1>Order management</h1>