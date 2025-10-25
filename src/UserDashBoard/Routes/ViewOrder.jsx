import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAuth from "../../../Context/UseAuth";
import axios from "axios";
import { MdHome } from "react-icons/md";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF"; // path to the PDF component
import useOrder from "../../../api/useOrder";

const ViewOrder = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const [datas, isLoading, refetch] = useOrder(user?.email);
  const orderData = datas && datas.find((item) => item?._id === id);
  console.log("Datassssssssssssssssssssssssssssssssssss", orderData);

  console.log("orderData >>>>>>>>>++++++++++++++++++++++++++++++", orderData);

  const newOrder = {
    userEmail: orderData?.userEmail,
    item: orderData?.item,
    shippingAddress: orderData?.shippingAddress,
    status: "pending",
    totalDiscount: orderData?.totalDiscount,
    subTotal: orderData?.subTotal,
    shippingCost: orderData?.shippingCost,
    totalAmount: orderData?.totalAmount,
  };

  const addAnotherOrder = async () => {
    try {
      const res = await axios.post(`https://happy-shop-snowy.vercel.app/api/order`, newOrder);
      if (res.data.success) {
        toast.success("Order added", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error while submiting the order");
      console.log("Error while submiting order", err.message);
    }
  };
  const cancel = { status: "cancel" };
  const cancelOrder = async () => {
    try {
      console.log("ORder........................................");
      const res = await axios.put(
        `https://happy-shop-snowy.vercel.app/api/order/${orderData?._id}`,
        { status: "cancel" }
      );
      if (res.data.success) {
        toast.info("Order canceled");
        refetch();
      }
    } catch (err) {
      toast.error("Error while canceling order");
      console.log("Error while canceling order", err.message);
    }
  };

  console.log("🪝", newOrder);

  return (
    <div>

    {
      orderData?.status === "cancel" 
      ?
        ""
      : 
      <div class="steps w-full">
        <div class={`step step-primary`}>Ordered</div>
        <div class={`step ${["processed", "shipped", "delivered"].includes(orderData?.status) ? "step-primary" : ""} `}>Processed</div>
        <div class={`step ${["shipped", "delivered"].includes(orderData?.status) ? "step-primary" : ""} `}>Shipped</div>
        <div class={`step ${orderData?.status ==="delivered" ? "step-primary" : ""} `}>Delivered</div>
      </div>
    }


      <div className="flex flex-col space-y-5 md:mx-8 mt-8 bg-white p-8 rounded-2xl">
        {orderData &&
          orderData?.item.map((items) => (
            <div className="flex justify-between bg-white px-2 py-1 rounded-md border border-slate-300">
              <div className="flex space-x-2">
                <div>
                  <img className="w-20" src={items?.image} alt="" />
                </div>
                <div className="mt-2">
                  <h1 className="text-sm md:text-base">{items?.title}</h1>
                  <h1 className="text-gray-400 mt-2 text-xs md:text-base">
                    {items?.description.slice(0, 15)}
                  </h1>
                </div>
              </div>
              <div>
                <p>
                  <span className="font-bold md:text-lg text-sm">Price</span>{" "}
                  <span>{items?.price}</span>$
                </p>
                <span>
                  <span className="font-thin md:text-lg text-sm text-gray-400">
                    Quantitiy:
                  </span>{" "}
                  <span className="font-bold text-lg">{items?.quantity}</span>
                </span>
                <p className="md:text-lg text-sm bg-green-400 text-center rounded-lg">
                  {orderData?.status && orderData?.status === "cancel"
                    ? "Canceled"
                    : orderData?.status}
                </p>
              </div>
            </div>
          ))}
        <button
          onClick={addAnotherOrder}
          className="border w-full cursor-pointer bg-slate-200 hover:bg-green-300 transition duration-200 rounded py-2 "
        >
          Create another order with these items
        </button>
      </div>
      <div className="bg-white md:mx-8 py-2 mt-4 rounded-xl">
        <div className="flex justify-between mx-4 items-center">
          <span className="text-lg font-bold">Shipping Address</span>
          <button
            onClick={() => cancelOrder()}
            className={`border px-4 py-1 rounded transition duration-200 
    ${
      orderData?.status === "cancel"
        ? "cursor-not-allowed bg-gray-300 text-gray-500/40"
        : "cursor-pointer hover:bg-slate-300"
    }`}
          >
            Cancel order
          </button>
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
      <div id="invoice-area" className="md:mx-8 mt-5 bg-white p-4 rounded-xl mb-8">
        <div>
          <p className="p-3 rounded-lg border-3 border-dotted border-gray-400 bg-[#E7F1F1]">
            <span>
              {" "}
              You are saving {orderData?.totalDiscount}{" "}
              <span className="text-white bg-orange-400 rounded-full px-1.5 py-0.5 border-2 border-slate-200">
                $
              </span>{" "}
              in this order.
            </span>
          </p>
          <div className="mt-4">
            <div className="flex flex-col space-y-3">
              <p className="flex justify-between items-center">
                <span className="text-lg">Order ID</span>
                <span className="text-sm border border-slate-300 px-2 py-1 flex justify-between items-center">
                  {orderData?._id}
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(orderData?._id);
                      toast.success("Order id copied", {
                        position: "top-center",
                      });
                    }}
                    className="ml-4 text-lg cursor-pointer"
                  >
                    <IoCopyOutline className="opacity-65 hover:opacity-100 transition duration-100" />
                  </span>
                </span>
              </p>

              <p className="flex justify-between items-center">
                <span className="text-lg">Order At</span>
                <span className="text-lg text-gray-400">
                  {orderData?.createdAt
                    ? new Date(orderData?.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-lg">Subtotal (MRP)</span>{" "}
                <span className="text-lg">{orderData?.subTotal} $</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-lg">Discount applied</span>{" "}
                <span className="text-lg">- {orderData?.totalDiscount} $</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-lg">Shipping cost</span>{" "}
                <span className="text-lg">{orderData?.shippingCost} $</span>
              </p>
            </div>
            <div className="w-full border-b-4 border-dotted border-gray-300 my-3"></div>
            <p className="flex justify-between items-center">
              <span className="text-lg">Amount Payable</span>{" "}
              <span className="text-lg">{orderData?.totalAmount} $</span>
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <PDFDownloadLink
            document={<InvoicePDF orderData={orderData} />}
            fileName={`invoice_${orderData?._id}.pdf`}
            style={{
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              width: "100%",
              textAlign: "center",
            }}
          >
            {({ loading }) => (loading ? "Loading..." : "Download Invoice")}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
