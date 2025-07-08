import product2 from "./Product2";
const TopSelling = () => {
    return (
        <div className='mt-12'>
            <h1 style={{ fontFamily: 'Integral CF' }} className='text-4xl text-center'>Top Selling</h1>
            <div className='flex justify-center'>
            <div className='grid grid-cols-4 gap-x-20 justify-center mt-18'>
                {
                    product2.map((product, index) => (
                        <div key={index} className=' w-[250px]'>
                            <img src={product?.images[0].url} alt="product imae"
                                className='bg-[#F8F8F8] w-full h-[270px] object-cover rounded-2xl mb-2'
                            />
                            <h1 className='font-bold'>{product?.title}</h1>
                            <div>
                                <div className='flex items-center gap-3'>
                                    <div class="grid place-items-start overflow-x-scroll rounded-lg lg:overflow-visible my-2">
                                        <div class="inline-flex items-center"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                            fill="currentColor" class="w-6 h-6 text-yellow-500 cursor-pointer">
                                            <path fill-rule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clip-rule="evenodd"></path>
                                        </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-6 h-6 text-yellow-500 cursor-pointer">
                                            <path fill-rule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clip-rule="evenodd"></path>
                                        </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-6 h-6 text-yellow-500 cursor-pointer">
                                            <path fill-rule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clip-rule="evenodd"></path>
                                        </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-6 h-6 text-yellow-500 cursor-pointer">
                                            <path fill-rule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clip-rule="evenodd"></path>
                                        </svg></span><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" class="w-6 h-6 cursor-pointer text-blue-gray-500">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                            </path>
                                        </svg></span></div>
                                    </div>
                                    <div>
                                        <p className='text-xl font-semibold'>0/5</p>
                                    </div>
                                </div>
                            </div>
                            <p className='font-bold'>${product?.price}</p>
                        </div>
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