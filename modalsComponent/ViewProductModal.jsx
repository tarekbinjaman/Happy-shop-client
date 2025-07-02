import React, { useState } from 'react';
import useProducts from '../api/useProducts';
import { div, img } from 'framer-motion/client';

const ViewProductModal = ({id}) => {
    const [allProducts, isLoading, productRefetch] = useProducts();
    const [showImage, setShowImage] = useState(null);
    if (isLoading) {
        <div>Product is loading...</div>
    }
    const productData = allProducts?.products;
    const viewProduct = productData.find(item => item?._id === id);
    const imageContainer1 = viewProduct?.images;
    return (
        <div>
            <h1>This is product modal</h1>
            <div>
                <div>
                    {/* all images */}
                    {
                        imageContainer1.map((img, index) => (
                            <img src={img?.url} alt=""
                            onClick={() => {setShowImage(img?.url)}}
                            className='w-[80px] h-[90px] object-cover'
                            />
                        ))
                    }
                </div>
                <div>
                    {/* single images */}
                    <img src={showImage}
                    className='w-[200px]'
                    alt="" />
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;