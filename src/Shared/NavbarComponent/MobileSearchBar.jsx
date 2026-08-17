import React from "react";

const MobileSearchBar = ({
  searchBarRef,
  searchRef,
  isSearchBarOpen,
  query,
  handleChange,
  handleSearch,
  setShowSuggestions,
  showSuggestions,
  ProductLoading,
  products,
}) => {
  return (
    <div className="relative flex justify-center">
      <div
        ref={searchBarRef}
        className={`w-full max-w-sm md:max-w-[640px] lg:max-w-[890px] min-w-[200px] ${
          isSearchBarOpen
            ? "max-h-screen opacity-100 mt-4"
            : "max-h-0 opacity-0"
        } transition-all duration-700 ease-in-out`}
      >
        <div ref={searchRef} className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            value={query}
            onChange={handleChange}
            onFocus={() => query && setShowSuggestions(true)}
            className="w-full bg-white backdrop-blur-md placeholder:text-slate-600 text-slate-700 text-sm border border-slate-300 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-white focus:shadow hover:shadow-2xl hover:shadow-black"
            placeholder="Search here..."
          />

          <button
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {showSuggestions &&
          !ProductLoading &&
          products?.length > 0 && (
            <ul className="absolute z-50 mt-1 2xl:w-[954px] xl:w-[453px] md:w-[550px] bg-white border border-slate-200 rounded-md shadow-md px-2 md:max-h-80 w-[300px] max-h-80 overflow-y-auto">
              {products.map((item) => (
                <a
                  href={`/viewProduct/${item?._id}`}
                  key={item?._id}
                >
                  <div className="px-3 py-1 w-full bg-white border border-slate-200 rounded-md shadow-md flex justify-between items-center my-3 cursor-pointer hover:border-blue-500">
                    {item?.title}

                    <img
                      className="w-10 h-10 object-cover"
                      src={item?.images?.[0]?.url}
                      alt=""
                    />
                  </div>
                </a>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default MobileSearchBar;