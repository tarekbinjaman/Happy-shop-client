import React from "react";
import useProducts from "../../api/useProducts";

const ProductListCard = ({ id }) => {
  const product = useProducts();
  const prod = product[0].find((item) => item?._id === id);
  const rating = prod.rating || 0;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  return (
    <div className="flex gap-4">
        <div className="bg-[#f2f0f1] rounded-xl p-2">
      <img className="w-16 h-16 object-fill" src={prod?.images[0].url} alt="" />
        </div>
      <div>
        <h1 className="xl:text-sm font-bold">{prod?.title.slice(0, 10)}</h1>

        {/* rating */}
        <div className="flex items-center space-x-1 mt-1">
          {[...Array(filledStars)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
          {hasHalfStar && <span className="text-yellow-400">☆</span>}
          {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
        <h1>{prod?.finalPrice}</h1>
      </div>
    </div>
  );
};

export default ProductListCard;
