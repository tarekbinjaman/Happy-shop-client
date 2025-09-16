import axios from "axios";
import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useCart from "../api/useCart";

const CartProductCard = ({
  image,
  color,
  title,
  description,
  size,
  id,
  refe,
}) => {
  const deleteCart = async (id) => {
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
            `http://localhost:5000/api/cartList/${id}`
          );

          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
           refe();
          } else {
            toast.success("Prduct delete failed from cart");
          }
          
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };
  return (
    <div className="border border-slate-400 rounded-md">
      <div className="flex gap-4 h-[140px] p-3">
        <div className="border border-slate-300 rounded-md">
          <img className="w-[90px] h-full" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <p className="font-bold">{title.slice(0, 25)}</p>
          <p className="text-sm">
            {description?.split("").slice(0, 20).join("")}
          </p>
          <div>
            <p>
              Color:{" "}
              <span
                style={{ background: color }}
                className={`px-2 border ml-2`}
              ></span>
              {}
            </p>
            <div className="flex justify-between">
              <p>
                Size: <span className="text-gray-600">{size}</span>
              </p>
              <IoTrashBin
                onClick={() => {
                  deleteCart(id);
                }}
                className="text-2xl mr-2 mb-2 cursor-pointer"
                title="Remove"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
