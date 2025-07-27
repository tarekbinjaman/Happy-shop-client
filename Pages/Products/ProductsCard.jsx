import React from 'react';

const ProductsCard = ({ product }) => {
    console.log('This is a single product product', product)
    const rating = product.rating || 0;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    return (
        <div className=' max-w-4xl'>
            <div className='bg-[#F2F0F1] p-4 py-6 rounded-2xl'>
                <img src={product.images[0].url} className='w-[250px] h-[260px] object-fill' alt="" />
            </div>
            <h1 className='font-bold mt-2'>{product.title}</h1>

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

            {/* price */}
            <p className='font-semibold text-2xl'>{product.finalPrice} $</p>
        </div>
    );
};

export default ProductsCard;