import React from "react";
import { TiTick } from "react-icons/ti";

const ConfirmOrder = () => {
  return (
    <div className="inset-0 bg-black/20 backdrop-blur-xs fixed z-50">
      <div className="bg-slate-100  absolute top-20 left-1/2 -translate-x-1/2 h-[700px] z-50 rounded-2xl lg:w-xl w-lg">
        <h1 className="pt-4 pl-4 pb-4 text-xl font-semibold bg-white rounded-t-2xl">Payment</h1>
        <div className="border-b-2  border-slate-300"></div>
        <div className="flex flex-col justify-center items-center gap-y-2 mt-4 mx-5 rounded-2xl py-4 bg-white">
          <div className="bg-slate-500 inline-block rounded-full">
            <TiTick className="text-8xl text-white" />
          </div>
          <h1 className="text-xl font-bold">Congratulation!</h1>
          <p>
            <span className="text-gray-500">Order place successfully by</span>
            <span className="font-bold">"Cash On Delivery".</span>{" "}
          </p>
          <div>
            <div className="flex flex-col items-center gap-y-2">
            <div className="bg-green-500 inline-block rounded-full">
              <TiTick className="text-3xl text-white" />
            </div>
              <p className="text-green-600">Order placed</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start pl-8 gap-y-2 mt-4 mx-5 rounded-2xl py-4 bg-white">
            <h1 className="text-lg text-gray-500">Subtotal (MRP)</h1>
            <h1 className="text-lg text-gray-500">Discount Applied</h1>
            <h1 className="text-lg text-gray-500">Regular Delivery</h1>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
