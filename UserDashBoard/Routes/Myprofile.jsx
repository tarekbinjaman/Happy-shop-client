import React, { useState } from "react";
import UseAuth from "../../Context/UseAuth";
import currentUser from "../../api/currentUser";
import { LuPencilLine } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { AiTwotoneHome } from "react-icons/ai";

const Myprofile = () => {
  const { user } = UseAuth();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  //cloudinary configuration
  const [file, setFiles] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const [name, setName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  // const [userEmail, setUserEmail] = useState("");
  const updateData = {
    useraddress: [{ 
      name: name || userData?.useraddress?.[0]?.name, 
      address: userAddress || userData?.useraddress?.[0]?.address, 
      number: mobileNumber || userData?.useraddress?.[0]?.number }],
  };
  const [modal, setModal] = useState(false);

  const handelUpload = async (selectedFile) => {
    if (!selectedFile)
      return toast.error("Please select an image", { position: "top-center" });

    try {
      // uploading image to clodinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", uploadPreset);
      const cloudinaryUploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const imageUrl = cloudinaryUploadRes.data.secure_url;

      // update image in backend
      await axios.put(`http://localhost:5000/api/users/${userData?._id}`, {
        photoURL: imageUrl,
      });
      toast.success("Image upload successfully!", { position: "top-center" });
      refetchUserList();
    } catch (err) {
      toast.error("Something went wrong while image uploading", {
        position: "top-center",
      });
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:5000/api/users/${userData?._id}`,
      updateData
    );
    if (res.data.success) {
      toast.success("User data updated", { position: "top-center" });
      refetchUserList();
      setModal(!modal);
    }
    console.log("Here is the name and email", name, userEmail);
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="flex flex-col items-center space-y-3  border-2 border-slate-300  pb-8 relative md:w-4xl w-[400px] bg-slate-300">
        <div className="bg-white h-40 w-full"></div>

        <img
          className="rounded-full bg-white p-2 absolute top-22 z-10 w-28 h-28 object-cover object-center"
          src={userData?.photoURL}
          alt=""
        />

        <LuPencilLine
          onClick={() => setModal(true)}
          className="absolute top-1 right-2 text-xl cursor-pointer z-20 hover:scale-125 transition-all ease-in duration-200 hover:text-blue-400"
        />

        <div className="mt-8">
          <p className="text-sm text-center text-gray-500">{userData?.email}</p>
        </div>
        <div className="bg-white md:w-2xl w-[370px] p-4 rounded-2xl">
          <div className="flex justify-start">
            <div>
              <AiTwotoneHome className="text-2xl" />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="px-4">
                <span>{userData?.useraddress?.[0]?.name}</span>
              </p>
              <p className="px-4">
                <span>
                  {0}
                  {userData?.useraddress?.[0]?.number}
                </span>
              </p>
              <p className="px-4">
                <span>Address:</span>{" "}
                <span>{userData?.useraddress?.[0]?.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}

      <div
        className={`inset-0 bg-black/20 backdrop-blur-md z-50 fixed flex items-center justify-center transition-opacity duration-300
        ${modal ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className={` bg-white absolute z-50 left-1/2 -translate-x-1/2 md:w-xl w-[400px] shadow-2xl flex flex-col items-center py-8 transform  transition-all duration-300
            ${modal ? "scale-100 opacity-100" : "scale-90 opacity-90"}
            `}
        >
          <div className="relative flex items-center justify-center group hover:cursor-pointer">
            {/* Image */}
            <img
              src={userData?.photoURL}
              className="rounded-full w-28 h-28 object-cover"
              alt=""
            />

            {/* black overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-100 transition duration-300 rounded-full"></div>

            {/* icon */}
            <LuPencilLine className="absolute text-gray-300 group-hover:text-white transition duration-300" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFiles(e.target.files[0]);
                handelUpload(e.target.files[0]);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              {/* input fields */}
              <div className="flex gap-4 mt-3 w-[380px]">
              <div className="flex flex-col gap-1">
                <label className="text-lg text-gray-400">Name</label>
                <input
                  defaultValue={userData?.useraddress?.[0]?.name}
                  type="text"
                  className="border border-gray-300 pl-4 w-[182px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg text-gray-400">Number</label>
                <input
                  defaultValue={userData?.useraddress?.[0]?.number}
                  type="text"
                  className="border border-gray-300 pl-4 w-[182px]"
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              </div>
              <div className="flex gap-2 mt-3">

                <textarea
                  defaultValue={userData?.useraddress?.[0]?.address}
                  type="text"
                  placeholder="address"
                  className="border border-gray-300 pl-4 textarea w-full"
                  onChange={(e) => setUserAddress(e.target.value)}
                ></textarea>
              </div>
              {/* <div className="flex gap-2 mt-3">
                <label className="text-lg text-gray-400">Email</label>
                <input
                  defaultValue={userData?.email}
                  type="email"
                  className="border border-gray-300 pl-4"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div> */}
            </div>
            {/* buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="mt-4 
              cursor-pointer hover:shadow-lg
              border border-gray-400 px-10 hover:border-black transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => setModal(false)}
                type="button"
                className="mt-4 
              cursor-pointer hover:shadow-lg
              border border-gray-400 px-10 hover:border-black transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
