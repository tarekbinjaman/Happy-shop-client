import React, { useEffect, useState } from 'react';
import DualRangeSlider from './ProductComponent/DualRangeSlider ';
import useProducts from '../../api/useProducts';
import { p } from 'framer-motion/client';
import { RiProhibited2Line } from 'react-icons/ri';
import { HiEmojiSad } from 'react-icons/hi';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductsCard from './ProductsCard';

const Products = () => {
    const { categoryName } = useParams();
    console.log('This is category name', categoryName)
    const [filters, setFilters] = useState({
        gender: '',
        brand: [],
        fitType: [],
        materials: [],
        minPrice: '',
        maxPrice: '',
        category: categoryName
    })
    const [priceRange, setPriceRange] = useState([0, 2000]);


    const handleCheckBoxChange = (filterType, value) => {
        setFilters(prv => {
            const updated = prv[filterType].includes(value)
                ? prv[filterType].filter(v => v !== value)
                : [...prv[filterType], value];

            return { ...prv, [filterType]: updated }
        })
    }
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
        }))
    }, [priceRange])
    const filterParams = {
        gender: filters.gender,
        brand: filters.brand.join(','),
        fitType: filters.fitType.join(','),
        materials: filters.materials.join(','),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        ...(categoryName && categoryName !== "newArrival" && { category: categoryName })
    }
    const [products, isLoading, refetch] = useProducts(filterParams);
    console.log('ALl products', products)
    return (
        <div>
            <div className='flex'>
                <aside className='w-1/7'>
                    <div className='border border-gray-400 m-4 p-2 rounded-2xl'>
                        <DualRangeSlider values={priceRange} setValues={setPriceRange} refetch={refetch} />
                        <h2 className='font-bold mb-2'>Brands</h2>
                        <div className='flex flex-col'>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'Gucci')} /> Gucci</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'Puma')} /> Puma</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'Calvin Klein')} /> Calvin Klein</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'Garments')} /> Garments</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('brand', 'Others')} /> Others</label>
                        </div>
                        {/* gender checkbox */}
                        {
                            !categoryName
                            &&
                            <div>
                                <h2 className='font-bold mb-2 mt-2'>Gender</h2>
                                <div className='flex flex-col'>
                                    <label><input type="checkbox" onChange={() => handleCheckBoxChange('gender', 'Men')} /> Men</label>
                                    <label><input type="checkbox" onChange={() => handleCheckBoxChange('gender', 'Women')} /> Women</label>
                                    <label><input type="checkbox" onChange={() => handleCheckBoxChange('gender', 'Boys')} /> Boys</label>
                                    <label><input type="checkbox" onChange={() => handleCheckBoxChange('gender', 'Girls')} /> Girls</label>
                                    <label><input type="checkbox" onChange={() => handleCheckBoxChange('gender', 'Babies')} /> Babies</label>
                                </div>
                            </div>
                        }

                        <h2 className='font-bold mb-2 mt-2'>Fit type</h2>
                        <div className='flex flex-col'>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('fitType', 'Fitted')} /> Fitted</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('fitType', 'Loose')} /> Loose</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('fitType', 'Straight')} /> Straight</label>
                        </div>
                        <h2 className='font-bold mb-2 mt-2'>Materials</h2>
                        <div className='flex flex-col mb-4'>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Polyster')} /> Polyster</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Nylon')} /> Nylon</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Cotton')} /> Cotton</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Acrylic')} /> Acrylic</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Cashmere')} /> Cashmere</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Lotex')} /> Lotex</label>
                            <label><input type="checkbox" onChange={() => handleCheckBoxChange('materials', 'Leather')} /> Leather</label>
                        </div>
                    </div>
                </aside>
                <section className='w-6/7 p-4'>
                    {
                        isLoading ? <div className='flex justify-center items-center'><span className="loading loading-ring loading-xl"></span></div> :
                            products.length === 0 ? <div className='flex justify-center'>
                                <p className='flex flex-col-reverse gap-2 text-4xl items-center font-bold'>No product found! <span className='text-6xl'>😔</span>
                                </p></div>
                                :
                                <div className='flex justify-center'>
                                    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8'>
                                        {
                                            categoryName === "newArrival" ? 
                                                products.slice(-10).map((product, index) => (
                                                    <ProductsCard product={product} key={index} />
                                                ))
                                            
                                                :
                                            products.map((product, index) => (
                                                <ProductsCard product={product} key={index} />
                                            ))
                                        }
                                        
                                        

                                    </div>
                                </div>
                    }
                </section>
            </div>
        </div>
    );
};

export default Products;