import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAuth from "../../Context/UseAuth";
import axios from "axios";

const ViewOrder = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const onfetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/order?email=${user?.email}`)
      if(res.data.success) {
        setData(res.data.Data)
      }
    }
    onfetch()
  },[user?.email])

  // Wait until the data is loaded

  const orderData = data && data.find((item) => item?._id === id);

  console.log("orderData >>>>>>>>>++++++++++++++++++++++++++++++", orderData);

  return (
    <div>
      <div className="flex flex-col">
      {
        orderData &&
        orderData?.item.map((items) => (
          <div>
          <div className="flex space-x-2">
            <div>
              <img className="w-20" src={items?.image} alt="" />
            </div>
            <div>
            <h1>{items?.title}</h1>
            <h1 className="text-gray-400 mt-2">{items?.description.slice(0, 15)}</h1>
            </div>
          </div>
          <div>
            <p><span className="font-bold">Price</span> <span>{items?.price}</span>$</p>
            <span>
          <span className="font-bold ">Quantitiy:</span> <span className="text-gray-500">{items?.quantity}</span>
            </span>
          </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default ViewOrder;
