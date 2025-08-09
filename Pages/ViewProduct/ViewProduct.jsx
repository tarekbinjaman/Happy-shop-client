import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../api/useProducts';

const ViewProduct = () => {
    const {productId } = useParams();
    const [products] = useProducts();
    const singleProduct = products.find(items => items?._id === productId);
    console.log('This is product in single page', singleProduct)
    return (
        <div className='w-11/12 mx-auto'>
            <h1>This is product page</h1>
        </div>
    );
};

export default ViewProduct;