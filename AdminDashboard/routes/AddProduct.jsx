import axios from 'axios';
import { div, img } from 'framer-motion/client';
import { image } from 'framer-motion/m';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoDash } from 'react-icons/go';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const imgbbApiKey = import.meta.env.VITE_imgbbApiKey; // imgbb api key

    const handleImageUpload = async (files) => {
        setUploading(true);
        setErrorMsg('');
        const urls = [...imageUrls];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
                urls.push(response.data.data.url);
                console.log(urls)
            }
            setImageUrls(urls);
        } catch (error) {
            setErrorMsg('Image upload failed. Please try again')
        } finally {
            setUploading(false);
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
                        {...register('title', { required: 'Title required' })}
                        placeholder="Product Title"
                        className='w-full border p-2 rounded'
                    />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div className='form-control'>
                    <textarea
                        {...register('description', { required: 'Product description required' })}
                        placeholder='Prouduct description'
                        className='w-full border p-2 rounded'
                    />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                <div className='form-control'>
                    <input
                        {...register('price', { required: 'Price is required' })}
                        placeholder='Price'
                        className='w-full border p-2 rounded'
                    />
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                </div>
                <div className="form-control">
                    <label className="block font-semibold mb-2">Upload Product Images (Max: 4)</label>

                    {/* Styled upload area */}
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center hover:border-blue-500 transition duration-300">
                        <div className="flex flex-col items-center space-y-2">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 16l4-4a1 1 0 011.414 0L12 15l4.586-4.586A2 2 0 0118 11h0a2 2 0 012 2v5H3v-2z"
                                />
                            </svg>

                            <span className="text-sm text-gray-500">Click below to select images</span>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                id="imageUpload"
                                onChange={(e) => handleImageUpload(e.target.files)}
                                className="hidden"
                            />

                            {/* Trigger label as button */}
                            <label
                                htmlFor="imageUpload"
                                className="bg-gray-200 px-4 py-2 text-sm rounded cursor-pointer hover:bg-gray-300"
                            >
                                Select Images
                            </label>
                        </div>
                    </div>

                    {/* Uploading message */}
                    {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
                    {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

                    {/* Image preview */}
                    {imageUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {imageUrls.map((url, i) => (
                                <div key={i} className='relative'>
                                    <button
                                    onClick={() => {
                                        const updateImages = imageUrls.filter((_, index) => index !== i);
                                        setImageUrls(updateImages)
                                    }}
                                    className='bg-white p-1 mt-1 absolute rounded-full left-64 hover:bg-gray-300 cursor-pointer'
                                    >
                                        <GoDash />
                                    </button>
                                    <img
                                        src={url}
                                        alt={`preview-${i}`}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
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