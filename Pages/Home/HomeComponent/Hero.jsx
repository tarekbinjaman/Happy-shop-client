import React from 'react';

const Hero = () => {
    return (
        <div className='bg-[#f2f0f1]'>
            <h1>This is hero</h1>
            <div>
                {/* text area */}
                <h1 style={{ fontFamily: 'Integral CF', lineHeight: '42px', letterSpacing: '2px' }}
                    className='text-5xl font-extrabold'
                >FIND CLOTHES <br />
                    THAT MATCHES <br />
                    YOUR STYLE</h1>
                <p className='text-md font-semibold text-gray-400'>Browse through our diverse range of meticulously crafted garments. designed <br />
                    to bring out your individuality and cater to your sense of style.</p>
                <button className='text-sm text-white bg-black px-8 py-3 rounded-3xl'>Shop now</button>
                <div>
                    {/* here will be a count up */}
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Hero;