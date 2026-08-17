import React from "react";
import { BsCart2 } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavbarActions = ({
  user,
  userData,
  mycart,
  cartIcon,
  faSearchIconRef,
  setCartBar,
  setIsSearchBarOpen,
  setDropdownOpen,
}) => {
  return (
    <div>
      <div className="flex md:gap-4 gap-4 items-center whitespace-nowrap">
        {/* Search + Cart */}
        <div className="flex items-center gap-4">
          {/* Mobile search */}
          <FaMagnifyingGlass
            ref={faSearchIconRef}
            className="text-2xl font-bold text-gray-500 cursor-pointer hover:text-black 2xl:hidden lg:hidden"
            onClick={() => setIsSearchBarOpen((prev) => !prev)}
          />

          {/* Cart */}
          <div ref={cartIcon} className="relative mr-3">
            <BsCart2
              onClick={() => setCartBar((prev) => !prev)}
              className="text-3xl text-gray-500 cursor-pointer hover:text-black"
            />

            <p className="absolute text-base -top-2 -right-5">
              {mycart?.length || 0}
            </p>
          </div>
        </div>

        {/* Profile */}
        {user?.email ? (
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              className="w-[44px] h-[44px] rounded-full
                         border-2 border-slate-300
                         object-cover cursor-pointer"
              src={userData?.photoURL}
              alt="profile image"
            />
          </div>
        ) : (
          <Link to="/register">
            <button className="btn">Register</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarActions;