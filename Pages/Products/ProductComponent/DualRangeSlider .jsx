import './DualSlider.css'
import React, { useState } from 'react';
import Slider from 'react-slider'

const DualRangeSlider = () => {
    const Min = 0;
    const Max = 2000;
    const [values, setValues] = useState([Min, Max] )

    const handleChange = ([newMin, newMax]) => {
        const min = Math.min(newMin, values[1] - 50);
        const max = Math.max(newMax, min + 50);
        setValues([min, max])
    }

    return (
        <div className="w-full max-w-xs px-2 py-4">
            <p className="font-semibold">Price</p>
            <div>
                <p>${values[0]} - ${values[1]}</p>
            </div>
            <div>
                <small>Current range ${values[1] - values[0]}</small>
            </div>
            <Slider className="slider"
                    onChange={handleChange}
                    value={values}
                    min={Min}
                    max={Max} />        

        </div>
    );
};

export default DualRangeSlider;