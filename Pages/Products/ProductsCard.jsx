import React from 'react';
import { Link } from 'react-router-dom';

const ProductsCard = ({ product }) => {
    console.log('This is a single product product', product)
    const rating = product.rating || 0;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    return (
        <div className='bg-[#F2F0F1] max-w-4xl h-[346px] w-[280px] rounded-2xl relative'>
            <span className='text-sm rounded-xl px-1 py-1 bg-white  font-semibold text-red-500 absolute top-2 right-2'>-{product?.discount}%</span>
            <div className='flex justify-center'>
            <div className='w-[270px] h-[260px]'>
                <img src={product.images[0].url} className='w-full h-full object-fill' alt="" />
            </div>
            </div>
            <div className='flex justify-center'>
            <div className='flex items-center justify-between bg-white rounded-xl p-2 w-[270px]'>
            <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-sm mt-2'>{product.title}</h1>

            {/* rating */}
            <div className="flex items-center space-x-1 mt-1">
                {[...Array(filledStars)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400">☆</span>}
                {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="ml-2 text-sm text-gray-600">({rating})</span>
            </div>

            </div>

            {/* price */}
            <div className='flex flex-col gap-y-0 justify-end'>
            <p className='font-semibold text-xl flex gap-2 items-center'>{product?.finalPrice} $
                    </p>
            <Link className='text-end bg-[#e4dede] px-2 py-0.5 rounded-md hover:border-gray-400 border border-white transition-all duration-300 mt-1'>View</Link>
            </div>
            </div>
            </div>
        </div>
    );
};

export default ProductsCard;