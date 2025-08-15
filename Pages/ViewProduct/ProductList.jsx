import React from "react";
import useProducts from "../../api/useProducts";
import ProductListCard from "./ProductListCard";

const ProductList = () => {
  const product = useProducts();
  const data = product[0].slice(-4);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">New Arrival</h1>
      <div className="flex flex-col gap-y-5">
      {
        data.map((prod, index) => (
            <ProductListCard id={prod?._id} />
        ))
      }
      </div>
    </div>
  );
};

export default ProductList;
