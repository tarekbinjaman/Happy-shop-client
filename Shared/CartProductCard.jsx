import React from 'react';
import { IoTrashBin } from 'react-icons/io5';

const CartProductCard = ({image, color, title, description, size}) => {
    return (
        <div className='border border-slate-400 rounded-md'>
            <div className='flex justify-between h-[140px] p-3'>
            <div className='border border-slate-300 rounded-md'>
                <img className='w-[90px] h-full' src={image} alt="" />
            </div>
            <div className='flex flex-col justify-between h-full'>
                <p className='font-bold'>{title.slice(0, 25)}</p>
                <p className='text-sm'>{description?.split("").slice(0, 20).join("")}</p>
                <div>
                <p>Color: <span style={{background: color}} className={`px-2 border ml-2`}></span>{}</p>
                <div className='flex justify-between'>
                <p>Size: <span className='text-gray-600'>{size}</span></p>
                <IoTrashBin className='text-2xl mr-2 mb-2' title='Remove' />
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CartProductCard;