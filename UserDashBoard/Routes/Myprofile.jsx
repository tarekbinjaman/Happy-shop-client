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
        <div className="flex flex-col items-center space-y-3 justify-between border px-2 py-6">
      <div>
        <img className="" src={userData?.photoURL} alt="" />
      </div>
      <div>
        <h1 className="text-2xl">Name: <span>{userData?.name}</span></h1>
        <p className="text-sm text-center text-gray-500">{userData?.email}</p>
      </div>
        </div>
    </div>
  );
};

export default Myprofile;
