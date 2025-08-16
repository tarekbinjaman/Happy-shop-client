import React from 'react';
import useProducts from '../../api/useProducts';

const ProductDetails = ({id}) => {
    const product = useProducts();
    const item = product[0].find(item => item?._id === id);
    console.log('Item', item)
    return (
        <div className='flex justify-between mt-4'>
            <div className='w-[350px]'>
                <h1 className='uppercase font-bold mb-3'>Description</h1>
                <p>{item?.description}</p>
            </div>
            <div  className='w-[350px] flex justify-center'>
                <div>
                <h1 className='uppercase font-bold mb-3'>Fit & Features</h1>
                <ul className="list-disc pl-5 space-y-1 marker:text-black">
                <li>Fit type: {item?.fitType}</li>
                <li>Gender: {item?.gender}</li>
                <li>Category: {item?.category}</li>
                </ul>
                </div>
            </div>
            <div className='w-[350px] flex justify-end'>
                <div className=''>
                <h1 className='uppercase font-bold mb-3'>Fabric and Care</h1>
                <p>Available size:</p>
                <div className='flex gap-2'>
                    {
                        item?.size.map((siz, index) => (
                            <p>{siz}{item?.size.length - 1 === index ? '' : ','}</p>
                        ))
                    }
                </div>
                <p>Materials: {item?.materials}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;