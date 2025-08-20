import { BsThreeDots } from "react-icons/bs";
import useReview from "../../api/useReview";

const ReviewList = ({ id }) => {
  const [reviewData, isLoading, refetch] = useReview();
  const singleProductReview =
    reviewData && reviewData.filter((item) => item?.productId === id);
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  console.log("Singel product review data ", singleProductReview);
  return (
    <div>
      <h1 className="font-bold">All reviews</h1>
      <div className="flex flex-col space-y-3.5">
        {singleProductReview &&
          singleProductReview.map((item) => {
            const rating = item?.rating;
            const filledStars = Math.floor(item?.rating);
            const hasHalfStar = rating % 1 !== 0;
            const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
            return (
              <div className="flex gap-4 items-start max-w-xl">
                <div
                  className={`${
                    colors[Math.floor(Math.random() * colors.length)]
                  } px-3 py-1 rounded-full`}
                >
                  <p className="text-md text-white font-bold">
                    {item?.name[0]}
                  </p>
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-md font-bold">{item?.name}</h1>
                    <BsThreeDots className="cursor-pointer" />
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
    </div>
  );
};

export default ReviewList;
