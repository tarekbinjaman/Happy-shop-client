import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import login_bg from "../Assets/img/tt.jpg";
import UseAuth from "../Context/UseAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import currentUser from "../api/currentUser";
import allUsers from "../api/allUsers";

const Login = () => {
  const { userLogin, googleSignin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, refetch] = allUsers();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // google signin fuction
  const googleClick = async () => {
    try {
      const result = await googleSignin();
      const user = result.user;
      const isUserAvailable = users.some((item) => item?.email === user?.email)
      if(isUserAvailable) {
        navigate('/')
      } else {

        const userData = {
          name: user?.displayName,
          email: user?.email,
          isAdmin: false,
          number_of_meal_added: 0,
          photo: user?.photoURL,
          agree: false,
        };
  
        // api call
      //   const res = await fetch("http://localhost:5000/api/users", {
      //     method: "POST",
      //     headers: { "content-Type": "application/json" },
      //     body: JSON.stringify(userData),
      //   });
      const res = await axios.post(`http://localhost:5000/api/users`, userData)
  
      if(res.data.success) {
          navigate('/')
      }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onsubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    userLogin(email, password)
      .then((result) => {
        console.log(result);
        toast.success("Login successful");
        navigate(location?.state ? location?.state : "/");
      })
      .catch((err) => {
        // todo set catches
        setError(err.code);
      });
  };
  return (
    <div>
      <h1>This is login page</h1>
      <div className="flex justify-center">
        <div className="w-[400px] relative shadow-xl">
          <div className="absolute text-white ml-6 mt-6 font-bold">
            <h2 className="text-2xl uppercase">
              Welcome <br /> Back
            </h2>
          </div>
          <img
            src={login_bg}
            className="rounded-t-2xl h-[500px] w-full object-cover"
            alt=""
          />
          <div className="absolute bg-gradient-to-b z-50 -mt-78 ml-60 from-red-400 to-red-600 p-3 rounded-full">
            <GoArrowRight className="text-white text-2xl" />
          </div>

          <div className=" bg-white rounded-2xl p-6 pt-8 absolute w-full z-10 -mt-72">
            <h3 className="text-2xl font-bold mb-2">Sign in</h3>
            <div className="form-control">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="flex flex-col space-y-2">
                  <label>Email</label>
                  <input
                    type="email"
                    className="border-pink-400 border-2 p-1 rounded-md mb-2"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    type="password"
                    className="border-pink-400 border-2 p-1 rounded-md"
                    {...register("password", { required: "Email is required" })}
                  />
                </div>
                <button className="btn bg-pink-500 text-white mt-2">
                  Submit
                </button>
                <div className="flex justify-between items-end-safe">
                  <p>
                    New here?{" "}
                    <Link to={"/register"} className="text-blue-400 underline">
                      Register now!
                    </Link>
                  </p>
                  <div className="flex justify-center 4">
                    <button
                      className="cursor-pointer flex gap-2 items-center btn"
                      onClick={googleClick}
                    >
                      {" "}
                      <FcGoogle className="text-xl" /> Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
