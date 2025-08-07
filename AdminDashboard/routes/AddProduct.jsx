import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoDash } from 'react-icons/go';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [colorInput, setColorInputs] = useState(['#000000']); // defalut color
    const [size, setSize] = useState([]);

    //cloudinary configuration 
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // images to preview
    const images = imageUrls.url;

    const handleAddSize = () => {
        if (size.length < 5) {
            setSize([...size, '']);
        } else {
            toast.warning('Max 5 size')
        }
    };

    const handleSizeChange = (index, value) => {
        const updated = [...size];
        updated[index] = value;
        setSize(updated);
    };

    const handleRemoveSize = (index) => {
        const updated = [...size];
        updated.splice(index, 1);
        setSize(updated)
    };

    const handleAddColor = () => {
        if (colorInput.length < 4) {
            setColorInputs([...colorInput, '#000000']);
        } else {
            toast.warning('Max 4 colors');
        }
    };

    const handleColorChange = (index, value) => {
        const updated = [...colorInput];
        updated[index] = value;
        setColorInputs(updated);
    }

    const handleImageUpload = async (files) => {
        if (imageUrls.length >= 3) {
            toast.error('You can upload a maximum of 4 images')
            setErrorMsg('You can upload a maximum of 4 images')
            return;
        }
        console.log("Files", files)
        setUploading(true);
        setErrorMsg('');
        const urls = [...imageUrls];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', uploadPreset);
                console.log('Form data', formData)
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
                urls.push({
                    url: response.data.secure_url,
                    public_id: response.data.public_id, // needed for delete
                });


            }
            setImageUrls(urls);
        } catch (error) {
            setErrorMsg('Image upload failed. Please try again. Try to upload one after another')
        } finally {
            setUploading(false);
            console.log("Urls here:", imageUrls);
            console.log('Images', images);
        }
    };

    const deleteImage = async (index) => {
        const imageToDelete = imageUrls[index];
        // remove from local state
        const updateImages = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updateImages);
        try {
            // delete from imageBB serve
            await axios.post('http://localhost:5000/api/delete-image', {
                public_id: imageToDelete.public_id
            });

        } catch (error) {
            console.error("Delete failed:", error);
            setErrorMsg('Failed to delete image from server');
        }
    };

    const onsubmit = async (data) => {
        if (imageUrls.length === 0) {
            setErrorMsg('Please upload product images first');
            return;
        }
        const { price, discount } = data;
        const finalPrice = Math.floor(price - (price * (discount / 100)));
        console.log('add product image fileld', imageUrls)
        const fullData = {
            ...data,
            images: imageUrls,
            color: colorInput,
            finalPrice: finalPrice,
            size: size
        };
        console.log("Final Product Data", fullData);
        // from here you will send data to backend
        try {
            const res = await axios.post('http://localhost:5000/api/products', fullData)
            toast.success("Product added");
            reset();
            setImageUrls([]);
            setSize([]);
            setColorInputs([]);
        } catch (error) {
            console.error("Add product error", error)
            toast.error("Product add failed")
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='rounded-2xl  shadow-md border-t-4 border-blue-400 lg:w-7xl  shadow-blue-500/50'>
                <h1 className='pl-6 pt-4 text-xl font-bold'>Add Poduct </h1>
                <form onSubmit={handleSubmit(onsubmit)} className=' p-6 bg-white rounded-xl shadow space-y-6 lg:w-7xl md:w-[500px] '>
                    <div className=''>
                        {/* main div */}

                        <div>
                            {/* first div */}

                            <div className='form-control'>
                                <label className='font-semibold block mb-2'>Title</label>
                                <input
                                    {...register('title', { required: 'Title required' })}
                                    placeholder="Product Title"
                                    className='w-full border-2 border-blue-300 p-2 rounded-md'
                                />
                                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                            </div>
                            <div className='form-control'>
                                <label className='font-semibold block mb-2'>Description</label>
                                <textarea
                                    {...register('description', { required: 'Product description required' })}
                                    placeholder='Prouduct description'
                                    className='w-full border-2 border-blue-300 p-2 rounded-md'
                                />
                                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                            </div>
                            <div className='flex justify-between gap-1'>
                                <div className='form-control w-full'>
                                    <label className='font-semibold block mb-2'>Price</label>
                                    <input
                                        {...register('price', { required: 'Price is required' })}
                                        placeholder='Price'
                                        className='w-full border-2 border-blue-300 p-2 rounded-md'
                                    />
                                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                                </div>
                                <div className='form-control w-full'>
                                    <label className='font-semibold block mb-2'>Discount</label>
                                    <input
                                        type='number'
                                        {...register('discount')}
                                        placeholder='Discount %'
                                        className='w-full border-2 border-blue-300 p-2 rounded-md'
                                    />
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <label className='font-semibold block mb-2'>Available size</label>
                                <div className=''>
                                    <select
                                        className='border-2 p-1 border-blue-300'
                                        value=""
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value && !size.includes(value)) {
                                                setSize([...size, value]);
                                            } else if (size.includes(value)) {
                                                toast.info("Size already added")
                                            }
                                        }}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="X-Large">X-Large</option>
                                        <option value="XX-Large">XX-Large</option>
                                    </select>
                                    <div className='md:grid md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2'>
                                        {size.map((SZ, index) => (
                                            <div key={index} className='flex items-center justify-between gap-3 border rounded bg-gray-100'>
                                                <span className='pl-1'>{SZ}</span>
                                                <button
                                                    type='button'
                                                    onClick={() => handleRemoveSize(index)}
                                                    className='text-white text-sm bg-red-500 px-2 py-1'
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                            <div className='flex gap-4 my-4 justify-between'>
                                {/* category */}
                                <div>
                                    <label className='font-semibold block mb-2'>Category</label>
                                    <select
                                        {...register('category', { required: 'Category is required' })}
                                        className='border-2 p-1 border-blue-300'
                                    >
                                        <option value="">Select Category</option>
                                        <option value="T-Shirt">T-shirt</option>
                                        <option value="Polo Shirt">Polo Shirt</option>
                                        <option value="Cuban Collar Shirt">Cuban Collar Shirt</option>
                                        <option value="Dress Shirt">Dress Shirt</option>
                                        <option value="Casual">Casual</option>
                                        <option value="Formal">Formal</option>
                                        <option value="Gym">Gym</option>
                                        <option value="V Neck">V Neck</option>
                                        <option value="Women Sweater">Women Sweater</option>
                                        <option value="A-Line">A-Line</option>
                                        <option value="Apron">Apron</option>
                                        <option value="Asymmetrical">Asymmetrical</option>
                                        <option value="Ball Gown">Ball Gown</option>
                                        <option value="Caftan">Caftan</option>
                                        <option value="One-Shoulder">One-Shoulder</option>
                                        <option value="Yoke Dress">Yoke Dress</option>
                                        <option value="Wrap Dress">Wrap Dress</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Party">Party</option>
                                        <option value="Shorts">Shorts</option>
                                        <option value="Overalls">Overalls</option>
                                        <option value="Hoodie">Hoodie</option>
                                        <option value="Sweatpants">Sweatpants</option>
                                        <option value="Dungarees">Dungarees</option>
                                        <option value="Bomber Jacket">Bomber Jacket</option>
                                        <option value="Basic-Boys">Basic-Boys</option>
                                        <option value="Frock">Frock</option>
                                        <option value="Skirt">Skirt</option>
                                        <option value="Leggings">Leggings</option>
                                        <option value="Gown">Gown</option>
                                        <option value="Rompers">Rompers</option>
                                        <option value="Jumpsuit">Jumpsuit</option>
                                        <option value="Dungarees">Dungarees</option>
                                        <option value="Tracksuit">Tracksuit</option>
                                    </select>
                                    {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                                </div>
                                {/* brand */}
                                <div>
                                    <label className='font-semibold block mb-2'>Brand</label>
                                    <select
                                        {...register('brand', { required: 'Brand Is required' })}
                                        className='border-2 p-1 border-blue-300'
                                    >
                                        <option value="">Select Brand</option>
                                        <option value="Gucci">Gucci</option>
                                        <option value="Puma">Puma</option>
                                        <option value="Calvin Klein">Calvin Klein</option>
                                        <option value="Garments">Garments</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
                                </div>

                                {/* fit type */}
                                <div>
                                    <label className='font-semibold block mb-2' >Fit type</label>
                                    <select
                                        {...register('fitType', { required: 'Fit type is required' })}
                                        className='border-2 p-1 border-blue-300'
                                    >
                                        <option value="">Select Fit type</option>
                                        <option value="Fitted">Fitted</option>
                                        <option value="Loose">Loose</option>
                                        <option value="Straight">Straight</option>
                                    </select>
                                    {errors.fitType && <p className='text-red-500'>{errors.fitType.message}</p>}
                                </div>

                                {/* Materials */}
                                <div>
                                    <label className='font-semibold block mb-2' >Materials</label>
                                    <select
                                        {...register('materials', { required: "Materials is required" })}
                                        className='border-2 p-1 border-blue-300'
                                    >
                                        <option value="">Select Materials</option>
                                        <option value="Polyster">Polyster</option>
                                        <option value="Cotton">Cotton</option>
                                        <option value="Nylon">Nylon</option>
                                        <option value="Acrylic">Acrylic</option>
                                        <option value="Cashmere">Cashmere</option>
                                        <option value="Latex">Latex</option>
                                        <option value="Leather">Leather</option>
                                    </select>
                                    {errors.materials && <p className='text-red-500'>{errors.materials.message}</p>}
                                </div>
                                {/* Gender */}
                                <div>
                                    <label className='font-semibold block mb-2'>Select Gender</label>
                                    <select
                                        {...register('gender', { required: 'Gender is required' })}
                                        className='border-2 p-1 border-blue-300'
                                    >
                                        <option value="">Gender</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Boys">Boys</option>
                                        <option value="Girls">Girls</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                    {errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
                                </div>

                            </div>
                        </div>

                        {/* here one */}
                        <div>
                            {/* second div */}


                            <div className="form-control">
                                <label className="block font-semibold mb-2">Upload Product Images (Max: 4)</label>

                                {/* Styled upload area */}
                                <div className={`border-2 border-dashed p-6 rounded-md text-center
                        ${isDragging ? 'border-gray-300' : 'border-blue-500 transition duration-300'}`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        handleImageUpload(e.dataTransfer.files)
                                    }}
                                >
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

                                        <span className="text-sm text-gray-500">Drag and drop images or click to upload</span>

                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            id="imageUpload"
                                            onChange={(e) => handleImageUpload(e.target.files)}
                                            className="hidden "
                                        />

                                        {/* Trigger label as button */}
                                        <label
                                            onClick={(e) => {
                                                if (imageUrls.length >= 3) {
                                                    e.preventDefault();
                                                    toast.error("You can upload a maximum of 3 images");
                                                    return;
                                                }
                                                document.getElementById("imageUpload").click(); // manually trigger
                                            }}
                                            className={`px-4 py-2 text-sm rounded 
                                        ${imageUrls.length >= 3
                                                    ? 'bg-red-400 text-white cursor-not-allowed'
                                                    : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'}
                                         `}
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
                                                        deleteImage(i);
                                                    }}
                                                    className='bg-white p-1 mt-1 absolute rounded-full left-60 hover:bg-gray-300 cursor-pointer'
                                                >
                                                    <GoDash className='font-bold' />
                                                </button>
                                                <img
                                                    src={url.url}
                                                    alt={`preview-${i}`}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className='from-control'>
                                <label className='font-semibold block mb-2'>Select available Colors</label>
                                <div className='flex flex-wrap gap-4 items-center mb-2'>
                                    {colorInput.map((color, index) => (
                                        <div key={index} className='relative inline-block'>
                                            <input
                                                key={index}
                                                type="color"
                                                value={color}
                                                onChange={(e) => handleColorChange(index, e.target.value)}
                                                className='w-10 h-10 p-1 rounded'
                                            />
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    const updated = [...colorInput];
                                                    updated.splice(index, 1);
                                                    setColorInputs(updated);
                                                }}
                                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full
                                w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600
                                '
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type='button'
                                        onClick={handleAddColor}
                                        className='btn btn-primary bg-blue-600'
                                    >
                                        + Add Color
                                    </button>
                                </div>
                            </div>


                            {/* to here */}
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 disabled:opacity-50 w-full'
                        disabled={uploading}
                    >
                        Submit Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;