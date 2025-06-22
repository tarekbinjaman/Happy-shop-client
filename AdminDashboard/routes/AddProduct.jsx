import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const {register, handlesubmit, formstate: {errors}} = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const imgbbApiKey = 'a6dfbfb78f386d6ccb1ebdc2a79d3e58'; // imgbb api key

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
        </div>
    );
};

export default AddProduct;