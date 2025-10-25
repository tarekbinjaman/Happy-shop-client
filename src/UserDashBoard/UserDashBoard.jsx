import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../Context/UseAuth";
import currentUser from "../../api/currentUser";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProduct } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoChevronLeft } from "react-icons/go";

const UserDashBoard = () => {
  const { logOut, user } = UseAuth();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const [openSidebar, setOpenSidebar] = useState(false);
  const userData = currentUerData?.[0];
  return (
    <div className="bg-[#F2F0F1] ">
      <div className="flex md:gap-5">
        <div className="md:w-64 w-32 shadow-xl px-4 py-8  bg-white  h-screen hidden lg:block">
          <div className="flex flex-col items-center justify-center space-y-1 mb-3 bg-[#F2F0F1] py-4 rounded">
            <img
              src={userData?.photoURL}
              className="rounded-full w-28 h-28 object-cover"
              alt=""
            />
            <h1 className="text-sm ">{userData?.name}</h1>
            <p className="text-gray-400 text-xs">{userData?.email}</p>
          </div>

          {/* routes */}
          <div className="grid grid-cols-1 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive
                    ? "bg-[#F2F0F1] text-black border-slate-400"
                    : "bg-white text-black border-slate-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/productsList"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive
                    ? "bg-[#F2F0F1] text-black border-slate-400"
                    : "bg-white text-black border-slate-300"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/userDashboard/myProfile"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive
                    ? "bg-[#F2F0F1] text-black border-slate-400"
                    : "bg-white text-black border-slate-300"
                }`
              }
            >
              My Profile
            </NavLink>
            <NavLink
              to="/userDashboard/Order-management"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive
                    ? "bg-[#F2F0F1] text-black border-slate-400"
                    : "bg-white text-black border-slate-300"
                }`
              }
            >
              Order Management
            </NavLink>
            <NavLink
              to="/userDashboard/wish-List"
              className={({ isActive }) =>
                `px-4 py-2 rounded border  ${
                  isActive
                    ? "bg-[#F2F0F1] text-black border-slate-400"
                    : "bg-white text-black border-slate-300"
                }`
              }
            >
              WishList
            </NavLink>
            <NavLink
              to={`/`}
              onClick={() => logOut()}
              className={`px-4 py-2 rounded border  
                    bg-white text-black border-slate-300
                }`}
            >
              Logout
            </NavLink>
          </div>
        </div>
        <div className="relative lg:hidden">
          {
            openSidebar 
            ?
            <GoChevronLeft
            onClick={() => setOpenSidebar(!openSidebar)}
            className="text-3xl absolute md:-right-180 -right-100 top-6 cursor-pointer hover:scale-110 transition duration-200 z-50 bg-fuchsia-50 px-0.5 py-1"
            />
            :
            <RxHamburgerMenu 
            onClick={() => setOpenSidebar(!openSidebar)}
            className="text-3xl absolute md:-right-180 -right-100 top-6 cursor-pointer hover:scale-110 transition duration-200 z-50 bg-fuchsia-50 px-0.5 py-1" />
          }
        </div>

          <div className={`inset-0 bg-black/20 backdrop-blur-sm fixed z-30 ${openSidebar ? "opacity-100 visible" : "opacity-0 invisible"} transition duration-300`}>
          <div className={`md:w-64 w-62 shadow-xl px-4 py-8  bg-white  h-screen lg:hidden border-2 border-yellow-300 absolute z-40 ${openSidebar ? "opacity-100 visited translate-x-0" : "opacity-0 invisible -translate-x-10"} transition duration-300`}>
            <div className="flex flex-col items-center justify-center space-y-1 mb-3 bg-[#F2F0F1] py-4 rounded">
              <img
                src={userData?.photoURL}
                className="rounded-full w-28 h-28 object-cover"
                alt=""
              />
              <h1 className="text-sm ">{userData?.name}</h1>
              <p className="text-gray-400 text-xs">{userData?.email}</p>
            </div>

            {/* routes */}
            <div className="grid grid-cols-1 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded border  ${
                    isActive
                      ? "bg-[#F2F0F1] text-black border-slate-400"
                      : "bg-white text-black border-slate-300"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/productsList"
                className={({ isActive }) =>
                  `px-4 py-2 rounded border  ${
                    isActive
                      ? "bg-[#F2F0F1] text-black border-slate-400"
                      : "bg-white text-black border-slate-300"
                  }`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/userDashboard/myProfile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded border  ${
                    isActive
                      ? "bg-[#F2F0F1] text-black border-slate-400"
                      : "bg-white text-black border-slate-300"
                  }`
                }
              >
                My Profile
              </NavLink>
              <NavLink
                to="/userDashboard/Order-management"
                className={({ isActive }) =>
                  `px-4 py-2 rounded border  ${
                    isActive
                      ? "bg-[#F2F0F1] text-black border-slate-400"
                      : "bg-white text-black border-slate-300"
                  }`
                }
              >
                Order Management
              </NavLink>
              <NavLink
                to="/userDashboard/wish-List"
                className={({ isActive }) =>
                  `px-4 py-2 rounded border  ${
                    isActive
                      ? "bg-[#F2F0F1] text-black border-slate-400"
                      : "bg-white text-black border-slate-300"
                  }`
                }
              >
                WishList
              </NavLink>
              <NavLink
                to={`/`}
                onClick={() => logOut()}
                className={`px-4 py-2 rounded border  
                    bg-white text-black border-slate-300
                }`}
              >
                Logout
              </NavLink>
            </div>
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
