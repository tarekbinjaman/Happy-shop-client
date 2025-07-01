import React, { useState } from 'react';
import useProducts from '../../api/useProducts';
import { div } from 'framer-motion/client';
import { FaEye } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { TiDelete } from 'react-icons/ti';
import EditModal from '../../modalsComponent/editModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllProduct = () => {
  const [allProducts, isLoading, productRefetch] = useProducts();
  const [selectedProductId, setSelectedProductId] = useState(null);
  console.log("All products", allProducts);
  const productdata = allProducts?.products;
  console.log("products data", productdata);
  if (isLoading) {
    return <p>Produt is loading....</p>
  };
  const openModal = (id) => {
    setSelectedProductId(id);
    document.getElementById('my_modal_3')?.showModal();
  };
  const closeModal = () => {
    setSelectedProductId(null)
    document.getElementById('my_modal_3')?.close();
  }
  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if(result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
          if (res.status === 200) {
            toast.success("Product deleted successfully")
            productRefetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Failed! Something went wrong')
          toast.error('Failed to delte product')
        }
      }
    }

    )
  }
  return (
    <div className='w-full'>
      <h1>This is all Product page. <br /> Toatal products ({productdata?.length})</h1>
      <div className='w-full max-w-5xl max-h-72 '>


        <ul className=" bg-base-100 shadow-md w-[800px] ">
          {productdata.map((product, index) => (

            <li className="flex gap-2 justify-between w-full mb-3 border border-gray-400 p-3 rounded hover:shadow-2xl">

              <div className='flex gap-4 items-center'>
                <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                <img className="size-20 object-cover rounded-box" src={product?.images[0]?.url} />
                <div className="">
                  <div className='text-xl'>{product?.title}</div>
                  <div className="text-sm font-semibold opacity-60">{product?.description?.slice(0, 15)}</div>
                </div>
              </div>
              <div className='flex gap-6 items-center text-3xl'>
                {/* Icons view > edit > delete */}
                <FaEye className='cursor-pointer hover:opacity-50' />
                <CiEdit onClick={() => openModal(product?._id)} className='cursor-pointer hover:opacity-50' />
                <TiDelete className='cursor-pointer hover:opacity-50' onClick={() => { deleteProduct(product?._id) }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-4xl h-[700px] p-4">
          <form method="dialog" className='mb-8'>
            <button className="text-white  bg-red-500 btn-ghost absolute right-2 top-2 px-3 py-1 rounded cursor-pointer hover:bg-red-400">
              ✕
            </button>
          </form>
          {selectedProductId && <EditModal id={selectedProductId} handleClose={closeModal} />}
        </div>
      </dialog>
    </div>
  );
};

export default AllProduct;