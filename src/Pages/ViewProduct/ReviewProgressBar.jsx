import React from "react";
import useReview from "../../../api/useReview";
import { GoStarFill } from "react-icons/go";

const ReviewProgressBar = ({ id }) => {
  const [reviewData, isLoading, refetch] = useReview();
  const singleProductReview =
    reviewData && reviewData.filter((item) => item?.productId === id);
  const reviewRatingData = singleProductReview?.map((item) => item?.rating);
  console.log("This is product reivew rating data:", reviewRatingData);

  const oneStarReview = reviewRatingData?.filter((item) => item === 1).length;

  const twoStarReview = reviewRatingData?.filter((item) => item === 2).length;

  const threeStarReview = reviewRatingData?.filter((item) => item === 3).length;

  const fourStarReview = reviewRatingData?.filter((item) => item === 4).length;

  const fiveStarReview = reviewRatingData?.filter((item) => item === 5).length;
  const averageRating = 1 * oneStarReview + 2 *  twoStarReview + 3 * threeStarReview + 4 * fourStarReview + 5 * fiveStarReview ;
  const sumOfAverageRating = averageRating / singleProductReview?.length;
  console.log('Average rating count:', sumOfAverageRating)
  const starArray = [
    { number: "five", value: fiveStarReview },
    { number: "four", value: fourStarReview },
    { number: "three", value: threeStarReview },
    { number: "two", value: twoStarReview },
    { number: "one", value: oneStarReview },
    
  ];
  console.log("How many time one two", starArray);
  return (
    <div className="flex mt-8 lg:justify-between md:gap-3 md:flex-row flex-col-reverse">
      <div className="flex flex-col space-y-2 xl:w-3/6 lg:w-4/6 md:w-4/6 mt-4 md:mt-0">
        {starArray.map((item) => (
          <div className="flex gap-2 items-center ">
            <div className="flex ">
                <div className="w-16 text-left ">
              <p className="uppercase text-sm font-semibold">{item?.number}</p>
                </div>
              <div>
              <GoStarFill className="text-[#FCB700]" />
              </div>
            </div>

            <progress
              className="progress progress-warning w-[80%] h-3"
              value={item?.value}
              max="5"
            ></progress>
            <span className="font-bold">{item?.value}</span>
          </div>
        ))}
      </div>
      {/* average rating */}
      <div className="bg-orange-100 xl:w-3/6 lg:w-2/6 md:w-2/6 flex items-center justify-center rounded-xl py-4 md:py-0">
      <div className="text-center">
        <h1 className="text-xl font-bold text-orange-400 mb-2">{Math.floor(sumOfAverageRating * 10)  / 10}</h1>

        <div className="flex gap-2 mb-2">
            <GoStarFill className="text-[#FCB700]" />
            <GoStarFill className="text-[#FCB700]" />
            <GoStarFill className="text-[#FCB700]" />
            <GoStarFill className="text-[#FCB700]" />
            <GoStarFill className="text-[#FCB700]" />
        </div>
        <p className="text-md font-bold">{singleProductReview?.length} Ratings</p>
      </div>
      </div>
    </div>
  );
};

export default ReviewProgressBar;
