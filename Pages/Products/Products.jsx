import React from 'react';
import DualRangeSlider from './ProductComponent/DualRangeSlider ';

const Products = () => {
    return (
        <div>
            <h1>All product page</h1>
            <div className='flex'>
                <aside className='w-1/8 border-r'>
                <h1>This is sidebar of all Products</h1>
                <DualRangeSlider />
                </aside>
                <section className='w-7/8 p-4'>
                <h1>This is all product area</h1>
                </section>
            </div>
        </div>
    );
};

export default Products;