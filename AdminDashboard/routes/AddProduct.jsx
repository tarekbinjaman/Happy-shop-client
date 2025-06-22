import axios from 'axios';
import { div, img } from 'framer-motion/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const imgbbApiKey = import.meta.env.VITE_imgbbApiKey; // imgbb api key

    const handleImageUpload = async (files) => {
        setUploading(true);
        setErrorMsg('');
        const urls = [];
        
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
                urls.push(response.data.data.url);
            }
            setImageUrls(urls);
        } catch (error) {
            setErrorMsg('Image upload failed. Please try again')
        } finally {
            setUploading (false);
        }
    };

    const onsubmit = async (data) => {
        if (imageUrls.length === 0) {
            setErrorMsg('Please upload product images first');
            return;
        }
        const fullData = {
            ...data,
            images: imageUrls,
        };
        console.log("Final Product Data", fullData);
        // from here you will send data to backend
    };

    return (
        <div className='border border-black'>
            <h1>Add Poduct </h1>
            <form onSubmit={handleSubmit(onsubmit)} className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6'>
            <div className='form-control'>
            <input 
            {...register('title', {required: 'Title required'})}
            placeholder="Product Title"
            className='w-full border p-2 rounded'
            />
            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
            </div>
            <div className='form-control'>
                <textarea
                {...register('description', {required: 'Product description required'})}
                placeholder='Prouduct description'
                className='w-full border p-2 rounded'
                />
            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            </div>
            <div className='form-control'>
                <input 
                {...register('price', {required: 'Price is required'})}
                placeholder='Price'
                className='w-full border p-2 rounded'
                />
                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
            </div>
            <div className='form-control'>
            <label className='block font-semibold'>Upload Product Images (Max: 4)</label>
            <input type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
            />
            {uploading && <p className='text-blue-500'>Uploading...</p>}
            {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
            {
                imageUrls.length > 0 && (
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                        {(imageUrls.map((url, i) => (
                            <img key={i} src={url} alt={`preview-${i}`} className='w-full h-32 object-cover rounded' />
                        )))}
                    </div>
                )
            }
            </div>
            <button
            type='submit'
            className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50'
            disabled={uploading}
            >
                Submit Product
            </button>
            </form>
        </div>
    );
};

export default AddProduct;