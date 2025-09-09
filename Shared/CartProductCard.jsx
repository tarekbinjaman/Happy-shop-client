import React from 'react';

const CartProductCard = ({image, title, description}) => {
    return (
        <div className='border rounded-md m-4'>
            <div className='flex items-start justify-between'>
            <div>
                <img className='w-[100px]' src={image} alt="" />
            </div>
            <div className='flex flex-col justify-between border h-[70px]'>
                <h1 className=''>{title}</h1>
                <h1 className='text-sm flex-1'>{description?.split("").slice(0, 20).join("")}</h1>
            </div>
            </div>
        </div>
    );
};

export default CartProductCard;