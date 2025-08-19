import React, { useState } from "react";
import UseAuth from "../../Context/UseAuth";
import axios from "axios";

const ProductReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = UseAuth();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!rating || !review) {
        return alert('please add rating and review properly')
    };
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      rating: rating,
      review: review,
    };
    try{
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/reviews", reviewData);
      if(res.data.success) {
        alert("Review submitted successfully");
        setReview("");
        setRating(0);
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("something went wrong");
    } finally {
      setLoading(false);
    };
    console.log("Selected reviewData:", reviewData);
    console.log(review)
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="flex items-center gap-0.5 ">
            Add your rating <span>●</span>
          </label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-400"
                value={star}
                checked={rating === star}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label>Write your review</label>
          <input
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
               focus:border-blue-500 focus:ring focus:ring-blue-200 
               focus:ring-opacity-50 text-gray-900"
            id=""
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-2 bg-orange-400 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductReview;
