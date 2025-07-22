import React, { useEffect, useState } from 'react';
import DualRangeSlider from './ProductComponent/DualRangeSlider ';
import useProducts from '../../api/useProducts';

const Products = () => {
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [products, isLoading] = useProducts(priceRange[0], priceRange[1]);
    useEffect(() => {
        const [minPrice, maxPrice] = Array.isArray(priceRange) ? priceRange : [0, 2000]
    },[priceRange])
    console.log('ALl products', products)
    return (
        <div>
            <h1>All product page</h1>
            <div className='flex'>
                <aside className='w-2/11 border-r'>
                <h1>This is sidebar of all Products</h1>
                <DualRangeSlider values={priceRange} setValues={setPriceRange} />
                </aside>
                <section className='w-9/11 p-4'>
                <h1>This is all product area</h1>
                </section>
            </div>
        </div>
    );
};

export default Products;