import React, { useState } from "react";
import UseAuth from "../../Context/UseAuth";
import axios from "axios";
import useReview from "../../api/useReview";
import ReviewList from "./reviewList";

const ProductReview = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewData, isLoading, refetch] = useReview();
  const { user } = UseAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review) {
      return alert("please add rating and review properly");
    }
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      rating: rating,
      review: review,
      productId: id,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        reviewData
      );
      if (res.data.success) {
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
      refetch();
    }
    console.log("Selected reviewData:", reviewData);
    console.log(review);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-xl">
          <div className="mt-4">
            <label>Write your review</label>
            <textarea
              type="text"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 block w-xl h-22 rounded-lg border border-gray-300 px-3 py-2 
               focus:border-blue-500 focus:ring focus:ring-blue-200 
               focus:ring-opacity-50 text-gray-900"
              id=""
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
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
            <button
              type="submit"
              className="mt-4 px-3 py-1 bg-orange-400 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div>
        <ReviewList id={id} />
      </div>
    </div>
  );
};

export default ProductReview;
