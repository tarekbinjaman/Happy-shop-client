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
    <div className="bg-[#F2F0F1] ">
      <div className="flex gap-5">
        <div className="md:w-64 w-32 shadow-xl px-4 py-8  bg-white  h-screen">
          <div className="flex flex-col items-center justify-center space-y-1 mb-3 bg-[#F2F0F1] py-4 rounded">
            <img src={userData?.photoURL} className="rounded-full w-28 h-28 object-cover" alt="" />
            <h1 className="text-sm ">{userData?.name}</h1>
            <p className="text-gray-400 text-xs">{userData?.email}</p>
          </div>

          {/* routes */}
          <div className="grid grid-cols-1 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive ? "bg-[#F2F0F1] text-black border-slate-400" : "bg-white text-black border-slate-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/productsList"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive ? "bg-[#F2F0F1] text-black border-slate-400" : "bg-white text-black border-slate-300"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/userDashboard/myProfile"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive ? "bg-[#F2F0F1] text-black border-slate-400" : "bg-white text-black border-slate-300"
                }`
              }
            >
              My Profile
            </NavLink>
            <NavLink
              to="/userDashboard/Order-management"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive ? "bg-[#F2F0F1] text-black border-slate-400" : "bg-white text-black border-slate-300"
                }`
              }
            >
              Order Management
            </NavLink>
            <NavLink
              to="/userDashboard/wish-List"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive ? "bg-[#F2F0F1] text-black border-slate-400" : "bg-white text-black border-slate-300"
                }`
              }
            >
              WishList
            </NavLink>
            <NavLink
            to={`/`}
              onClick={() => logOut()}
              className={
                `px-4 py-2 rounded border  
                    bg-white text-black border-slate-300
                }`
              }
            >
              Logout
            </NavLink>
          </div>

        </div>
        <div className="flex-1 bg-[#F2F0F1] p-6 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
