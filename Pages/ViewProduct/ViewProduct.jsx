import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../api/useProducts";
import { RxBorderSolid } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProductReview from "./ProductReview";
import { toast } from "react-toastify";
import axios from "axios";
import UseAuth from "../../Context/UseAuth";
import useCart from "../../api/useCart";
import { IoHeartOutline } from "react-icons/io5";
import useWishList from "../../api/useWishList";

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
  const [error, setError] = useState({});
  const [colorErrors, setColorErrors] = useState(false);
  const [sizeErrors, setSizeErrors] = useState(false);
  const { user } = UseAuth();
  const [cartData, isCartLoading, cartRefetch] = useCart(user?.email);
  const quantityPrice = quantity * singleProduct?.finalPrice;
  const quantityDiscount = quantity * singleProduct?.discount;
  const [wishListData, wishListLoading, wishListRefetch] = useWishList(user?.email);

  // checking is included in Wishlist or not
  const isIncludedInWishList = wishListData && wishListData.find(item => item?.productId === singleProduct?.productId)

  console.log("isIncludedInWishList 📋📋📋📋", wishListData)

  // tabs hooks
  const [aciteveTab, setActiveTab] = useState(0); // 0 = first tab
  const tabs = ["Product Details", "Reviews"];

  useEffect(() => {
    firstImage && setShowImage(firstImage);
  }, [firstImage]);
  if (isLoading) {
    return <p>Product is loading</p>;
  }
  const triggerColorError = () => {
    setColorErrors(true);
    setTimeout(() => {
      setColorErrors(false);
    }, 2000);
  };
  const triggerSizeError = () => {
    setSizeErrors(true);
    setTimeout(() => {
      setSizeErrors(false);
    }, 2000);
  };
  const addToCart = async () => {
    // let newError = {}
    // if(!selectedSize) {
    //   newError.sizeError = "please select a size";
    // };
    // if(!selectedColor) {
    //   newError.colorError = "please select a color";
    // };
    // setError(newError);

    let hashError = false;

    if (!selectedSize) {
      toast.error("Select a color before add to cart");
      triggerSizeError();
      hashError = true;
    }
    if (!selectedColor) {
      toast.error("Select a size 🤏 before add to cart");
      triggerColorError();
      hashError = true;
    }
    if (hashError) return;
    console.log("All errors", error);
    const cartData = {
      userEmail: user?.email,
      productId: productId,
      title: singleProduct?.title,
      price: quantityPrice,
      discount: quantityDiscount,
      image: singleProduct?.images[0].url,
      description: singleProduct?.description,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };
    const res = await axios.post(
      "http://localhost:5000/api/cartList",
      cartData
    );
    if (res.data.success) {
      toast.success("Product added successfully", {
        position: "top-center",
        style: { width: "750px", height: "50px" },
      });
      console.log(res.data);
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
      cartRefetch();
    }
    if (!res.data.success) console.log(res);

    console.log(cartData);
  };

  const addToWishList = async() => {
    try {

      const wishlistData = {
        userEmail: user?.email,
        productId: productId,
        title: singleProduct?.title,
        price: quantityPrice,
        image: singleProduct?.images[0].url,
        description: singleProduct?.description,
      };
      const res = await axios.post("http://localhost:5000/api/wishlist", wishlistData)
  
      if(res.data.success) {
        toast.success("Added to wishlist", {position: "top-center"})
      } 
    } catch (err) {

      toast.error("Wishlist added failed")
    }
    
  };

  console.log("This is product in single page", imageContainer);
  return (
    <div className="xl:w-7/10 lg:w-11/12 mx-auto ">
      <div className="lg:flex gap-6 justify-between ">
        <div
          className={`flex lg:flex-row flex-col gap-8 justify-center lg:px-0 px-4`}
        >
          {/* image area */}
          <div className="flex gap-2 justify-center mt-4">
            {imageContainer.length > 1 && (
              <div className="md:h-[422px] h-[350px] w-[140px] flex flex-col overflow-y-auto space-y-2.5">
                {/* all images */}
                {imageContainer.map((img, index) => (
                  <img
                    src={img?.url}
                    alt=""
                    onClick={() => {
                      setShowImage(img?.url);
                    }}
                    className={`w-full md:h-[133px] flex-1 md:flex-none object-cover rounded-md
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
            <div className={`md:h-[422px] h-[350px]`}>
              <img
                src={showImage}
                alt=""
                className={`w-[400px] h-full object-cover rounded-md}`}
              />
            </div>
          </div>
          {/* text area */}

          <div className="flex flex-col space-y-2 h-[422px] justify-between ">
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
                {imageContainer.length > 1 ? (
                  <span className="text-[13px] text-red-500 absolute ml-14 -mt-3">
                    -{singleProduct?.discount}%
                  </span>
                ) : (
                  <span className="text-[13px] text-red-500 absolute ml-18 -mt-3">
                    -{singleProduct?.discount}%
                  </span>
                )}
              </div>
              <div className="mt-2">
                {/* colors */}
                <p className="text-md text-gray-400">
                  Selected Colors :
                  {selectedColor ? (
                    <span
                      style={{ background: selectedColor }}
                      className={`inline-block h-3 w-4 border-gray-500 border-2 ml-2`}
                    ></span>
                  ) : (
                    <span className="pl-2">No color selected 🚫</span>
                  )}
                </p>
                <div
                  className={`flex items-center gap-4 mb-2 border border-white py-1 transform duration-300 ease-in-out
                  ${
                    colorErrors
                      ? "animate-pulse border-yellow-700 border-3 pl-2"
                      : ""
                  }
                  `}
                >
                  {singleProduct?.color?.map((col, index) => (
                    <div
                      onClick={() => {
                        setSelectedColor(col);
                        setError((Prev) => ({ ...Prev, colorError: null }));
                      }}
                      style={{
                        background: col,
                        borderStyle: selectedColor === col ? "solid" : "dotted",
                      }}
                      className={` mt-1 cursor-pointer transition border-2
    ${
      selectedColor === col
        ? "h-8 w-8 border-3 border-yellow-400 "
        : "h-6 w-6 border-black "
    }}
    `}
                      key={index}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-96 mt-2">
                {/* description */}
                <p className="text-sm">{singleProduct?.description}</p>
              </div>
            </div>
            {/* button area start here  / second container*/}
            <div className="">
              <div
                className={`mt-4 bg-gray-200 p-2 flex-1 mb-4
                ${sizeErrors ? "animate-pulse border-yellow-700 border-3" : ""}
                `}
              >
                {/* size */}
                <p className="text-xs mb-4 uppercase">Available size</p>
                <div className="flex gap-4 transform duration-300 ease-in">
                  {singleProduct?.size.map((siz, index) => (
                    <p
                      onClick={() => {
                        setSelectedSize(siz);
                        setError((Prev) => ({ ...Prev, sizeError: null }));
                      }}
                      className={`text-xs bg-white px-3 py-1  border-3 cursor-pointer ${
                        selectedSize === siz
                          ? " border-yellow-400"
                          : "border-white"
                      } 
                      
                      `}
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
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={addToCart}
                      className="text-sm w-full bg-orange-400 px-6 py-2 rounded-3xl text-white cursor-pointer hover:bg-orange-500 transition duration-400"
                    >
                      Add to Cart
                    </button>

                    {/* Wishlist button */}
                    <button
                    onClick={() => addToWishList()}
                      title="Add to wishlist"
                      className="text-red-500 text-2xl border px-2 py-0.5 cursor-pointer rounded"
                    >
                      <IoHeartOutline />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block">
          {/* product list */}
          <ProductList />
        </div>
      </div>
      <div className="mt-12">
        {/* tabs */}
        <div className="flex gap-2.5 border-b border-gray-300 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1 uppercase cursor-pointer transition
              ${
                aciteveTab === index
                  ? "bg-blue-400 text-white"
                  : "bg-gray-300 text-gray-700"
              }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="lg:px-0 px-4">
          {aciteveTab === 0 && (
            <div>
              <ProductDetails id={productId} />{" "}
            </div>
          )}
          {aciteveTab === 1 && (
            <div>
              <ProductReview id={productId} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
