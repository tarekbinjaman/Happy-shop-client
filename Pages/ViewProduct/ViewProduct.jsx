import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../api/useProducts';

const ViewProduct = () => {
    const { productId } = useParams();
    const [products] = useProducts();
    const [showImage, setShowImage] = useState(null);
    const singleProduct = products.find(items => items?._id === productId);
    const imageContainer = singleProduct?.images;
    const firstImage = imageContainer[0]?.url;
    const filledStars = Math.floor(singleProduct?.rating);
    const hasHalfStar = singleProduct?.rating >= 0.5;
    useEffect(() => {
        setShowImage(firstImage)
    }, [productId])
    console.log('This is product in single page', imageContainer)
    return (
        <div className='w-11/12 mx-auto'>
            <div className={`flex gap-2`}>
                {/* image area */}
                <div className='flex gap-2'>
                    {
                        imageContainer.length > 1 && (

                            <div className='h-[422px] w-[140px] flex flex-col overflow-y-auto space-y-2.5'>
                                {/* all images */}
                                {
                                    imageContainer.map((img, index) => (
                                        <img src={img?.url} alt=""
                                            onClick={() => { setShowImage(img?.url) }}
                                            className={`w-full h-[133px] object-cover rounded-md
                                        ${showImage === img?.url ? 'border-2 border-blue-500 rounded-md' : ''}
                                            `}
                                        />
                                    ))
                                }

                            </div>
                        )
                    }
                    <div className='h-[422px]'>
                        <img src={showImage} alt=""
                            className='w-[400px] h-full object-cover rounded-md'
                        />
                    </div>
                </div>
                {/* text area */}
                <div>
                    <div className='flex flex-col space-y-2'>
                        <h1 className='text-4xl font-bold uppercase'>{singleProduct?.title}</h1>
                        {/* rating */}
                        <div className="flex items-center space-x-1 mt-1">
                            {[...Array(filledStars)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-2xl">★</span>
                            ))}
                            {hasHalfStar && <span className="text-yellow-400">☆</span>}
                            {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                                <span key={i} className="text-gray-300 text-2xl">★</span>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">({singleProduct?.rating})</span>
                        </div>
                        {/* price area */}
                        <div className='flex gap-4 items-center'>
                            <span className='text-3xl font-bold'>${singleProduct?.finalPrice}</span>
                            <span className='line-through text-gray-400 text-3xl font-semibold '>{singleProduct.price}</span>
                            <span className='text-md bg-red-200 px-3 py-1 rounded-2xl font-semibold text-red-500'>-{singleProduct?.discount}%</span>
                        </div>
                        <div>
                            {/* description */}
                            <p>{singleProduct?.description.slice(0, 40)}...</p>
                            <div className='flex items-center gap-4 mt-2'>
                                <div>
                                    <p className='text-xl font-bold text-gray-400'>Brand</p>
                                    <p>{singleProduct?.brand}</p>
                                </div>
                                <div>
                                    <p className='text-xl font-bold text-gray-400'>Fit Type</p>
                                    <p>{singleProduct?.fitType}</p>
                                </div>
                                <div>
                                    <p className='text-xl font-bold text-gray-400'>Materials</p>
                                    <p>{singleProduct?.materials}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* colors */}
                            <p className='text-md text-gray-400 mb-4'>Colors</p>
                            <div className='flex gap-4'>
                                {
                                    singleProduct?.color.map((col, index) => (
                                        <div
                                            style={{ background: col }}
                                            className={` p-4 w-[20px] rounded-full border border-black`} key={index}>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            {/* colors */}
                            <p className='text-md text-gray-400 mb-4'>Available size</p>
                            <div className='flex gap-4'>
                                {
                                    singleProduct?.size.map((siz, index) => (
                                        <p className='text-md font-medium bg-gray-300 px-3 py-1 rounded-2xl'>{siz}</p>
                                    ))
                                }
                            </div>
                            <div className='divider'></div>
                             </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;