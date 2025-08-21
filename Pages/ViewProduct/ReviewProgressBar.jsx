import React from "react";
import useReview from "../../api/useReview";
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
  const starArray = [
    { number: "five", value: fiveStarReview },
    { number: "four", value: fourStarReview },
    { number: "three", value: threeStarReview },
    { number: "two", value: twoStarReview },
    { number: "one", value: oneStarReview },
    
  ];
  console.log("How many time one two", starArray);
  return (
    <div>
      <div className="flex flex-col space-y-2">
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
              className="progress progress-warning w-2/5 h-3"
              value={item?.value}
              max="5"
            ></progress>
            <span className="font-bold">{item?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewProgressBar;
