import React, { useEffect, useRef, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FaAlignLeft } from "react-icons/fa";
import { GoArrowUpRight, GoChevronDown, GoPencil } from "react-icons/go";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { MdOutlineManageAccounts, MdOutlineRateReview } from "react-icons/md";
import { RxCrossCircled, RxHamburgerMenu } from "react-icons/rx";
import { TbLogout2, TbShoppingCartCheck } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../../Context/UseAuth";
import currentUser from "../../api/currentUser";
import { SlMagnifier } from "react-icons/sl";
import { FaMagnifyingGlass, FaRegFaceFrownOpen } from "react-icons/fa6";
import useCart from "../../api/useCart";
import useProducts from "../../api/useProducts";
import { address, div, image } from "framer-motion/client";
import { FiExternalLink } from "react-icons/fi";
import CartProductCard from "./CartProductCard";
import axios from "axios";
import { VscArrowSmallRight, VscDebugStart } from "react-icons/vsc";
import { toast } from "react-toastify";
import { IoHome } from "react-icons/io5";
import ConfirmOrder from "./NavbarComponent/confirmOrder";

const Navbar = () => {
  const { logOut, user } = UseAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownref = useRef();
  const cartIcon = useRef();
  const cartRef = useRef();
  const searchRef = useRef();
  const searchBarRef = useRef();
  const faSearchIconRef = useRef();
  const sidebarRef = useRef();
  const hamburberRef = useRef();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [data, cartIsLoading, cartRefetch] = useCart(email);
  const [confirmModarId, setConfirmModalID] = useState("");
  const [orderid, setOrderid] = useState("");
  const [openSection, setOpenSection] = useState({
    men: false,
    women: false,
    boys: false,
    girls: false,
    kids: false,
  });

  const mycart = data?.cartData;
  const myCartNameandPrice =
    mycart &&
    mycart?.map((item) => ({
      productId: item?._id,
      title: item?.title,
      color: item?.color,
      price: item?.price,
      size: item?.size,
      image: item?.image,
      description: item?.description,
      quantity: item?.quantity
    }));
  console.log("MyCartNameandPrice 🌊", myCartNameandPrice);
  console.log("Mycart data 🏬", mycart);

  // total of my cart price
  const myCartPrice = mycart?.reduce((acc, item) => acc + item?.price, 0);
  const myCartDiscount = mycart?.reduce((acc, item) => acc + item?.discount, 0);
  const shippingCost = 50;
  const totalAmount = myCartPrice + shippingCost;

  // confirm modal togglse state
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  console.log("My cart price 💵", myCartPrice);

  const handleSection = (section) => {
    setOpenSection({
      men: false,
      women: false,
      boys: false,
      girls: false,
      kids: false,
      [section]: !openSection[section],
    });
  };

  // search bar hooks
  const [query, setQuery] = useState("");
  const [filterParams, setFilterParams] = useState({});
  const [products, ProductLoading] = useProducts(filterParams);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartBar, setCartBar] = useState(false);

  // modal toggle state
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [name, setName] = useState("");
  console.log("Mobile and use 🙋🏻‍♂️", userAddress, mobileNumber);
  const updateData = {
    useraddress: [{ name: name, address: userAddress, number: mobileNumber }],
  };
  const addAddress = async () => {
    try {
      const res = await axios.put(
        `https://happy-shop-snowy.vercel.app/api/users/${userData?._id}`,
        updateData
      );
      refetchUserList();
      console.log("!!!!!!!!!!!", res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (
      userData?.useraddress?.[0]?.number ||
      userData?.useraddress?.[0]?.address ||
      userData?.useraddress?.[0]?.name
    ) {
      setUserAddress(userData?.useraddress?.[0]?.address);
      setMobileNumber(userData?.useraddress?.[0]?.number);
      setName(userData?.useraddress?.[0]?.name);
    }
  }, [userData]);

  // search button function
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/productsList?search=${encodeURIComponent(query)}`);
    }
  };

  // searchbar key handle functions
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setFilterParams({ search: value });
      setShowSuggestions(true);
      console.log("Navbar products", products);
    } else {
      setFilterParams({});
      setShowSuggestions(false);
    }
  };

  console.log("Here is my cart ➡️", mycart);

  // const mycart = cartData?.filter((item) => item?.userEmail === email) || [];

  const isActive = ({ isActive }) =>
    isActive ? "text-blue-500 bg-slate-200" : "";
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const orderData = {
    userEmail: userData?.email,
    item: myCartNameandPrice,
    shippingAddress: {
      name: name,
      address: userAddress,
      phone: mobileNumber,
    },
    status: "pending",
    totalDiscount: myCartDiscount,
    subTotal: myCartPrice,
    shippingCost: shippingCost,
    totalAmount: totalAmount,
  };

  console.log("Order data here 🚚", orderData);

  const placeOrder = async () => {
    if (!userAddress || !mobileNumber || !name) {
      setIsOpenConfirmModal(false);
      return toast.error("Please add home name, address and phone number");
    } else {
      try {
        const res = await axios.post(
          `https://happy-shop-snowy.vercel.app/api/order`,
          orderData
        );
        if (res.data.success) {
          await axios.delete(
            `https://happy-shop-snowy.vercel.app/api/cartList/clear/${userData?.email}`
          );
          setOrderid(res?.data?.order?._id)
          setConfirmModalID(res.data.order?._id)
          setIsOpenConfirmModal(!isOpenConfirmModal);
        }
      } catch (err) {
        toast.error("Error while submiting the order");
        console.log("Error while submiting order", err.message);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartIcon.current && cartIcon.current.contains(event.target)) return;

      const isInsideSearch =
        (searchRef.current && searchRef.current.contains(event.target)) ||
        (faSearchIconRef.current &&
          faSearchIconRef.current.contains(event.target)) ||
        (searchBarRef.current && searchBarRef.current.contains(event.target));
      if (!isInsideSearch) {
        setIsSearchBarOpen(false);
      }
      const isInsideSidebar =
        (sidebarRef.current && sidebarRef.current.contains(event.target)) ||
        (hamburberRef.current && hamburberRef.current.contains(event.target));
      if (!isInsideSidebar) {
        setIsSidebarOpen(false);
      }
      if (
        dropdownref.current &&
        !dropdownref.current.contains(event.target) &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setShowSuggestions(false);
        setCartBar(false);
        {
          dropdownOpen ? console.log("dropdown true") : "dropdown false";
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  console.log("userData: 😊", userData, user);
  return (
    <nav className="py-4 bg-white md:px-12">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-6 whitespace-nowrap">
          {/* logo */}
          <div className="flex xl:items-center items-end gap-2">
            {/* sidebar icon */}
            <div
              className="xl:hidden block mr-3"
              onClick={() => setIsSidebarOpen(true)}
            >
              <RxHamburgerMenu
                ref={hamburberRef}
                className="md:text-3xl text-[26px] "
              />
            </div>
            {/* logo */}
            <Link to={`/`}>
              <p
                className="uppercase font-bold 2xl:text-3xl text-2xl"
                style={{ fontFamily: "Integral CF", letterSpacing: "2px" }}
              >
                <span>shop</span>.co
              </p>
            </Link>
          </div>
          <div className="hidden 2xl:block xl:block">
            {/* navlinks */}
            <div>
              <ul className="flex 2xl:text-[18px] xl:text-[15px] font-normal 2xl:gap-8 xl:gap-5">
                <li className="hover:text-orange-300">
                  <Link to={"/"}>Home</Link>
                </li>
                <div className="">
                  <li className="group">
                    {" "}
                    <span className="flex items-center gap-1 ">
                      Men{" "}
                      <GoChevronDown className="group-hover:text-orange-300" />
                    </span>
                    <div className="relative">
                      <ul
                        className="absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    "
                      >
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/T-Shirt"}
                          >
                            {" "}
                            <span className=" hover:ml-2 transition-all duration-300">
                              T Shirt
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Polo Shirt"}
                          >
                            {" "}
                            <span className=" hover:ml-2 transition-all duration-300">
                              Polo Shirt
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Cuban Collar Shirt"}>
                              Cuban Collar Shirt
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Dress Shirt"}>
                              Dress Shirt
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/Casual"}>Casual</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/Formal"}>Formal</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/Gym"}>Gym</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/V Neck"}>V-neck</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
                <div className="">
                  <li className="group">
                    {" "}
                    <span className="flex items-center gap-1 ">
                      Women{" "}
                      <GoChevronDown className="group-hover:text-orange-300" />
                    </span>
                    <div className="relative">
                      <ul
                        className="absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    "
                      >
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/A-Line"}
                          >
                            {" "}
                            <span className=" hover:ml-2 transition-all duration-300">
                              A-Line
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Apron"}
                          >
                            {" "}
                            <span className=" hover:ml-2 transition-all duration-300">
                              Apron
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Asymmetrical"}>
                              Asymmetrical{" "}
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Ball Gown"}>
                              Ball Gown
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Caftan"}>Caftan</Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/One-Shoulder"}>
                              One-Shoulder
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Yoke Dress"}>
                              Yoke Dress
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Wrap Dress"}>
                              Wrap Dress
                            </Link>
                          </span>{" "}
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/Basic"}>Basic</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"productsList/Party"}>Party</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
                <div className="">
                  <li className="group">
                    {" "}
                    <span className="flex items-center gap-1 ">
                      Boys{" "}
                      <GoChevronDown className="group-hover:text-orange-300" />
                    </span>
                    <div className="relative">
                      <ul
                        className="absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    "
                      >
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/T-Shirt"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              T-shirt
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Shorts"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              Shorts
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Overalls"}>Overalls</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Hoodie"}>Hoodie</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Sweatpants"}>
                              Sweatpants
                            </Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Polo Shirt"}>
                              Polo Shirt
                            </Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Dungarees"}>
                              Dungarees
                            </Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Bomber Jacket"}>
                              Bomber Jacket
                            </Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Basic-Boys"}>Basic</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
                <div className="">
                  <li className="group">
                    {" "}
                    <span className="flex items-center gap-1 ">
                      Girls{" "}
                      <GoChevronDown className="group-hover:text-orange-300" />
                    </span>
                    <div className="relative">
                      <ul
                        className="absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    "
                      >
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Frock"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              Frock
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Skirt"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              Skirt
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Leggings"}>Leggings</Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Gown"}>Gown</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
                <div className="">
                  <li className="group">
                    {" "}
                    <span className="flex items-center gap-1 ">
                      Kids{" "}
                      <GoChevronDown className="group-hover:text-orange-300" />
                    </span>
                    <div className="relative">
                      <ul
                        className="absolute top-2 left-0 bg-white/30 backdrop-blur-md shadow-xl py-3 w-56 pr-2 space-y-1 border  border-white
                                    opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100
                                    transform 
                                    transition-all 
                                    duration-200 
                                    ease-in-out
                                    -translate-x-2
                                    group-hover:translate-x-0
                                    z-50
                                    divide-y divide-gray-300
                                    "
                      >
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Rompers"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              Rompers
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer  font-semibold relative group/li">
                          <Link
                            className="flex justify-between items-center"
                            to={"/productsList/Jumpsuit"}
                          >
                            <span className=" hover:ml-2 transition-all duration-300">
                              Jumpsuit
                            </span>
                          </Link>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Dungarees"}>
                              Dungarees
                            </Link>
                          </span>
                        </li>
                        <li className=" pl-4 cursor-pointer font-semibold whitespace-nowrap">
                          <span className="hover:ml-2 transition-all duration-300">
                            <Link to={"/productsList/Tracksuit"}>
                              Tracksuit
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
                <li className="hover:text-orange-300">
                  <Link to={"/productsList/newArrival"}>New Arrival</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* search bar */}
        {/* <input className='md:mx-8 mx-4  lg:py-2 lg:px-4 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 hidden xl:block' placeholder='  🔍 Search for products...' type="text" name="" id="" /> */}
        {/* search bar */}
        <div class="md:mx-8 mx-4  lg:py-2 lg:px-4 p-0.5 flex-1 hidden lg:block">
          <div class="relative">
            <input
              onChange={handleChange}
              onFocus={() => query && setShowSuggestions(true)}
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search product..."
            />
            <button
              class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Search
            </button>
          </div>
          {/* Suggestions Dropdown */}
          {showSuggestions && !ProductLoading && products.length > 0 && (
            <ul className="absolute z-50 mt-1 2xl:w-[745px] xl:w-[453px] lg:w-[514px] bg-white border border-slate-200 rounded-md shadow-md px-2 max-h-3/6 overflow-y-auto">
              {products.map((item) => (
                // <div
                // key={item._id}
                // className="px-3 py-2 cursor-pointer hover:bg-slate-100 text-sm text-blackflex"
                // onClick={() => {
                //   setQuery(item.title);
                //   setShowSuggestions(false);
                // }}>
                // {item.title}
                // {item?.images[0]}
                // </div>
                <Link to={`viewProduct/${item?._id}`}>
                  <div
                    key={item?._id}
                    className="px-3 py-1 w-full bg-white border border-slate-200 rounded-md shadow-md flex justify-between items-center my-3 cursor-pointer hover:border-blue-500"
                  >
                    {item?.title}
                    <img
                      className="w-10 h-10 object-cover"
                      src={item?.images[0].url}
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
        {/* <input className='md:mx-8 mx-4  lg:p-2 p-0.5 rounded-3xl bg-[#f0f0f0] flex-1 md:hidden' placeholder='  🔍 ' type="text" name="" id="" /> */}

        {/* cart and profile icons */}
        <div>
          <div className="flex md:gap-4 gap-4 items-center whitespace-nowrap">
            {/* profile and cart */}
            <div className="flex items-center gap-4">
              <FaMagnifyingGlass
                ref={faSearchIconRef}
                className="text-2xl font-bold text-gray-500 cursor-pointer hover:text-black 2xl:hidden lg:hidden"
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              />
              <div ref={cartIcon} className="relative mr-3">
                <BsCart2
                  onClick={() => setCartBar(!cartBar)}
                  className="text-3xl text-gray-500 cursor-pointer hover:text-black "
                />
                {mycart?.length > 0 ? (
                  <p className="absolute text-base -top-2 -right-5 ">
                    {mycart?.length}
                  </p>
                ) : (
                  <p className="absolute text-base -top-2 -right-3 ">0</p>
                )}
              </div>
            </div>
            {user?.email ? (
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                ref={dropdownref}
              >
                <img
                  className="w-[44px] h-[44px] rounded-full
                                 border-2 border-slate-300
                                 object-cover cursor-pointer"
                  src={userData?.photoURL}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  alt="profile iamge"
                />
              </div>
            ) : (
              // <CgProfile onClick={() => setIsProfileOpen(!isProfileOpen)} className='text-3xl text-gray-500 cursor-pointer hover:text-black' />
              <Link to={"/register"}>
                {" "}
                <button className="btn">Register</button>
              </Link>
            )}
          </div>
          <div className="relative">
            <div
              className={`bg-[#f2f0f1]/60 backdrop-blur-lg border-2 border-white rounded-2xl border-black-300 px-4 py-3 -translate-y-4 absolute mt-8 md:-ml-16 -ml-10 z-50
                        invisible  transition-opacity duration-300 ease-in-out
                        ${
                          dropdownOpen
                            ? "visible opacity-100 translate-y-0 "
                            : "-translate-y-4 opacity-0 invisible "
                        }
                        `}
            >
              {dropdownOpen && (
                <div>
                  {userData &&
                    (userData?.isAdmin ? (
                      <NavLink
                        className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`}
                        to={`/adminDashboard/adminProfile`}
                      >
                        <MdOutlineManageAccounts />{" "}
                        <span className="whitespace-nowrap hover:text-orange-300">
                          Admin Dashboard
                        </span>
                      </NavLink>
                    ) : (
                      <NavLink
                        className={`flex gap-2 items-center pt-4 pb-2`}
                        to={`/userDashboard/myprofile`}
                      >
                        <MdOutlineManageAccounts />{" "}
                        <span className="whitespace-nowrap hover:text-orange-300">
                          User Dashboard
                        </span>
                      </NavLink>
                    ))}
                  <NavLink
                    className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`}
                    to={`/userDashboard/Order-management`}
                  >
                    <TbShoppingCartCheck />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      My order
                    </span>
                  </NavLink>
                  <NavLink
                    className={`flex gap-2 items-center pt-4  border-b border-gray-300 pb-2`}
                    to={`/userDashboard/wish-List`}
                  >
                    <CiHeart />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      Wishlist
                    </span>
                  </NavLink>
                  <NavLink
                    className={`flex gap-2 items-center pt-4 `}
                    onClick={handleLogout}
                  >
                    <TbLogout2 />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      Logout
                    </span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* search bar for small device */}
      <div className="relative flex justify-center">
        <div
          ref={searchBarRef}
          className={`w-full max-w-sm md:max-w-[640px] lg:max-w-[890px] min-w-[200px] ${
            isSearchBarOpen
              ? "max-h-screen opacity-100 mt-4"
              : "max-h-0 opacity-0"
          } transition-all  duration-700 ease-in-out`}
        >
          <div ref={searchRef} className="relative flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              onChange={handleChange}
              onFocus={() => query && setShowSuggestions(true)}
              class="w-full bg-white backdrop-blur-md placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-white focus:shadow  hover:shadow-2xl hover:shadow-black"
              placeholder="Search here..."
            />

            <button
              class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {/* Suggestions Dropdown */}
          {showSuggestions && !ProductLoading && products.length > 0 && (
            <ul className="absolute z-50 mt-1 2xl:w-[954px] xl:w-[453px] md:w-[550px] bg-white border border-slate-200 rounded-md shadow-md px-2 md:max-h-80 w-[300px] max-h-80  overflow-y-auto">
              {products.map((item) => (
                // <div
                // key={item._id}
                // className="px-3 py-2 cursor-pointer hover:bg-slate-100 text-sm text-blackflex"
                // onClick={() => {
                //   setQuery(item.title);
                //   setShowSuggestions(false);
                // }}>
                // {item.title}
                // {item?.images[0]}
                // </div>
                <Link to={`viewProduct/${item?._id}`}>
                  <div
                    key={item?._id}
                    className="px-3 py-1 w-full bg-white border border-slate-200 rounded-md shadow-md flex justify-between items-center my-3 cursor-pointer hover:border-blue-500"
                  >
                    {item?.title}
                    <img
                      className="w-10 h-10 object-cover"
                      src={item?.images[0].url}
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 w-64 h-full bg-blue-300/50 backdrop-blur-md shadow-lg z-50 p-4
                    transform transition-transform duration-400 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    `}
        >
          <div className="flex justify-between mb-4">
            <div></div>
            <button
              className="text-2xl text-black"
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoMdClose />
            </button>
          </div>
          <ul className="space-y-4 divide-y-2 ">
            <li>
              <span
                onClick={() => handleSection("men")}
                className="flex items-center justify-between border"
              >
                <span className="cursor-pointer font-bold text-base text-gray-500 block ml-2">
                  Men
                </span>
                <span>
                  <GoChevronDown className="text-2xl" />
                </span>
              </span>
              <ul
                className={`transform divide-y-2 divide-black overflow-hidden duration-300 ease-in-out space-y-3 ${
                  openSection.men
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/T-Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>T-Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Polo Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Polo Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Cuban Collar Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Cuban Collar Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Dress Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Dress Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Casual"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Casual</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Formal"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Formal</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Gym"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Gym</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/V Neck"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>V Neck</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <span
                onClick={() => handleSection("women")}
                className="flex items-center justify-between border "
              >
                <span className="cursor-pointer font-bold text-base text-gray-500 block ml-2">
                  Women
                </span>
                <span>
                  <GoChevronDown className="text-2xl" />
                </span>
              </span>
              <ul
                className={`space-y-4 transform divide-y-2 divide-black overflow-hidden duration-300 ease-in-out ${
                  openSection.women
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/A-Line"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>A-Line</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Apron"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Apron</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Asymmetrical"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Asymmetrical</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Ball Gown"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Ball Gown</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Caftan"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Caftan</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/One-Shoulder"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>One-Shoulder</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Yoke Dress"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Yoke Dress</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Wrap Dress"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Wrap Dress</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Basic"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Basic</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Party"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Party</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <span
                onClick={() => handleSection("boys")}
                className="flex items-center justify-between border"
              >
                <span className="cursor-pointer font-bold text-base text-gray-500 block ml-2">
                  Boys
                </span>
                <span>
                  <GoChevronDown className="text-2xl" />
                </span>
              </span>
              <ul
                className={`space-y-4 transform divide-y-2 divide-black overflow-hidden duration-300 ease-in-out ${
                  openSection.boys
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/T-Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>T-Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Shorts"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Shorts</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Overalls"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Overalls</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Hoodie"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Hoodie</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Sweatpants"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Sweatpants</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Polo Shirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Polo Shirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Dungarees"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Dungarees</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Bomber Jacket"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Bomber Jacket</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Basic-Boys"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Basic</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <span
                onClick={() => handleSection("girls")}
                className="flex items-center justify-between border"
              >
                <span className="cursor-pointer font-bold text-base text-gray-500 block ml-2">
                  Girls
                </span>
                <span>
                  <GoChevronDown className="text-2xl" />
                </span>
              </span>
              <ul
                className={`space-y-4 transform divide-y-2 divide-black overflow-hidden duration-300 ease-in-out ${
                  openSection.girls
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Frock"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Frock</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Skirt"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Skirt</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Leggings"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Leggings</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Gown"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Gown</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <span
                onClick={() => handleSection("kids")}
                className="flex items-center justify-between border"
              >
                <span className="cursor-pointer font-bold text-base text-gray-500 block ml-2">
                  Kids
                </span>
                <span>
                  <GoChevronDown className="text-2xl" />
                </span>
              </span>
              <ul
                className={`space-y-4 transform divide-y-2 divide-black overflow-hidden duration-300 ease-in-out ${
                  openSection.kids
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Rompers"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Rompers</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Jumpsuit"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Jumpsuit</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Dungarees"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Dungarees</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsSidebarOpen(false)}
                    to={"/productsList/Tracksuit"}
                    className="hover:ml-2 transition-all duration-300 flex justify-between"
                  >
                    <span>Tracksuit</span>
                    <span>
                      <FiExternalLink />
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => setIsSidebarOpen(false)}
              className="hover:text-orange-300 text-xl font-bold text-blue-500 flex justify-between items-center"
            >
              <Link to={"/productsList/newArrival"}>New Arrival</Link>
              <FiExternalLink />
            </li>
          </ul>
        </div>
      }

      {/* cart sidebar */}
      <div
        ref={cartRef}
        className={`fixed h-full z-50 top-0 right-0 w-96 bg-slate-100 
      border-l-2 border-white duration-300 ease-in-out
      ${cartBar ? "translate-x-0" : "translate-x-full"}
      `}
      >
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
        {mycart?.length > 0 &&
          (userData?.useraddress.length > 0 ? (
            <div className="bg-white border border-slate-300 p-2  mx-2 rounded-md mt-4 pb-4 shadow-xl">
              <div
                onClick={() => setIsAddressOpen(true)}
                className="flex justify-between border-b border-slate-400 mb-2 pb-2 items-center"
              >
                <h1 className=" text-gray-400">Shipping Address</h1>
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
                  className={`h-40  ${
                    userData?.useraddress?.[0]?.address?.length > 120
                      ? "overflow-y-scroll"
                      : ""
                  }`}
                >
                  <p>{userData?.useraddress?.[0]?.name}</p>
                  <p>{userData?.useraddress?.[0]?.number}</p>
                  <p className="">{userData?.useraddress?.[0]?.address}</p>
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
        {mycart && mycart?.length > 0 ? (
          <div className="relative">
            <div className="flex flex-col space-y-2 mb-2 mt-4 overflow-auto h-[calc(100vh-220px)] pb-60">
              {mycart?.map((item) => (
                <CartProductCard
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

            <button
              onClick={() => placeOrder()}
              className="sticky bottom-0 w-full cursor-pointer group"
            >
              <span className="flex justify-between w-[95%] mx-auto  py-3 border bg-black hover:bg-gray-800 duration-200 transition text-white rounded-xl px-4 items-center">
                <span className="flex items-stretch gap-2">
                  <span className="text-2xl bg-gray-400 p-1 px-2 rounded">
                    <BsCart2 />{" "}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-white text-sm">
                      {mycart?.length}{" "}
                      <span style={{ letterSpacing: "1px" }}>Item</span>
                    </span>
                    <span className="text-white text-sm text-start">
                      {myCartPrice} <span>$</span>
                    </span>
                  </span>
                </span>

                <span className="flex justify-between items-center">
                  <span>Place order</span>{" "}
                  <VscArrowSmallRight className="text-2xl group-hover:translate-x-2 duration-300 transition" />
                </span>
              </span>
            </button>
          </div>
        ) : (
          <div className="h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <FaRegFaceFrownOpen className="text-4xl" />
              <h1 className="text-xl font-thin">No product to show</h1>
            </div>
          </div>
        )}
        {isAddressOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed z-50 inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center `}
          >
            <div>
              <div className="flex flex-col bg-white border/80 w-90 fixed left-1/2 transform -translate-x-1/2 py-3  top-1/2 -translate-y-1/2 rounded-md px-2">
                <div className="mb-2">
                  <div className="flex justify-between items-center relative">
                    <h1 className="text-xl  px-2">🏠 Add your address</h1>
                    <RxCrossCircled
                      onClick={() => setIsAddressOpen(false)}
                      className="text-3xl text-red-400  absolute top-0 right-0 cursor-pointer"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  defaultValue={userData?.useraddress?.[0]?.name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3 mb-2"
                  placeholder="your name"
                  name=""
                  id=""
                />

                <input
                  type="number"
                  defaultValue={userData?.useraddress?.[0]?.number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="border border-gray-300 rounded-md focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3 mb-2"
                  placeholder="📞 Phone number "
                  id=""
                />

                <textarea
                  defaultValue={userData?.useraddress?.[0]?.address}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="🏚️ Address"
                  className="border border-gray-300 rounded-md h-30 focus:border-blue-400 focus:outline-none focus:p-3 text-lg p-3 "
                />

                <button
                  className={`bg-black text-white mt-2 rounded py-1 cursor-pointer hover:bg-gray-700 transition duration-300 disabled:cursor-not-allowed`}
                  disabled={!userAddress || !mobileNumber}
                  onClick={() => {
                    setIsAddressOpen(false);
                    console.log("Address 🏠", userAddress);
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
      {isOpenConfirmModal && (
        <div
          className={`${
            isAddressOpen ? " opacity-0" : "opacity-100"
          } transition duration-300`}
        >
          <ConfirmOrder
            id={confirmModarId}
            email={userData?.email}
            modal={isOpenConfirmModal}
            setModal={setIsOpenConfirmModal}
            refetch={cartRefetch}
            ordeId={orderid}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
