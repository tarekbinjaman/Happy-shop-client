import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../api/useProducts";
import { RxBorderSolid } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";

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
  const filledStars = Math.floor(singleProduct?.rating);
  const hasHalfStar = singleProduct?.rating >= 0.5;
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
    <div className="w-11/12 mx-auto">
      <div className={`flex gap-2 justify-center`}>
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
        <div>
          <div className="flex flex-col space-y-2 h-full border">
            <h1 className="text-4xl font-bold uppercase">
              {singleProduct?.title}
            </h1>
            {/* rating */}
            {/* price area */}
            <div className="flex gap-4 items-center relative">
              <span className="text-3xl font-bold">
                ${singleProduct?.finalPrice}
              </span>
              <span className="text-[13px] text-red-500 absolute ml-14 -mt-3">
                -{singleProduct?.discount}%
              </span>
            </div>
            <div>
            </div>
            <div className="flex-1">
              {/* colors */}
              <p className="text-md text-gray-400">Colors : <span style={{ background: selectedColor }} className='inline-block h-3 w-4 border-gray-500 border-2'></span></p>
              <div className="flex items-center gap-4">
                {singleProduct?.color?.map((col, index) => (
                  <div
                    onClick={() => {
                      setSelectedColor(col);
                    }}
                    style={{ background: col }}
                    className={` h-6 w-6 border-2 mt-1 cursor-pointer
    ${selectedColor === col ? "border-black shadow-2xl shadow-blue-300/50 border-3" : "border-gray-400"}`}
                    key={index}
                  ></div>
                ))}
              </div>
            </div>
            <div className="mt-4 bg-gray-200 p-2 flex-1">
              {/* colors */}
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
            <div className="flex-1">
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
                    className="text-sm w-full bg-black px-6 py-2 rounded-3xl text-white cursor-pointer hover:bg-gray-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
