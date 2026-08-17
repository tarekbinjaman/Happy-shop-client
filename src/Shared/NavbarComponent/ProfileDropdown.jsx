import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbLogout2, TbShoppingCartCheck } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const ProfileDropdown = ({
  userData,
  dropdownOpen,
  dropdownref,
  handleLogout,
}) => {
  return (
    <div className="relative">
      <div
        ref={dropdownref}
        className={`bg-[#f2f0f1]/60 backdrop-blur-lg border-2 border-white rounded-2xl border-black-300 px-4 py-3 -translate-y-4 absolute mt-8 md:-ml-16 -ml-10 z-50
          invisible transition-opacity duration-300 ease-in-out
          ${
            dropdownOpen
              ? "visible opacity-100 translate-y-0"
              : "-translate-y-4 opacity-0 invisible"
          }
        `}
      >
        {dropdownOpen && (
          <div>
            {userData &&
              (userData?.isAdmin ? (
                <NavLink
                  className="flex gap-2 items-center pt-4 border-b border-gray-300 pb-2"
                  to="/adminDashboard/adminProfile"
                >
                  <MdOutlineManageAccounts />

                  <span className="whitespace-nowrap hover:text-orange-300">
                    Admin Dashboard
                  </span>
                </NavLink>
              ) : (
                <NavLink
                  className="flex gap-2 items-center pt-4 pb-2"
                  to="/userDashboard/myprofile"
                >
                  <MdOutlineManageAccounts />

                  <span className="whitespace-nowrap hover:text-orange-300">
                    User Dashboard
                  </span>
                </NavLink>
              ))}

            <NavLink
              className="flex gap-2 items-center pt-4 border-b border-gray-300 pb-2"
              to="/userDashboard/Order-management"
            >
              <TbShoppingCartCheck />

              <span className="whitespace-nowrap hover:text-orange-300">
                My order
              </span>
            </NavLink>

            <NavLink
              className="flex gap-2 items-center pt-4 border-b border-gray-300 pb-2"
              to="/userDashboard/wish-List"
            >
              <CiHeart />

              <span className="whitespace-nowrap hover:text-orange-300">
                Wishlist
              </span>
            </NavLink>

            <NavLink
              className="flex gap-2 items-center pt-4"
              onClick={handleLogout}
              to="/"
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
  );
};

export default ProfileDropdown;