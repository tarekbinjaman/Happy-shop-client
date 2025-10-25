import React, { useEffect, useState } from "react";
import DualRangeSlider from "./ProductComponent/DualRangeSlider ";
import useProducts from "../../../api/useProducts";
import { p } from "framer-motion/client";
import { RiProhibited2Line } from "react-icons/ri";
import { HiEmojiSad } from "react-icons/hi";
import { useParams, useSearchParams } from "react-router-dom";
import ProductsCard from "./ProductsCard";

const Products = () => {
  const { categoryName } = useParams();
  console.log("This is category name", categoryName);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [filters, setFilters] = useState({
    gender: "",
    brand: [],
    fitType: [],
    materials: [],
    minPrice: "",
    maxPrice: "",
    category: categoryName,
  });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filterModal, setFilterModal] = useState(false);

  const handleCheckBoxChange = (filterType, value) => {
    setFilters((prv) => {
      const updated = prv[filterType].includes(value)
        ? prv[filterType].filter((v) => v !== value)
        : [...prv[filterType], value];

      return { ...prv, [filterType]: updated };
    });
  };
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }));
  }, [priceRange]);
  const filterParams = {
    gender: filters.gender,
    brand: filters.brand.join(","),
    fitType: filters.fitType.join(","),
    materials: filters.materials.join(","),
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    search,
    ...(categoryName &&
      categoryName !== "newArrival" && { category: categoryName }),
  };
  const [products, isLoading, refetch] = useProducts(filterParams);

  // pagination
  const [page, setPage] = useState(1);
  const itemsPerpage = 10;
  // calculate item to show

  const start = (page - 1) * itemsPerpage;
  const end = start + itemsPerpage;
  const currectItems = products.slice(start, end);
  const totalPages = Math.ceil(products.length / itemsPerpage);
  console.log("Total pages", totalPages);
  
  return (
    <div>
      <div className="sticky top-5 md:ml-15 ml-4 z-10 lg:hidden">
        <button
          onClick={() => {
            setFilterModal(!filterModal);
          }}
          className="cursor-pointer border-2 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/40"
        >
          Filter
        </button>
      </div>
      <div className="flex gap-2 justify-center">
        <aside className="xl:w-1/7 lg:w-2/7 hidden lg:block">
          <div className="border border-gray-400 m-4 p-2 rounded-2xl">
            <DualRangeSlider
              values={priceRange}
              setValues={setPriceRange}
              refetch={refetch}
            />
            <h2 className="font-bold mb-2">Brands</h2>
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("brand", "Gucci")}
                />{" "}
                Gucci
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("brand", "Puma")}
                />{" "}
                Puma
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("brand", "Calvin Klein")}
                />{" "}
                Calvin Klein
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("brand", "Garments")}
                />{" "}
                Garments
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("brand", "Others")}
                />{" "}
                Others
              </label>
            </div>
            {/* gender checkbox */}
            {(!categoryName || categoryName === "newArrival") && (
              <div>
                <h2 className="font-bold mb-2 mt-2">Gender</h2>
                <div className="flex flex-col">
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("gender", "Men")}
                    />{" "}
                    Men
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("gender", "Women")}
                    />{" "}
                    Women
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("gender", "Boys")}
                    />{" "}
                    Boys
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("gender", "Girls")}
                    />{" "}
                    Girls
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBoxChange("gender", "Babies")}
                    />{" "}
                    Babies
                  </label>
                </div>
              </div>
            )}

            <h2 className="font-bold mb-2 mt-2">Fit type</h2>
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("fitType", "Fitted")}
                />{" "}
                Fitted
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("fitType", "Loose")}
                />{" "}
                Loose
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("fitType", "Straight")}
                />{" "}
                Straight
              </label>
            </div>
            <h2 className="font-bold mb-2 mt-2">Materials</h2>
            <div className="flex flex-col mb-4">
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Polyster")}
                />{" "}
                Polyster
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Nylon")}
                />{" "}
                Nylon
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Cotton")}
                />{" "}
                Cotton
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Acrylic")}
                />{" "}
                Acrylic
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Cashmere")}
                />{" "}
                Cashmere
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Lotex")}
                />{" "}
                Lotex
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange("materials", "Leather")}
                />{" "}
                Leather
              </label>
            </div>
          </div>
        </aside>
        {/* small device sidebar */}
        <aside
          className={`xl:w-1/7 lg:w-2/7 lg:hidden sticky top-10 h-screen z-30  ${
            filterModal
              ? "translate-x-0 opacity-100"
              : "-translate-x-5 opacity-0"
          } transition-all duration-200 ease-in-out`}
        >
          <div className="border-2 border-black/10 p-2 rounded-2xl absolute z-30  bg-white/30 md:backdrop-blur-md backdrop-blur-xl -left-3 mt-10">
            <DualRangeSlider
              values={priceRange}
              setValues={setPriceRange}
              refetch={refetch}
            />
            <div className="md:flex items-start">
              {/* parent of parent div */}
              <div className="flex gap-4 items-center justify-between">
                {/* parent div 1 */}

                <div className="md:w-32 w-40">
                  <h2 className="font-bold">Brands</h2>
                  <div className="flex flex-col">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckBoxChange("brand", "Gucci")}
                      />{" "}
                      Gucci
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckBoxChange("brand", "Puma")}
                      />{" "}
                      Puma
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("brand", "Calvin Klein")
                        }
                      />{" "}
                      Calvin Klein
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("brand", "Garments")
                        }
                      />{" "}
                      Garments
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckBoxChange("brand", "Others")}
                      />{" "}
                      Others
                    </label>
                  </div>
                </div>

                <div className="md:w-32 w-40">
                  {/* gender checkbox */}
                  {(!categoryName || categoryName === "newArrival") && (
                    <div>
                      <h2 className="font-bold mb-2 mt-2 ">Gender</h2>
                      <div className="flex flex-col">
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckBoxChange("gender", "Men")
                            }
                          />{" "}
                          Men
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckBoxChange("gender", "Women")
                            }
                          />{" "}
                          Women
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckBoxChange("gender", "Boys")
                            }
                          />{" "}
                          Boys
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckBoxChange("gender", "Girls")
                            }
                          />{" "}
                          Girls
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckBoxChange("gender", "Babies")
                            }
                          />{" "}
                          Babies
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4  mt-2 justify-between">
                {/* parent div 2 */}
                <div className="md:w-32 w-40">
                  <h2 className="font-bold mb-2 ">Fit type</h2>
                  <div className="flex flex-col">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("fitType", "Fitted")
                        }
                      />{" "}
                      Fitted
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("fitType", "Loose")
                        }
                      />{" "}
                      Loose
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("fitType", "Straight")
                        }
                      />{" "}
                      Straight
                    </label>
                  </div>
                </div>
                <div className="md:w-32 w-40">
                  <h2 className="font-bold mb-2 ">Materials</h2>
                  <div className="flex flex-col mb-4">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Polyster")
                        }
                      />{" "}
                      Polyster
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Nylon")
                        }
                      />{" "}
                      Nylon
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Cotton")
                        }
                      />{" "}
                      Cotton
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Acrylic")
                        }
                      />{" "}
                      Acrylic
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Cashmere")
                        }
                      />{" "}
                      Cashmere
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Lotex")
                        }
                      />{" "}
                      Lotex
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckBoxChange("materials", "Leather")
                        }
                      />{" "}
                      Leather
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFilterModal(!filterModal);
              }}
              className="bg-white/10 backdrop-blur-md border border-black/20 w-full rounded-md text-black font-bold inset-shadow-2xs inset-shadow-white hover:bg-white/20 cursor-pointer transition-all duration-200"
            >
              Close
            </button>
          </div>
        </aside>
        <section className="w-6/7 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-ring loading-xl"></span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center">
              <p className="flex flex-col-reverse gap-2 text-4xl items-center font-bold">
                No product found! <span className="text-6xl">😔</span>
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
                {categoryName === "newArrival"
                  ? currectItems
                      .slice(-10)
                      .map((product, index) => (
                        <ProductsCard product={product} key={index} />
                      ))
                  : currectItems.map((product, index) => (
                      <ProductsCard product={product} key={index} />
                    ))}
              </div>
            </div>
          )}
          {/* pagination button */}
          <div className="flex items-center justify-center gap-2 mt-6">
          <button
          onClick={() => setPage(page - 1)}
          disabled = {page === 1}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded"
          >
            Prev
          </button>
          {
            Array.from({length: totalPages}, (_, i) => (
              <button
              className={`cursor-pointer ${i + 1 === page ? 'bg-black text-white' : 'bg-gray-200 text-black'} px-4 py-1 rounded`}
              onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))
          }
          <button
          disabled = {page === totalPages} 
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded"
          >
            Next
          </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
