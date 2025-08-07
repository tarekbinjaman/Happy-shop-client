import useProducts from "../../../api/useProducts";
import ProductsCard from "../../Products/ProductsCard";
import product2 from "./Product2";
const TopSelling = () => {
    const product = useProducts();
    const data = product[0].sort(() => 0.5 - Math.random()).slice(0, 4)
    return (
        <div className='mt-12'>
            <h1 style={{ fontFamily: 'Integral CF' }} className='text-4xl text-center'>Top Selling</h1>
            <div className='flex justify-center'>
                <div className='grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-2 md:gap-x-20 lg:gap-x-5 gap-x-2 gap-y-8 justify-center mt-18'>
                    {
                        data.map((product, index) => (
                            <ProductsCard product={product} key={index} />
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center mt-12'>
                <button className='bg-white px-12 py-2 border rounded-4xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 ease-in-out'>View all</button>
            </div>
            <div className='w-11/12 mx-auto mt-10'>
                <div className='divider'></div>
            </div>
        </div>
    );
};

export default TopSelling;