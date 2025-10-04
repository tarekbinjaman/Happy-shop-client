import React, { useState } from "react";
import UseAuth from "../../Context/UseAuth";
import currentUser from "../../api/currentUser";
import { LuPencilLine } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";

const Myprofile = () => {
  const { logOut, user } = UseAuth();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  //cloudinary configuration
  const [file, setFiles] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  
  const handelUpload = async () => {
    if(!file) return toast.error("Please select an image", {position: "top-center"});

    try {
      // uploading image to clodinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const cloudinaryUploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const imageUrl = cloudinaryUploadRes.data.secure_url;

      // update image in backend
      const updateImge = await axios.post(`http://localhost:5000/api/users/${userData?._id}`, 
        {photoURL: imageUrl}
      )
    } catch (err) {
      toast.error("Something went wrong while image uploading", {position: "top-center"})
      console.log(err.message)
    }

  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="flex flex-col items-center space-y-3  border-2 border-slate-300  pb-8 relative w-4xl bg-slate-300">
        <div className="bg-white h-40 w-full"></div>

        <img
          className="rounded-full bg-white p-2 absolute top-22 z-10"
          src={userData?.photoURL}
          alt=""
        />

        <LuPencilLine className="absolute top-1 right-2 text-xl cursor-pointer z-20" />

        <div className="mt-8">
          <h1 className="text-2xl">
            Name: <span>{userData?.name}</span>
          </h1>
          <p className="text-sm text-center text-gray-500">{userData?.email}</p>
        </div>
      </div>
      {/* modal */}
      <div className="inset-0 bg-black/20 backdrop-blur-md z-50 fixed flex items-center justify-center">
        <div className=" bg-white absolute z-50 left-1/2 -translate-x-1/2 w-xl shadow-2xl flex flex-col items-center">
          <div className="relative flex items-center justify-center group hover:cursor-pointer">
            {/* Image */}
            <img src={userData?.photoURL} className="rounded-full" alt="" />
            
            {/* black overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 rounded-full"></div>

            {/* icon */}
            <LuPencilLine className="absolute text-gray-300 group-hover:text-white transition duration-300" />
            <input 
            type="file" 
            accept="image/*"  
            onChange={(e) => setFiles(e.target.files[0])}
            onKeyUp={() => handelUpload()}
            className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit magni
            cum quasi perferendis unde aspernatur omnis impedit voluptas neque
            fuga, quisquam quibusdam incidunt iure quis nesciunt eum quam
            sapiente! Minus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
