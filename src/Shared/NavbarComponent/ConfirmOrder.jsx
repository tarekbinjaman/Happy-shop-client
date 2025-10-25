import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

const ConfirmOrder = ({id, email, modal, setModal, refetch}) => {
  const [orderData, setOrderData] = useState();
  useEffect( () => {
    const fetchOrderData = async () => {
    try {
        const res = await  axios.get(`https://happy-shop-snowy.vercel.app/api/order?email=${email}`);
              if (res?.data?.success) {
        console.log("Order data: ⬇️", res.data.Data);
        setOrderData(res.data.Data);
        console.log("kkkkkkkkkkkkkkkkkkkkkk", res.data.Data)
        const currentOrder = res?.data?.Data.find((item) => item?._id === id)
        setOrderData(currentOrder)
      } else {
        console.log("API returned success: false");
      }
       } 
       catch (err) {
         console.log("Here is the error while order data fetch", err.message)
        }
      }
    if(email) {
      fetchOrderData();
    }
  }, [email])
  // const regularDelivery = 30;
  // const finalPayment = subTotal + regularDelivery;
  return (
    <div className="inset-0 bg-black/20 backdrop-blur-xs fixed z-50">
      <div className="bg-slate-100  absolute md:top-20 top-10 left-1/2 -translate-x-1/2 h-[700px] z-50 rounded-2xl lg:w-xl md:w-lg w-sm drop-shadow-2xl">
        <h1 className="pt-4 pl-4 pb-4 text-xl font-semibold bg-white rounded-t-2xl ">Payment</h1>
        <div className="border-b-2  border-slate-300"></div>
        <div className="flex flex-col h-[630px] ">

        <div className="flex-grow">
        {/* Success result */}
        <div className="flex flex-col justify-center items-center gap-y-2 mt-4 md:mx-5 mx-2 rounded-2xl py-4 bg-white">
          <div className="bg-slate-500 inline-block rounded-full">
            <TiTick className="text-8xl text-white" />
          </div>
          <h1 className="text-xl font-bold">Congratulation!</h1>
          <p>
            <span className="text-gray-500">Order place successfully by</span>
            <span className="font-bold">"Cash On Delivery".</span>{" "}
          </p>
        </div>
        {/* Amounts */}
        <div className="flex flex-col justify-start items-start px-8 gap-y-2 mt-4 md:mx-5 mx-2 rounded-2xl py-4 bg-white">
            <span className="text-lg text-gray-500 flex justify-between w-full "><span>Subtotal (MRP)</span> <span className="text-black font-semibold">{orderData?.subTotal}💲</span></span>
            <span className="text-lg text-gray-500 flex justify-between w-full "><span>Discount Applied (MRP)</span> <span className="text-red-400 font-semibold">- {orderData?.totalDiscount}💲</span></span>
            <span className="text-lg text-gray-500 flex justify-between w-full border-b-2 border-gray-300 pb-2"><span>Regular Delivery</span> <span className="text-red-400 font-semibold">+ {orderData?.shippingCost}💲</span></span>
            <span className="text-lg text-gray-500 flex justify-between w-full "><span className="font-bold">Amount Payable</span> <span className="text-gray-500 font-semibold"> {orderData?.totalAmount}💲</span></span>
        </div>
        </div>

        {/* button */}
        <div className="md:mx-5 mx-2 ">
          <button className="bg-white border-2 border-slate-400 w-full py-2 hover:bg-slate-200 cursor-pointer transition duration-150 rounded-lg">Track order</button>
          <button 
          onClick={() => {
            setModal(!modal)
            refetch()
          }}
          className="bg-slate-600 text-white mt-2 border-2 border-white w-full py-2 cursor-pointer hover:bg-slate-500 transition duration-200 rounded-lg">Close</button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmOrder;
