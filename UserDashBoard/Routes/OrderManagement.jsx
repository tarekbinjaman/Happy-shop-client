import React from 'react';
import UseAuth from '../../Context/UseAuth';
import useOrder from '../../api/useOrder';

const OrderManagement = () => {
    const {user} = UseAuth();
    const [orderData , isLoading, refetch]  = useOrder(user?.email);
    console.log("Here is order data+++++++++", orderData)
    return (
        <div>
            <h1>Order management</h1>
            {
                orderData?.length > 0 &&
                orderData ?
                <div className='flex flex-col'>
                    {
                        orderData.map((item) => (
                            <div className='border border-slate-300 rounded-2xl p-4'>
                                <h1 className='border-b-2 border-slate-300 pb-4 text-md font-thin'><span className='font-bold'>Order ID:</span> {item?._id}</h1>
                                <p>One</p>
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