import './DualSlider.css'
import React, { useState } from 'react';
import Slider from 'react-slider'

const DualRangeSlider = ({values, setValues}) => {
    const Min = 0;
    const Max = 2000;

    const [tempValues, setTempValues] = useState(values);

    // const handleChange = ([newMin, newMax]) => {
    //     const min = Math.min(newMin, values[1] - 50);
    //     const max = Math.max(newMax, min + 50);
    //     setValues([min, max])
    // }
    console.log('Values', values)

    const handleGoClick = () => {
        setValues(tempValues)
    }

    return (
        <div className="w-full px-2 py-4">
            <p className="font-bold">Price</p>
            <div>
                <p className='font-bold'>${values[0]} - ${values[1]}</p>
            </div>
            <div>
                <small className='text-gray-500'>Current range: ${values[1] - values[0]}</small>
            </div>
            <div className='flex gap-4'>
                <div className='w-full'>
            <Slider className="slider"
                    onChange={setTempValues}
                    value={tempValues}
                    min={Min}
                    max={Max} />   
                </div>
            <button onClick={handleGoClick} className='border font-semibold px-3 py-1 bg-gray-100 cursor-pointer hover:bg-gray-300'>Go</button>     
            </div>

        </div>
    );
};

export default DualRangeSlider;