import React from "react";
import UseAuth from "../../Context/UseAuth";
import currentUser from "../../api/currentUser";

const Myprofile = () => {
  const { logOut, user } = UseAuth();
  const email = user?.email;
  const [currentUerData, refetchUserList] = currentUser(email);
  const userData = currentUerData?.[0];
  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col items-center space-y-3  border px-2 py-6 relative w-4xl">
        <div className="bg-[#F2F0F1] h-40 w-full"></div>

        <img className="rounded-full bg-[#F2F0F1] p-2 absolute top-22" src={userData?.photoURL} alt="" />




      <div>
        <h1 className="text-2xl">Name: <span>{userData?.name}</span></h1>
        <p className="text-sm text-center text-gray-500">{userData?.email}</p>
      </div>
        </div>
    </div>
  );
};

export default Myprofile;
