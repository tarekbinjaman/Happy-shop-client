import { Link } from 'react-router-dom';
import useProducts from '../../../../api/useProducts';
import ProductsCard from '../../Products/ProductsCard';
import products from './Product';

const NewArrival = () => {
    const product = useProducts();
    const data = product[0].slice(-4);
    console.log('This is homepage product Data:', data)
    return (
        <div>
            <h1 style={{ fontFamily: 'Integral CF' }} className='text-4xl text-center'>New Arrivals</h1>
            <div className='flex justify-center'>
                <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-x-10 lg:gap-x-5 gap-x-2 gap-y-8 justify-center mt-18'>
                    {
                        data.map((product, index) => (
                            <ProductsCard product={product} key={index} />
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center mt-12'>
                <Link to={'/productsList/newArrival'}><button className='bg-white px-12 py-2 border rounded-4xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 ease-in-out'>View all</button></Link>
            </div>
            <div className='w-11/12 mx-auto mt-10'>
                <div className='divider'></div>
            </div>
        </div>
    );
};

export default NewArrival;