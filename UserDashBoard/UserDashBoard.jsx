import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../Context/UseAuth";
import currentUser from "../api/currentUser";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProduct } from "react-icons/ai";

const UserDashBoard = () => {
  const { logOut, user } = UseAuth();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  const isActive = ({ isActive }) =>
    isActive ? "text-blue-500 bg-slate-200 rounded block w-full" : "";
  return (
    <div className="flex gap-4">
      <div className="flex gap-5">
        <div className="md:w-64 w-32 shadow-xl px-4 py-8   bg-[#F2F0F1] h-screen">
          <div className="flex flex-col items-center justify-center space-y-1 mb-3">
            <img src={userData?.photoURL} className="rounded-full" alt="" />
            <h1 className="text-sm ">{user?.displayName}</h1>
            <p className="text-gray-400 text-xs">{userData?.email}</p>
          </div>

          {/* routes */}
          <div className="grid grid-cols-1 space-y-1">
            <NavLink
              to="/productsList"
              className={({ isActive }) =>
                `px-4 py-2 rounded  ${
                  isActive ? "bg-blue-500 text-white" : "bg-red-300 text-black"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/userDashboard/myProfile"
              className={({ isActive }) =>
                `px-4 py-2 rounded  ${
                  isActive ? "bg-blue-500 text-white" : "bg-red-300 text-black"
                }`
              }
            >
              My Profile
            </NavLink>
            <NavLink
              to="/userDashboard/Order-management"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "bg-red-300 text-black"
                }`
              }
            >
              Order Management
            </NavLink>
          </div>
          {/* <ul className="space-y-1">
            <li className="">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
      ? "bg-slate-200 text-blue-500 rounded px-3 py-1"
      : "bg-red-300 px-3 py-1"
                  } `
                }
                to={"/userDashboard/myProfile"}
              >
                <span className="flex gap-2 items-center">
                  {" "}
               User Profile
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-blue-500 rounded "
                      : ""
                  }`
                }
                to={"/userDashboard/Order-management"}
              >
                <span className="flex gap-2 items-center">
                  {" "}
                  <AiOutlineProduct /> Order Management
                </span>
              </NavLink>
            </li>
            <li>
              <span className="text-[18px] font-bold text-gray-500">
                My orders
              </span>
              <ul className="ml-4">
                <li>My returns</li>
                <li>My cancellation</li>
              </ul>
            </li>
            <li className="text-[18px] font-bold text-blue-500">My reviews</li>
            <li className="text-[18px] font-bold text-blue-500">My wishlist</li>
          </ul> */}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
