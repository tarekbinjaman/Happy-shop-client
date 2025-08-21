import { BsThreeDots } from "react-icons/bs";
import useReview from "../../api/useReview";
import { useState } from "react";
import ReviewProgressBar from "./reviewProgressBar";
import { IoBanOutline } from "react-icons/io5";

const ReviewList = ({ id }) => {
  const [reviewData, isLoading, refetch] = useReview();
  const [reportId, setReportId] = useState(null);
  const singleProductReview =
    reviewData && reviewData.filter((item) => item?.productId === id);

  console.log("Singel product review data ", singleProductReview);
  return (
    <div>
      <h1 className="font-bold mb-4">All reviews</h1>
      {
        singleProductReview && singleProductReview.length > 0
         ?         
      <div className="flex flex-col space-y-3.5">
        {
          singleProductReview.map((item) => {
            const rating = item?.rating;
            const filledStars = Math.floor(item?.rating);
            const hasHalfStar = rating % 1 !== 0;
            const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
            return (
              <div className="flex gap-4 items-start max-w-xl">
                <div className={`bg-white border px-3 py-1 rounded-full`}>
                  <p className="text-md  font-bold">{item?.name[0]}</p>
                </div>
                <div className="">
                  <div className="flex justify-between relative">
                    <h1 className="text-md font-bold">{item?.name}</h1>
                    <BsThreeDots
                      onClick={() => setReportId(reportId === item?._id ? null : item?._id)}
                      className="cursor-pointer"
                    />
                    {reportId === item?._id && (
                      <div 
                      onClick={() => setReportId(null)}
                      className="absolute bg-gray-300 -right-24 px-4 py-2 transition cursor-pointer">
                        <p>Report</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-1">
                      {/* filled stars */}
                      {[...Array(filledStars)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}

                      {/* half star */}
                      {hasHalfStar && (
                        <span className="text-yellow-400">☆</span>
                      )}

                      {/* empty stars */}
                      {[...Array(emptyStars)].map((_, i) => (
                        <span key={i} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(item?.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="">{item?.review}</p>
                </div>
              </div>
            );
          })}
      </div>
         :
         <div className="flex items-center justify-center h-32 w-xl">
         <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl">No review found here</h1>
          <IoBanOutline className="text-4xl" />
         </div>
         </div>
      }
    </div>
  );
};

export default ReviewList;
