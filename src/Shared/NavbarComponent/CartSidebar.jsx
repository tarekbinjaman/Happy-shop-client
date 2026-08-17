import React from "react";
import { BsCart2 } from "react-icons/bs";
import { FaRegFaceFrownOpen } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { IoHome } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { VscArrowSmallRight } from "react-icons/vsc";

import CartProductCard from "./CartProductCard";

const CartSidebar = ({
  cartRef,
  cartBar,
  setCartBar,
  mycart,
  userData,
  setIsAddressOpen,
  placeOrder,
  cartRefetch,
  myCartPrice,
  userAddress,
  mobileNumber,
  name,
  isAddressOpen,
  setIsAddressOpen,
  setName,
  setMobileNumber,
  setUserAddress,
  addAddress,
}) => {
  return (
    <>
      {/* Cart Sidebar */}
      <div
        ref={cartRef}
        className={`fixed h-full z-50 top-0 right-0 w-96 bg-slate-100
          border-l-2 border-white duration-300 ease-in-out
          ${cartBar ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div>
          <div className="flex justify-between pl-1 py-1 border-3 rounded-md mt-4 border-white items-center bg-white/5 backdrop-blur-lg mx-1">
            <h1 className="text-xl bg-white px-2 py-1 rounded-md">
              Shopping Cart
            </h1>

            <IoMdClose
              onClick={() => setCartBar(!cartBar)}
              className="text-4xl cursor-pointer"
            />
          </div>
        </div>

        {/* Shipping Address */}
        {mycart?.length > 0 &&
          (userData?.useraddress?.length > 0 ? (
            <div className="bg-white border border-slate-300 p-2 mx-2 rounded-md mt-4 pb-4 shadow-xl">
              <div
                onClick={() => setIsAddressOpen(true)}
                className="flex justify-between border-b border-slate-400 mb-2 pb-2 items-center"
              >
                <h1 className="text-gray-400">
                  Shipping Address
                </h1>

                <span className="flex gap-2 border border-slate-300 px-2 rounded-md hover:bg-gray-300 cursor-pointer transition duration-200">
                  <span>Change</span>

                  <GoPencil className="text-xl cursor-pointer" />
                </span>
              </div>

              <div className="flex gap-2 items-start">
                <div>
                  <IoHome className="text-2xl" />
                </div>

                <div
                  className={`h-40 ${
                    userData?.useraddress?.[0]?.address?.length > 120
                      ? "overflow-y-scroll"
                      : ""
                  }`}
                >
                  <p>{userData?.useraddress?.[0]?.name}</p>
                  <p>{userData?.useraddress?.[0]?.number}</p>
                  <p>{userData?.useraddress?.[0]?.address}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAddressOpen(true)}
                className="text-xl btn bg-white px-2 py-1 rounded-md border border-slate-400 cursor-pointer hover:bg-white/30"
              >
                Add address
              </button>
            </div>
          ))}

        {/* Cart Products */}
        {mycart && mycart?.length > 0 ? (
          <div className="relative">
            <div className="flex flex-col space-y-2 mb-2 mt-4 overflow-auto h-[calc(100vh-220px)] pb-60">
              {mycart.map((item) => (
                <CartProductCard
                  key={item?._id}
                  image={item?.image}
                  color={item?.color}
                  title={item?.title}
                  description={item?.description}
                  size={item?.size}
                  id={item?._id}
                  onRefetch={cartRefetch}
                  producuId={item?.productId}
                />
              ))}
            </div>

            {/* Place Order */}
            <button
              onClick={placeOrder}
              className="sticky bottom-0 w-full cursor-pointer group"
            >
              <span className="flex justify-between w-[95%] mx-auto py-3 border bg-black hover:bg-gray-800 duration-200 transition text-white rounded-xl px-4 items-center">
                <span className="flex items-stretch gap-2">
                  <span className="text-2xl bg-gray-400 p-1 px-2 rounded">
                    <BsCart2 />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-white text-sm">
                      {mycart?.length}{" "}
                      <span style={{ letterSpacing: "1px" }}>
                        Item
                      </span>
                    </span>

                    <span className="text-white text-sm text-start">
                      {myCartPrice} <span>$</span>
                    </span>
                  </span>
                </span>

                <span className="flex justify-between items-center">
                  <span>Place order</span>

                  <VscArrowSmallRight className="text-2xl group-hover:translate-x-2 duration-300 transition" />
                </span>
              </span>
            </button>
          </div>
        ) : (
          <div className="h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <FaRegFaceFrownOpen className="text-4xl" />

              <h1 className="text-xl font-thin">
                No product to show
              </h1>
            </div>
          </div>
        )}

        {/* Address Modal */}
        {isAddressOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed z-50 inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center"
          >
            <div>
              <div className="flex flex-col bg-white border/80 w-90 fixed left-1/2 transform -translate-x-1/2 py-3 top-1/2 -translate-y-1/2 rounded-md px-2">
                <div className="mb-2">
                  <div className="flex justify-between items-center relative">
                    <h1 className="text-xl px-2">
                      🏠 Add your address
                    </h1>

                    <RxCrossCircled
                      onClick={() => setIsAddressOpen(false)}
                      className="text-3xl text-red-400 absolute top-0 right-0 cursor-pointer"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  defaultValue={userData?.useraddress?.[0]?.name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3 mb-2"
                  placeholder="your name"
                />

                <input
                  type="number"
                  defaultValue={userData?.useraddress?.[0]?.number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3 mb-2"
                  placeholder="📞 Phone number"
                />

                <textarea
                  defaultValue={userData?.useraddress?.[0]?.address}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="🏚️ Address"
                  className="border border-gray-300 rounded-md h-30 focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3"
                />

                <button
                  className="bg-black text-white mt-2 rounded py-1 cursor-pointer hover:bg-gray-700 transition duration-300 disabled:cursor-not-allowed"
                  disabled={!userAddress || !mobileNumber}
                  onClick={() => {
                    setIsAddressOpen(false);
                    addAddress();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;