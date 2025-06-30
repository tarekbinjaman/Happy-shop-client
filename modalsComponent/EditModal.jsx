import React from 'react';
import useProducts from '../api/useProducts';

const EditModal = ({id}) => {
    const [allProducts, isLoading, productRefetch] = useProducts();
    if (isLoading) {
        return <p>Produt is loading....</p>
    };
    const productdata = allProducts?.products || [];
    const editProductData = productdata.find(item => item._id === id)
    return (
        <div>
            <h1>{editProductData.title}</h1>
        </div>
    );
};

export default EditModal;