import React from 'react';
import useProducts from '../../api/useProducts';
import { div } from 'framer-motion/client';
import { FaEye } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { TiDelete } from 'react-icons/ti';

const AllProduct = () => {
    const [allProducts, isLoading, productRefetch] = useProducts();
    console.log("All products", allProducts);
    const productdata = allProducts?.products;
    console.log("products data", productdata);
    if(isLoading) {
        return <p>Produt is loading....</p>
    }
    return (
        <div className='w-full border border-black'>
            <h1>This is all Product page. <br /> Toatal products ({productdata?.length})</h1>
            <div className='w-full max-w-7xl border border-black'>

            
            <ul className=" bg-base-100 shadow-md w-[800px] ">
                {productdata.map((product, index) => (
                    
                      <li className="flex gap-2 justify-between w-full mb-2">
    
    <div className='flex gap-4 items-center'>
        <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
        <img className="size-20 object-cover rounded-box" src={product?.images[0]}/>        
    <div className="">
      <div className='text-xl'>{product?.title}</div>
      <div className="text-sm font-semibold opacity-60">{product?.description?.slice(0, 15)}</div>
    </div>
        </div>
    <div className='flex gap-6 items-center text-3xl'>
                    {/* Icons view > edit > delete */}
                    <FaEye className='cursor-pointer hover:opacity-50' />
                    <CiEdit className='cursor-pointer hover:opacity-50' />
                    <TiDelete className='cursor-pointer hover:opacity-50' />
    </div>
  </li>
                ))}
</ul>
    </div>
      </div>
    );
};

export default AllProduct;