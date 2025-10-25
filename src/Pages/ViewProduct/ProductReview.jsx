import React, { useState } from "react";
import UseAuth from "../../../Context/UseAuth";
import axios from "axios";
import useReview from "../../../api/useReview";
import ReviewList from "./reviewList";
import ReviewProgressBar from "./reviewProgressBar";
import { toast } from "react-toastify";

const ProductReview = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewData, isLoading, refetch] = useReview();
  const { user } = UseAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review) {
      return toast.error("please add review properly");
    }
    if(!rating) {
      return toast.error("Please add rating properly ⭐⭐⭐⭐⭐")
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
        toast.success('Submited')
        setReview("");
        setRating(0);
      } else {
        toast.error("Failed to submit review")
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("something went wrong");
    } finally {
      setLoading(false);
      refetch();
    }
    console.log("Selected reviewData:", reviewData);
  };
  console.log('here', user);
  return (
    <div>
      <div>
        <ReviewProgressBar id={id} />
      </div>
      {/* component 1 */}
      <div className="flex lg:flex-row-reverse flex-col justify-between mt-10">
      <div className="lg:w-3/6 mb-4 lg::mb-0">
      <div className="md:sticky md:top-10">
      <div className="mt-4 flex flex-col  space-y-2">
        <div className="flex flex-col">
          <label>Name ●</label>
          <input type="text" className="rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed" disabled defaultValue={user?.displayName} />
        </div>
        <div className="flex flex-col">
          <label>Email ●</label>
          <input type="text" className="rounded-lg border border-gray-300 px-3 py-2 cursor-not-allowed " disabled defaultValue={user?.email} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="">
            <label className="font-bold text-md">Write your review</label>
            <textarea
              type="text"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className=" block w-full h-22 rounded-lg border border-gray-300 px-3 py-2 
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
      </div>
      </div>
      {/* component 2 */}
      <div>
        <ReviewList id={id} />
      </div>
      </div>
    </div>
  );
};

export default ProductReview;
