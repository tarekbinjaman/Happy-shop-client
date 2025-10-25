import React, { useState } from "react";
import UseAuth from "../../Context/UseAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import login_bg from "../../Assets/img/tt.jpg";
import { GoArrowRight } from "react-icons/go";
import { p } from "framer-motion/client";
import { FcGoogle } from "react-icons/fc";
import { LuPencilLine } from "react-icons/lu";
import axios from "axios";
import allUsers from "../../api/allUsers";

const Registration = () => {
  const { googleSignin, userRegister, updateUser } = UseAuth();
  const [users, refetch] = allUsers();
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // password validation
  const validatePassword = (passwrod) => {
    const errors = [];
    if (!/[A-Z]/.test(passwrod))
      errors.push("Must contain at least one uppearcase letter.");
    if (!/[a-z]/.test(passwrod))
      errors.push("Must contain at least one lowercase letter.");
    if (passwrod.length < 6) errors.push("Must be at least 6 characters long.");
    return errors;
  };

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
      setUserPhoto(imageUrl);

      // update image in backend
      //   await axios.put(`https://happy-shop-snowy.vercel.app/api/users/${userData?._id}`, {
      //     photoURL: imageUrl,
      //   });
      //   toast.success("Image upload successfully!", { position: "top-center" });
    } catch (err) {
      toast.error("Something went wrong while image uploading", {
        position: "top-center",
      });
      console.log(err.message);
    }
  };

  // google signin fuction
  const googleClick = async () => {
    try {
      const result = await googleSignin();
      const user = result.user;
      console.log(user);
      const userData = {
        name: user?.displayName,
        email: user?.email,
        isAdmin: false,
        number_of_meal_added: 0,
        photoURL: user?.photoURL,
      };

      // api call
      const res = await fetch("https://happy-shop-snowy.vercel.app/api/users", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("User data storage failed");

      navigate("/");
      toast.success("Registration Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //   const oonsubmit = (data) => {
  //     const { name, email, url, password } = data;
  //     console.log(data);
  //   };

  const onsubmit = async (data) => {
    const { name, email, password } = data;

    // password validation
    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }
    setPasswordErrors([]); // Clear previous errors if valid
    const isEmailUsed = users.some((item) => item?.email === email);
    try {
      // Register the user with email and password
      if (isEmailUsed) {
        return toast.error("This email is already used");
      }
      const result = await userRegister(email, password);
      const user = result.user;

      // update user profile
      await updateUser(user, {
        displayName: name,
        photoURL: userPhoto,
      });

      // prepare user data to save in database
      const userData = {
        name: name,
        email: email,
        isAdmin: false,
        number_of_meal_added: 0,
        photoURL: userPhoto,
      };
      console.log("User data", userData);

      const res = await fetch("https://happy-shop-snowy.vercel.app/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("User data storage failed");
      toast.success("Registration successfully");
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("something went wrong during registration");
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="hidden lg:block">
        <div className="flex justify-between gap-3 relative">
          <div className={`${openForm ? "absolute z-50 -translate-x-100" : "translate-x-0 absolute z-50"} transition duration-400 ease-in-out`}>
          <div className="w-[400px] h-[600px] relative shadow-xl border rounded-2xl">
            <img
              src={login_bg}
              className="rounded-t-2xl h-[460px] w-full object-cover"
              alt=""
            />

            <div className=" bg-white rounded-2xl p-6 pt-8 absolute w-full z-10 -mt-46">
              <h3 className="">
                {" "}
                <span className="font-semibold text-6xl">Welcome to </span>
                <span className="uppercase font-bold text-red-500 text-6xl">
                  shop.co
                </span>
              </h3>
              <p className="mt-2 text-xl text-gray-400">
                Let's connect & buy your product in best price.
              </p>
              <button 
              onClick={() => setOpenForm(!openForm)}
              className="inline-flex items-center gap-2 border-black border-[2px] hover:shadow-lg transition-all duration-200 mt-4 mb-4 w-50 py-1 pl-1 rounded-xl group cursor-pointer">
              <p className="text-xl">Sign up now!</p>
              <GoArrowRight className="text-black text-2xl group-hover:ml-8 transition-all duration-200" />
              </button>
            </div>
          </div>
          </div>
          <div className={`flex flex-col space-y-3 p-4 rounded-t-2xl w-[400px] h-[600px] bg-white border rounded-2xl ${openForm ? "absolute z-30 translate-x-10 opacity-100" : "opacity-0" } transition duration-300 ease-in-out shadow-2xl`}>
            <form className="" onSubmit={handleSubmit(onsubmit)}>
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center group hover:cursor-pointer w-32 h-[126px]">
                  {/* Image */}
                  <img
                    src={
                      userPhoto ||
                      "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
                    }
                    className="rounded-full w-32 h-[126px] object-cover"
                    alt=""
                  />

                  {/* black overlay */}
                  <div className="absolute inset-0 z-20 bg-black/40 opacity-60 group-hover:opacity-100 transition duration-300 rounded-full"></div>

                  {/* icon */}
                  <LuPencilLine className="absolute text-gray-300 group-hover:text-white transition duration-300" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      //   setFiles(e.target.files[0]);
                      handelUpload(e.target.files[0]);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer z-30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-x-3 gap-y-8 mb-8">
                <div className="form-control">
                  <label className="label text-xl text-gray-500 mb-2">
                    Name
                  </label>
                  <div>
                    <input
                      type="text"
                      className="border-pink-400 border-2 p-1 w-full"
                      {...register("name", { require: "Name is required" })}
                    />
                  </div>
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="flex justify-between">
                  <div className="form-control">
                    <label className="label text-xl mb-2 text-gray-500">
                      Email
                    </label>
                    <div>
                      <input
                        type="email"
                        className="border-pink-400 border-2 p-1 w-[170px]"
                        {...register("email", { require: "Email is required" })}
                      />
                    </div>
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label text-xl mb-2 text-gray-500">
                      Password
                    </label>
                    <div>
                      <input
                        type="password"
                        className="border-pink-400 border-2 p-1 w-[170px]"
                        {...register("password", {
                          require: "password is required",
                        })}
                      />
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: "you must agree to the terms and conditions",
                    })}
                  />
                  I agree to the{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    terms and conditions
                  </span>
                </label>
                {errors.agree && (
                  <p className="text-red-500 text-sm">{errors.agree.message}</p>
                )}
              </div>
              <div className="from-control mt-8">
                <button
                  type="submit"
                  className="btn btn-primary bg-pink-500 w-full"
                >
                  Register now
                </button>
              </div>
            </form>
            <div className="divider">or</div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-400 underline">
                Login
              </Link>
            </p>
            <div className="flex justify-center 4">
              <button
                className="cursor-pointer flex gap-2 items-center btn"
                onClick={googleClick}
              >
                {" "}
                <FcGoogle className="text-xl" /> Sign up
              </button>
            </div>
          </div>
        </div>
        </div>
        {/* Registration form for small device */}
                  <div className={`flex flex-col space-y-3 p-4 rounded-t-2xl w-[400px] h-[600px] bg-white border rounded-2xl shadow-2xl lg:hidden`}>
            <form className="" onSubmit={handleSubmit(onsubmit)}>
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center group hover:cursor-pointer w-32 h-[126px]">
                  {/* Image */}
                  <img
                    src={
                      userPhoto ||
                      "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
                    }
                    className="rounded-full w-32 h-[126px] object-cover"
                    alt=""
                  />

                  {/* black overlay */}
                  <div className="absolute inset-0 z-20 bg-black/40 opacity-60 group-hover:opacity-100 transition duration-300 rounded-full"></div>

                  {/* icon */}
                  <LuPencilLine className="absolute text-gray-300 group-hover:text-white transition duration-300" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      //   setFiles(e.target.files[0]);
                      handelUpload(e.target.files[0]);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer z-30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-x-3 gap-y-8 mb-8">
                <div className="form-control">
                  <label className="label text-xl text-gray-500 mb-2">
                    Name
                  </label>
                  <div>
                    <input
                      type="text"
                      className="border-pink-400 border-2 p-1 w-full"
                      {...register("name", { require: "Name is required" })}
                    />
                  </div>
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="flex justify-between">
                  <div className="form-control">
                    <label className="label text-xl mb-2 text-gray-500">
                      Email
                    </label>
                    <div>
                      <input
                        type="email"
                        className="border-pink-400 border-2 p-1 w-[170px]"
                        {...register("email", { require: "Email is required" })}
                      />
                    </div>
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label text-xl mb-2 text-gray-500">
                      Password
                    </label>
                    <div>
                      <input
                        type="password"
                        className="border-pink-400 border-2 p-1 w-[170px]"
                        {...register("password", {
                          require: "password is required",
                        })}
                      />
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: "you must agree to the terms and conditions",
                    })}
                  />
                  I agree to the{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    terms and conditions
                  </span>
                </label>
                {errors.agree && (
                  <p className="text-red-500 text-sm">{errors.agree.message}</p>
                )}
              </div>
              <div className="from-control mt-8">
                <button
                  type="submit"
                  className="btn btn-primary bg-pink-500 w-full"
                >
                  Register now
                </button>
              </div>
            </form>
            <div className="divider">or</div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-400 underline">
                Login
              </Link>
            </p>
            <div className="flex justify-center 4">
              <button
                className="cursor-pointer flex gap-2 items-center btn"
                onClick={googleClick}
              >
                {" "}
                <FcGoogle className="text-xl" /> Sign up
              </button>
            </div>
          </div>
      </div>
      <div className={`${openForm ? "mt-200" : "mt-40" } `}></div>
    </div>
  );
};

export default Registration;
