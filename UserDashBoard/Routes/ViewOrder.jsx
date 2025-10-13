import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAuth from "../../Context/UseAuth";
import axios from "axios";
import { MdHome } from "react-icons/md";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";

const ViewOrder = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const onfetch = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/order?email=${user?.email}`
      );
      if (res.data.success) {
        setData(res.data.Data);
      }
    };
    onfetch();
  }, [user?.email]);

  // Wait until the data is loaded

  const orderData = data && data.find((item) => item?._id === id);

  console.log("orderData >>>>>>>>>++++++++++++++++++++++++++++++", orderData);

  return (
    <div>
      <div className="flex flex-col space-y-5 mx-8 mt-8 bg-white p-8 rounded-2xl">
        {orderData &&
          orderData?.item.map((items) => (
            <div className="flex justify-between bg-white px-2 py-1 rounded-md border border-slate-300">
              <div className="flex space-x-2">
                <div>
                  <img className="w-20" src={items?.image} alt="" />
                </div>
                <div>
                  <h1>{items?.title}</h1>
                  <h1 className="text-gray-400 mt-2">
                    {items?.description.slice(0, 15)}
                  </h1>
                </div>
              </div>
              <div>
                <p>
                  <span className="font-bold text-lg">Price</span>{" "}
                  <span>{items?.price}</span>$
                </p>
                <span>
                  <span className="font-thin text-lg text-gray-400">
                    Quantitiy:
                  </span>{" "}
                  <span className="font-bold text-lg">{items?.quantity}</span>
                </span>
                <p className="text-lg bg-green-400 text-center rounded-lg">
                  {orderData?.status}
                </p>
              </div>
            </div>
          ))}
        <button className="border w-full cursor-pointer hover:bg-green-300 transition duration-200 rounded py-2 ">
          Create another order with these items
        </button>
      </div>
      <div className="bg-white mx-8 py-2 mt-4 rounded-xl">
        <div className="flex justify-between mx-4 items-center">
          <span className="text-lg font-bold">Shipping Address</span>
          <button className="border px-4 py-1 rounded cursor-pointer hover:bg-slate-300 transition duration-200">Cancel order</button>
        </div>
        <div className="divider"></div>
        <div className="flex items-start gap-2">
          <div className="pl-2">
          <MdHome className="text-2xl " />
          </div>
          <div className="flex flex-col">
            <p>{orderData?.shippingAddress?.name}</p>
            <p>{orderData?.shippingAddress?.phone}</p>
            <p>{orderData?.shippingAddress?.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-5 bg-white p-4 rounded-xl mb-8">
        <p className="p-3 rounded-lg border-3 border-dotted border-gray-400 bg-[#E7F1F1]">
        <span> You are saving  {orderData?.totalDiscount} <span className="text-white bg-orange-400 rounded-full px-1.5 py-0.5 border-2 border-slate-200">$</span> in this order.</span>
        </p>
        <div className="mt-4">
          <div className="flex flex-col space-y-3">
          <p className="flex justify-between items-center">
            <span className="text-lg">Order ID</span>
            <span className="text-sm border border-slate-300 px-2 py-1 flex justify-between items-center">{orderData?._id} 
              <span 
              onClick={() => {
            navigator.clipboard.writeText(orderData?._id)
            toast.success("Order id copied", {position: "top-center"})
            }}
              className="ml-4 text-lg cursor-pointer"><IoCopyOutline className="opacity-65 hover:opacity-100 transition duration-100" /></span></span></p>

            <p className="flex justify-between items-center"><span className="text-lg">Order At</span> 
            <span className="text-lg text-gray-400">{orderData?.createdAt 
            ?
            new Date(orderData?.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
          :
          "-"
          }
              </span></p>
          <p className="flex justify-between items-center"><span className="text-lg">Subtotal (MRP)</span> <span className="text-lg">{orderData?.subTotal} $</span></p>
          <p className="flex justify-between items-center"><span className="text-lg">Discount applied</span> <span className="text-lg">- {orderData?.totalDiscount} $</span></p>
          <p className="flex justify-between items-center"><span className="text-lg">Shipping cost</span> <span className="text-lg">{orderData?.shippingCost} $</span></p>
          </div>
          <div className="w-full border-b-4 border-dotted border-gray-300 my-3"></div>
            <p className="flex justify-between items-center"><span className="text-lg">Amount Payable</span> <span className="text-lg">{orderData?.totalAmount} $</span></p>
        </div>
        <button className="w-full px-2 py-1 border border-gray-400 mt-4 cursor-pointer hover:bg-green-200 rounded-lg transition duration-200">Download invoice</button>
      </div>
    </div>
  );
};

export default ViewOrder;
