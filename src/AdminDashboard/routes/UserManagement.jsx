import { useState } from "react";
import allUsers from "../../../api/allUsers";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, refetch] = allUsers();
  console.log("Curren user )0-0()0-0()0-0()0-0()0-0()0-0(", users);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editButton, setEditButton] = useState(false);
  const makeAdmin = async (id) => {
    const res = await axios.put(`https://happy-shop-snowy.vercel.app/api/users/${id}`, {
      isAdmin: true,
    });
    if (res.data.success) {
      refetch();
      toast.info("User role updated");
      setEditButton(false);
      setModal(false);
    }
    console.log(id);
  };
  const blockUser = async (id) => {
    const res = await axios.put(`https://happy-shop-snowy.vercel.app/api/users/${id}`, {
      isBlocked: true,
    });
    if (res.data.success) {
      refetch();
      toast.info("User blocked");
    }
  };
  const deleteUser = async (id) => {
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
            `https://happy-shop-snowy.vercel.app/api/users/${id}`
          );
          if (res.status === 200) {
            toast.success("Product deleted successfully");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Failed! Something went wrong");
          toast.error("Failed to delte product");
        }
      }
    });
    // const res = await axios.delete(`https://happy-shop-snowy.vercel.app/api/users/${id}`)
    // if (res.data.success) {
    //   refetch();
    //   toast.info("User deleted");
    // }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">User list</h1>
      <table className="border-collapse border border-gray-400 w-full text-left">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Role</th>
            <th className="border border-gray-400 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {user?.name}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {user?.email}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {user?.isAdmin === false ? "Regular User" : "Admin"}
                </td>
                <td className="border border-gray-400 px-4 py-2 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModal(true);
                    }}
                    className="bg-blue-400 rounded-sm px-2 py-0.5 cursor-pointer hover:scale-110 transition duration-200 w-20"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteUser(user?._id)}
                    className="bg-black text-white px-2 py-0.5 rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-20"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => blockUser(user?._id)}
                    className="bg-red-400 text-white px-4 py-0.5 rounded-sm cursor-pointer hover:scale-110 transition duration-200 w-20"
                  >
                    {user?.isBlocked ? "Blocked" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* modal */}
      <div
        className={`inset-0 ${
          modal ? "opacity-100 visible" : "opacity-0 invisible"
        } bg-black/20 z-40 fixed transition-opacity duration-300`}
      >
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-lg z-50 bg-white transition-all duration-300  rounded
                    ${modal ? "scale-100 opacity-100" : "scale-90 opacity-90"}
                    `}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="mx-2 mt-4 flex flex-col space-y-3 mb-5">
              <h1 className="font-bold text-center border-b border-gray-400 pb-3">
                User info
              </h1>
              <p>
                <span className="font-bold">User name: </span>
                <span>{selectedUser?.name}</span>
              </p>
              <p>
                <span className="font-bold">User email: </span>
                <span>{selectedUser?.email}</span>
              </p>
              <div>
                <div className="flex gap-2">
                  <p>
                    <span className="font-bold">User type: </span>
                    <span>
                      {selectedUser?.isAdmin ? "Admin" : "Regular user"}
                    </span>
                  </p>
                  {!selectedUser?.isAdmin && (
                    <div className="flex gap-3 items-center relative">
                      <button>
                        <HiOutlinePencilSquare
                          onClick={() => {
                            setEditButton(true);
                          }}
                          title="Change user role"
                          className="text-xl cursor-pointer text-gray-400 hover:text-gray-700 hover:scale-110 transition duration-300"
                        />
                      </button>

                      {
                        <div className="relative">
                          <button
                            onClick={() => {
                              makeAdmin(selectedUser?._id);
                              // setEditButton(false);
                            }}
                            className={`text-sm text-white bg-black rounded p-1 absolute whitespace-nowrap cursor-pointer ${
                              editButton
                                ? "translate-x-0 opacity-100 visible -top-3"
                                : "-translate-x-2 opacity-0 invisible"
                            } transition-all duration-300`}
                          >
                            Make admin
                          </button>
                          <span
                            onClick={() => setEditButton(false)}
                            className={`${
                              editButton
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            } absolute bg-red-400 z-50 -top-6 left-19 rounded-full w-5 h-5 text-xs hover:bg-red-600 text-center text-white cursor-pointer`}
                          >
                            X
                          </span>
                        </div>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center mx-0.5 mb-0.5">
              <button
                onClick={() => {
                  setEditButton(false);
                  setModal(false);
                }}
                className="bg-gray-700 text-white rounded w-full cursor-pointer hover:bg-black transition duration-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
