import React, { useEffect, useState } from 'react';
import DualRangeSlider from './ProductComponent/DualRangeSlider ';
import useProducts from '../../api/useProducts';
import { p } from 'framer-motion/client';
import { RiProhibited2Line } from 'react-icons/ri';
import { HiEmojiSad } from 'react-icons/hi';

const Products = () => {
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [products, isLoading, refetch] = useProducts(priceRange[0], priceRange[1]);
    useEffect(() => {
        const [minPrice, maxPrice] = Array.isArray(priceRange) ? priceRange : [0, 2000]
    },[priceRange])
    console.log('ALl products', products)
    return (
        <div>
            <div className='flex'>
                <aside className='w-2/11 border-r'>
                <h1>This is sidebar of all Products</h1>
                <DualRangeSlider values={priceRange} setValues={setPriceRange} refetch={refetch} />
                </aside>
                <section className='w-9/11 p-4'>
                <h1>This is all product area</h1>
                {
                    isLoading ? <p>Product is Loading...</p> :
                    products.length === 0 ? <div className='flex justify-center'>
                        <p className='flex flex-col-reverse gap-2 text-4xl items-center font-bold'>No product found! <span className='text-6xl'>😔</span>
                        </p></div> 
                    :
                    products.map(product => (
                        <p>{product.title}</p>
                    ))
                }
                </section>
            </div>
        </div>
    );
};

export default Products;