import React, { useEffect, useRef, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FaAlignLeft } from "react-icons/fa";
import { GoArrowUpRight, GoChevronDown } from "react-icons/go";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { MdOutlineManageAccounts, MdOutlineRateReview } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogout2, TbShoppingCartCheck } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../Context/UseAuth";
import currentUser from "../api/currentUser";
import { SlMagnifier } from "react-icons/sl";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useCart from "../api/useCart";
import useProducts from "../api/useProducts";

const Navbar = () => {
  const { logOut, user } = UseAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownref = useRef();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [cartData, isLoading, refetch] = useCart();

  // search bar hooks
  const [query, setQuery] = useState("");
  const [filterParams, setFilterParams] = useState({});
  const [products, ProductLoading] = useProducts(filterParams);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const mycart =
    cartData && cartData.filter((item) => item?.userEmail === email);

  const isActive = ({ isActive }) =>
    isActive ? "text-blue-500 bg-slate-200" : "";
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownref.current && !dropdownref.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowSuggestions(false);
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
  console.log("userData:", userData);
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
              <RxHamburgerMenu className="md:text-3xl text-[26px] " />
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
            <ul className="absolute z-50 mt-1 2xl:w-[954px] xl:w-[453px] bg-white border border-slate-200 rounded-md shadow-md px-2 max-h-3/6 overflow-y-auto">
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
                className="text-2xl font-bold text-gray-500 cursor-pointer hover:text-black 2xl:hidden lg:hidden"
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              />
              <div className="relative mr-3">
                <BsCart2
                  onClick={() => {
                    console.log("This is cart data", mycart);
                  }}
                  className="text-3xl text-gray-500 cursor-pointer hover:text-black "
                />
                {mycart?.length > 0 ? (
                  <p className="absolute text-base -top-2 -right-3 ">
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
                  src={user?.photoURL}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  alt="profile iamge"
                />
              </div>
            ) : (
              // <CgProfile onClick={() => setIsProfileOpen(!isProfileOpen)} className='text-3xl text-gray-500 cursor-pointer hover:text-black' />
              <button className="btn">
                <Link to={"/register"}>Register</Link>
              </button>
            )}
          </div>
          <div className="relative">
            <div
              className={`bg-[#f2f0f1]/60 backdrop-blur-lg border-2 border-white rounded-2xl border-black-300 px-4 py-3 -translate-y-4 absolute mt-8 md:-ml-40 -ml-44 z-50
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
                    to={`/myProfile`}
                  >
                    <TbShoppingCartCheck />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      My order
                    </span>
                  </NavLink>
                  <NavLink
                    className={`flex gap-2 items-center pt-4  border-b border-gray-300 pb-2`}
                    to={`/myProfile`}
                  >
                    <CiHeart />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      Wishlist
                    </span>
                  </NavLink>
                  <NavLink
                    className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`}
                    to={`/myProfile`}
                  >
                    <MdOutlineRateReview />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      My reviews
                    </span>
                  </NavLink>
                  <NavLink
                    className={`flex gap-2 items-center pt-4 border-b border-gray-300 pb-2`}
                    to={`/myProfile`}
                  >
                    <ImCancelCircle />
                    <span className="whitespace-nowrap hover:text-orange-300">
                      My return and cancellation
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
          className={`w-full max-w-sm md:max-w-[640px] lg:max-w-[890px] min-w-[200px] ${
            isSearchBarOpen
              ? "max-h-screen opacity-100 mt-4"
              : "max-h-0 opacity-0"
          } transition-all  duration-700 ease-in-out`}
        >
          <div className="relative flex items-center ">
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
          className={`fixed top-0 left-0 w-64 h-full bg-gray-300/50 backdrop-blur-lg shadow-lg z-50 p-4
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
          <ul className="space-y-4">
            <li className="border-b border-gray-400">
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 justify-between"
              >
                Shop{" "}
                <GoChevronDown
                  className={`group-hover:text-orange-300 text-3xl cursor-pointer transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>

              <div className="relative transition-all duration-300 ease-in-out">
                <ul
                  className={` transition-all  duration-300 ease-in-out 
                                    ${
                                      isOpen
                                        ? "max-h-screen opacity-100 "
                                        : "max-h-0 opacity-0"
                                    }
                                    `}
                >
                  <li className="border-b-2 border-gray-300 pl-4 cursor-pointer hover:text-orange-300">
                    Mens
                  </li>
                  <li className="border-b-2 border-gray-300 pl-4 cursor-pointer hover:text-orange-300">
                    Women
                  </li>
                  <li className=" pl-4 cursor-pointer hover:text-orange-300">
                    Kids
                  </li>
                </ul>
              </div>
            </li>
            <li className="border-b border-gray-400">On sale</li>
            <li className="border-b border-gray-400">New Arrivals</li>
            <li className="border-b border-gray-400">Brands</li>
            <li className="border-b border-gray-400">Wishlist</li>
          </ul>
        </div>
      }
    </nav>
  );
};

export default Navbar;
