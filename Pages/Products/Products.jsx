import React, { useEffect, useState } from 'react';
import DualRangeSlider from './ProductComponent/DualRangeSlider ';
import useProducts from '../../api/useProducts';
import { p } from 'framer-motion/client';
import { RiProhibited2Line } from 'react-icons/ri';
import { HiEmojiSad } from 'react-icons/hi';

const Products = () => {
    const [filters, setFilters] = useState({
        gender: '',
        brands: [],
        fitType: [],
        materials: [],
        minPrice: '',
        maxPrice: ''
    })
    const [priceRange, setPriceRange] = useState([0, 2000]);
    
    
    const handleCheckBoxChange = (filterType, value) => {
        setFilters(prv => {
            const updated = prv[filterType].includes(value)
            ? prv[filterType].filter(v => v !== value)
            : [...prv[filterType], value];
            
            return {... prv, [filterType]: updated}
        })
    }
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
        }))
    },[priceRange])
    const filterParams = {
        gender: filters.gender,
        brands: filters.brands.join(','),
        fitType: filters.fitType.join(','),
        materials: filters.materials.join(','),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
    }
    const [products, isLoading, refetch] = useProducts(filterParams);
    console.log('ALl products', products)
    return (
        <div>
            <div className='flex'>
                <aside className='w-2/11 border-r'>
                <h1>This is sidebar of all Products</h1>
                <DualRangeSlider values={priceRange} setValues={setPriceRange} refetch={refetch} />
                <h2 className='font-bold mb-2'>Brands</h2>
                <div className='flex flex-col'>
                <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'gucci')} /> Gucci</label>
                <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'puma')} /> Puma</label>
                <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'calvin_klein')} /> Calvin Klein</label>
                <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'garments')} /> Garments</label>
                <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'others')} /> Others</label>
                </div>
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