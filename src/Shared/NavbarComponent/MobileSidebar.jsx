import React from "react";
import { GoChevronDown } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const MobileSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarRef,
  openSection,
  handleSection,
}) => {
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
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
          onClick={closeSidebar}
        >
          <IoMdClose />
        </button>
      </div>

      <ul className="space-y-4 divide-y-2">

        {/* MEN */}
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
            {[
              ["T-Shirt", "T-Shirt"],
              ["Polo Shirt", "Polo Shirt"],
              ["Cuban Collar Shirt", "Cuban Collar Shirt"],
              ["Dress Shirt", "Dress Shirt"],
              ["Casual", "Casual"],
              ["Formal", "Formal"],
              ["Gym", "Gym"],
              ["V Neck", "V Neck"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  onClick={closeSidebar}
                  to={`/productsList/${path}`}
                  className="hover:ml-2 transition-all duration-300 flex justify-between"
                >
                  <span>{label}</span>
                  <span>
                    <FiExternalLink />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* WOMEN */}
        <li>
          <span
            onClick={() => handleSection("women")}
            className="flex items-center justify-between border"
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
            {[
              ["A-Line", "A-Line"],
              ["Apron", "Apron"],
              ["Asymmetrical", "Asymmetrical"],
              ["Ball Gown", "Ball Gown"],
              ["Caftan", "Caftan"],
              ["One-Shoulder", "One-Shoulder"],
              ["Yoke Dress", "Yoke Dress"],
              ["Wrap Dress", "Wrap Dress"],
              ["Basic", "Basic"],
              ["Party", "Party"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  onClick={closeSidebar}
                  to={`/productsList/${path}`}
                  className="hover:ml-2 transition-all duration-300 flex justify-between"
                >
                  <span>{label}</span>
                  <span>
                    <FiExternalLink />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* BOYS */}
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
            {[
              ["T-Shirt", "T-Shirt"],
              ["Shorts", "Shorts"],
              ["Overalls", "Overalls"],
              ["Hoodie", "Hoodie"],
              ["Sweatpants", "Sweatpants"],
              ["Polo Shirt", "Polo Shirt"],
              ["Dungarees", "Dungarees"],
              ["Bomber Jacket", "Bomber Jacket"],
              ["Basic", "Basic-Boys"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  onClick={closeSidebar}
                  to={`/productsList/${path}`}
                  className="hover:ml-2 transition-all duration-300 flex justify-between"
                >
                  <span>{label}</span>
                  <span>
                    <FiExternalLink />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* GIRLS */}
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
            {[
              ["Frock", "Frock"],
              ["Skirt", "Skirt"],
              ["Leggings", "Leggings"],
              ["Gown", "Gown"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  onClick={closeSidebar}
                  to={`/productsList/${path}`}
                  className="hover:ml-2 transition-all duration-300 flex justify-between"
                >
                  <span>{label}</span>
                  <span>
                    <FiExternalLink />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* KIDS */}
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
            {[
              ["Rompers", "Rompers"],
              ["Jumpsuit", "Jumpsuit"],
              ["Dungarees", "Dungarees"],
              ["Tracksuit", "Tracksuit"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  onClick={closeSidebar}
                  to={`/productsList/${path}`}
                  className="hover:ml-2 transition-all duration-300 flex justify-between"
                >
                  <span>{label}</span>
                  <span>
                    <FiExternalLink />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* NEW ARRIVAL */}
        <li
          onClick={closeSidebar}
          className="hover:text-orange-300 text-xl font-bold text-blue-500 flex justify-between items-center"
        >
          <Link to="/productsList/newArrival">
            New Arrival
          </Link>

          <FiExternalLink />
        </li>

      </ul>
    </div>
  );
};

export default MobileSidebar;