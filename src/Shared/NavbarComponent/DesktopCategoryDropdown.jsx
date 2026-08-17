import React from "react";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";

const DesktopCategoryDropdown = ({ title, items }) => {
  return (
    <li className="group relative">
      <span className="flex items-center gap-1 cursor-pointer">
        {title}
        <GoChevronDown className="group-hover:text-orange-300" />
      </span>

      <div className="relative">
        <ul
          className="
            absolute top-2 left-0
            bg-white/30 backdrop-blur-md
            shadow-xl py-3 w-56 pr-2 space-y-1
            border border-white
            opacity-0 invisible
            group-hover:visible group-hover:opacity-100
            transform transition-all duration-200 ease-in-out
            -translate-x-2 group-hover:translate-x-0
            z-50
            divide-y divide-gray-300
          "
        >
          {items.map(([label, path]) => (
            <li
              key={label}
              className="pl-4 cursor-pointer font-semibold whitespace-nowrap"
            >
              <Link
                to={`/productsList/${path}`}
                className="flex justify-between items-center"
              >
                <span className="hover:ml-2 transition-all duration-300">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DesktopCategoryDropdown;