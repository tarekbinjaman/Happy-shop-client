import React, { useEffect, useState } from 'react';
import useProducts from '../api/useProducts';
import { div, img, view } from 'framer-motion/client';

const ViewProductModal = ({ id }) => {
    const [allProducts, isLoading, productRefetch] = useProducts();
    if (isLoading) {
        <div>Product is loading...</div>
    }
    // const productData = allProducts?.products;
    const viewProduct = allProducts.find(item => item?._id === id);
    const imageContainer1 = viewProduct?.images;
    const firstImage = imageContainer1[0]?.url
    console.log('view product', viewProduct)
    const [showImage, setShowImage] = useState(null);
    useEffect(() => {
        setShowImage(firstImage)
    }, [id])
    const fhis = [];
    console.log('fhis length', fhis.length)
    return (
        <div>
            <div className={`flex gap-2 ${imageContainer1.length >= 1 ? 'gap-4 justify-center' : ''}`}>
                {/* image area */}
                <div className={`flex gap-2`}>
                    {imageContainer1.length > 1 && (

                        <div className='h-[422px] w-[140px] flex flex-col overflow-y-auto space-y-2.5'>
                            {/* all images */}
                            {
                                imageContainer1.map((img, index) => (
                                    <img src={img?.url} alt=""
                                        onClick={() => { setShowImage(img?.url) }}
                                        className={`w-full h-[133px] object-cover rounded-md
                                ${showImage === img?.url ? 'border-2 border-blue-500 rounded-md' : ''}
                                `}
                                    />
                                ))
                            }
                        </div>
                    )}
                    <div className='h-[422px]'>
                        {/* single images */}
                        <img src={showImage}
                            className='w-[400px] h-full object-cover rounded-md'
                            alt="" />
                    </div>
                </div>
                {/* text area */}
                <div>
                    <div className='flex flex-col space-y-2' >
                        <div>
                            <h1 className='text-4xl font-bold uppercase'>{viewProduct?.title}</h1>
                            <div className='flex items-center gap-3'>
                                <div class="grid place-items-start overflow-x-scroll rounded-lg lg:overflow-visible my-2">
                                    <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="w-6 h-6 text-yellow-500 cursor-pointer">
                                        <path fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"></path>
                                    </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-6 h-6 text-yellow-500 cursor-pointer">
                                        <path fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"></path>
                                    </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-6 h-6 text-yellow-500 cursor-pointer">
                                        <path fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"></path>
                                    </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-6 h-6 text-yellow-500 cursor-pointer">
                                        <path fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"></path>
                                    </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="w-6 h-6 cursor-pointer text-blue-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                        </path>
                                    </svg></span></div>
                                </div>
                                <div>
                                    <p className='text-xl font-semibold'>{viewProduct?.rating}/5</p>
                                </div>
                            </div>
                        </div>
                        {/* price area */}
                        <div className='flex gap-4 items-center'>
                            <span className='text-3xl font-bold'>${viewProduct?.finalPrice}</span>
                            <span className='line-through text-gray-400 text-3xl font-semibold '>{viewProduct.price}</span>
                            <span className='text-md bg-red-200 px-3 py-1 rounded-2xl font-semibold text-red-500'>-{viewProduct?.discount}%</span>
                        </div>
                        <div>
                            {/* description */}
                            <p>{viewProduct?.description.slice(0, 40)}...</p>
                            <div className='flex items-center gap-4 mt-2'>
                        <div>
                            <p className='text-xl font-bold text-gray-400'>Brand</p>
                            <p>{viewProduct?.brand}</p>
                        </div>
                        <div>
                            <p className='text-xl font-bold text-gray-400'>Fit Type</p>
                            <p>{viewProduct?.fitType}</p>
                        </div>
                        <div>
                            <p className='text-xl font-bold text-gray-400'>Materials</p>
                            <p>{viewProduct?.materials}</p>
                        </div>
                            </div>
                        </div>
                        <div>
                            {/* colors */}
                            <p className='text-md text-gray-400 mb-4'>Colors</p>
                            <div className='flex gap-4'>
                                {
                                    viewProduct?.color.map((col, index) => (
                                        <div
                                            style={{ background: col }}
                                            className={` p-4 w-[20px] rounded-full border border-black`} key={index}>

                                        </div>
                                    ))
                                }
                            </div>
                            <div className='divider'></div>
                        </div>
                        <div>
                            {/* colors */}
                            <p className='text-md text-gray-400 mb-4'>Available size</p>
                            <div className='flex gap-4'>
                                {
                                    viewProduct?.size.map((siz, index) => (
                                        <p className='text-md font-medium bg-gray-300 px-3 py-1 rounded-2xl'>{siz}</p>
                                    ))
                                }
                            </div>
                            <div className='divider'></div>
                            <button className='btn bg-black w-full text-white hover:bg-black/90'>View in Product page</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;