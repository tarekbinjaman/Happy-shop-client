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
                <div>
                    {
                        orderData.map((item) => (
                            <p>One</p>
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