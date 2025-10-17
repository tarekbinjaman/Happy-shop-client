import React, { useState } from "react";
import useProducts from "../../api/useProducts";
import { div } from "framer-motion/client";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import EditModal from "../../modalsComponent/editModal";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ViewProductModal from "../../modalsComponent/ViewProductModal";
import { useParams } from "react-router-dom";

const AllProduct = () => {
  const [allProducts, isLoading, productRefetch] = useProducts();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedViewProductId, setSelectedViewProductId] = useState(null);
  console.log("All products", allProducts);
  console.log("Selected Product Id", selectedProductId);
  const productdata = allProducts;
  console.log("products data", productdata);
  if (isLoading) {
    return <p>Produt is loading....</p>;
  }
  const openModal = (id) => {
    setSelectedProductId(id);
    document.getElementById("my_modal_3")?.showModal();
  };
  const closeModal = () => {
    setSelectedProductId(null);
    document.getElementById("my_modal_3")?.close();
  };
  const openProductModal = (id) => {
    setSelectedViewProductId(id);
    document.getElementById("my_modal_4")?.showModal();
  };
  const closeProductModal = () => {
    setSelectedViewProductId(null);
    document.getElementById("my_modal_4")?.close();
  };
  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:5000/api/products/${id}`
          );
          if (res.status === 200) {
            toast.success("Product deleted successfully");
            productRefetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Failed! Something went wrong");
          toast.error("Failed to delte product");
        }
      }
    });
  };
  const [page, setPage] = useState(1);
  const itemsPerpage = 10;
  const start = (page - 1) * itemsPerpage;
  const end = start + itemsPerpage;
  const currentItems = allProducts.slice(start, end);
  const totalPages = Math.ceil(allProducts.length / itemsPerpage);

  return (
    <div className="w-full">
      <div className="w-full px-4">
        <ul className="bg-base-100 shadow-md p-6">
          {currentItems.map((product, index) => (
            <li className="flex gap-2 justify-between w-full mb-3 border border-gray-400 p-3 transition duration-200 hover:border-blue-400 hover:shadow-2xl rounded-2xl">
              <div className="flex gap-4 items-center">
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  {index + 1}
                </div>
                <img
                  className="size-20 object-cover rounded-box"
                  src={product?.images[0]?.url}
                />
                <div className="">
                  <div className="text-xl">{product?.title}</div>
                  <div className="text-sm font-semibold opacity-60">
                    {product?.description?.slice(0, 15)}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 items-center text-3xl">
                {/* Icons view > edit > delete */}
                <FaEye
                  className="cursor-pointer hover:opacity-50"
                  onClick={() => openProductModal(product?._id)}
                />
                <CiEdit
                  onClick={() => openModal(product?._id)}
                  className="cursor-pointer hover:opacity-50"
                />
                <TiDelete
                  className="cursor-pointer hover:opacity-50"
                  onClick={() => {
                    deleteProduct(product?._id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit product modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-4xl h-[700px] p-4">
          <form method="dialog" className="mb-8">
            <button className="text-white  bg-red-500 btn-ghost absolute right-2 top-2 px-3 py-1 rounded cursor-pointer hover:bg-red-400">
              ✕
            </button>
          </form>
          {selectedProductId && (
            <EditModal id={selectedProductId} handleClose={closeModal} />
          )}
        </div>
      </dialog>

      {/* View product modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box max-w-5xl h-[590px] p-4">
          <form method="dialog" className="mb-8">
            <button className="text-white  bg-red-500 btn-ghost absolute right-2 top-2 px-3 py-1 rounded cursor-pointer hover:bg-red-400">
              ✕
            </button>
          </form>
          {selectedViewProductId && (
            <ViewProductModal
              id={selectedViewProductId}
              handleClose={closeProductModal}
            />
          )}
        </div>
      </dialog>
      {/* pagination button */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`cursor-pointer ${
              i + 1 === page ? "bg-black text-white" : "bg-gray-200 text-black"
            } px-4 py-1 rounded`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
