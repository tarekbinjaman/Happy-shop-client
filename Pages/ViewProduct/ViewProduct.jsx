import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../api/useProducts";
import { RxBorderSolid } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";
import ProductList from "./ProductList";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { div } from "framer-motion/client";
import ProductDetails from "./ProductDetails";
import DeliveryAndReturn from "./DeliveryAndReturn";

const ViewProduct = () => {
  const { productId } = useParams();
  const [products, isLoading] = useProducts();
  const [showImage, setShowImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const singleProduct = products.find((items) => items?._id === productId);
  const imageContainer = singleProduct?.images || [];
  const firstImage = imageContainer[0]?.url || "";

  // tabs hooks
  const [aciteveTab, setActiveTab] = useState(0); // 0 = first tab
  const tabs = ["Product Details", "Reviews","Delivery & Return"];

  useEffect(() => {
    firstImage && setShowImage(firstImage);
  }, [firstImage]);
  if (isLoading) {
    return <p>Product is loading</p>;
  }
  const addToCart = () => {
    console.log({
      productId: productId,
      title: singleProduct?.title,
      price: singleProduct?.finalPrice,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
  };
  console.log("This is product in single page", imageContainer);
  return (
    <div className="w-7/10 mx-auto">
      <div className="flex gap-6 justify-between">
        <div className={`flex gap-8 justify-center`}>
          {/* image area */}
          <div className="flex gap-2">
            {imageContainer.length > 1 && (
              <div className="h-[422px] w-[140px] flex flex-col overflow-y-auto space-y-2.5">
                {/* all images */}
                {imageContainer.map((img, index) => (
                  <img
                    src={img?.url}
                    alt=""
                    onClick={() => {
                      setShowImage(img?.url);
                    }}
                    className={`w-full h-[133px] object-cover rounded-md
                                        ${
                                          showImage === img?.url
                                            ? "border-2 border-blue-500 rounded-md"
                                            : ""
                                        }
                                            `}
                  />
                ))}
              </div>
            )}
            <div className="h-[422px]">
              <img
                src={showImage}
                alt=""
                className="w-[400px] h-full object-cover rounded-md"
              />
            </div>
          </div>
          {/* text area */}

          <div className="flex flex-col space-y-2 h-[422px] justify-between">
            {/* text-area 1 / first container */}
            <div>
              <h1 className="text-4xl font-bold uppercase">
                {singleProduct?.title}
              </h1>
              {/* rating */}
              {/* price area */}
              <div className="flex gap-4 items-center relative mt-2">
                <span className="text-3xl font-bold">
                  ${singleProduct?.finalPrice}
                </span>
                <span className="text-[13px] text-red-500 absolute ml-14 -mt-3">
                  -{singleProduct?.discount}%
                </span>
              </div>
              <div className="mt-2">
                {/* colors */}
                <p className="text-md text-gray-400">
                  Colors :{" "}
                  <span
                    style={{ background: selectedColor }}
                    className="inline-block h-3 w-4 border-gray-500 border-2"
                  ></span>
                </p>
                <div className="flex items-center gap-4 mt-2 mb-2">
                  {singleProduct?.color?.map((col, index) => (
                    <div
                      onClick={() => {
                        setSelectedColor(col);
                      }}
                      style={{ background: col }}
                      className={` h-6 w-6 border-2 mt-1 cursor-pointer
    ${
      selectedColor === col
        ? "border-black shadow-2xl shadow-blue-300/50 border-3"
        : "border-gray-400"
    }`}
                      key={index}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-96 mt-2">
                {/* description */}
                <p className="text-sm">{singleProduct?.description}</p>
              </div>
            </div>
            {/* button area start here  / second container*/}
            <div className="">
              <div className="mt-4 bg-gray-200 p-2 flex-1 mb-4">
                {/* size */}
                <p className="text-xs mb-4 uppercase">Available size</p>
                <div className="flex gap-4">
                  {singleProduct?.size.map((siz, index) => (
                    <p
                      onClick={() => {
                        setSelectedSize(siz);
                      }}
                      className={`text-xs bg-white px-3 py-1  border-2 cursor-pointer ${
                        selectedSize === siz ? " border-black" : "border-white"
                      } `}
                    >
                      {siz}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {/* button 1 */}
                <div className="inline-flex gap-5 bg-[#f0f0f0] px-4 py-1 rounded-3xl">
                  <button
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity - 1);
                    }}
                    className={`text-xl ${
                      quantity === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } `}
                  >
                    <RxBorderSolid />
                  </button>
                  <p className="text-xl">{quantity}</p>
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className="text-xl cursor-pointer"
                  >
                    <GrAdd />
                  </button>
                </div>
                {/* button 2 */}
                <div className="flex-grow">
                  <button
                    onClick={addToCart}
                    className="text-sm w-full bg-orange-400 px-6 py-2 rounded-3xl text-white cursor-pointer hover:bg-orange-500 transition duration-400"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {/* product list */}
          <ProductList />
        </div>
      </div>
      <div className="mt-12">
        {/* tabs */}
        <div className="flex gap-2.5 border-b border-black justify-center">
        {
          tabs.map((tab, index) => (
            <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-3 py-1 uppercase cursor-pointer transition
              ${aciteveTab === index ? 'bg-blue-400 text-white' : 'bg-gray-300 text-gray-700'}
              `}
            >
              {tab}
            </button>
          ))
        }
        </div>
        <div>
          {aciteveTab === 0 && <div><ProductDetails id={productId} /> </div>}
          {aciteveTab === 1 && <div>This is Reviews content.</div>}
          {aciteveTab === 2 && <div><DeliveryAndReturn /></div>}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
