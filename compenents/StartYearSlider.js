import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import './StartYearSlider.css';  // Import the CSS file

function StartYearSlider({ onChange }) {
  const [yearRange, setYearRange] = useState([1990, 2020]); // Example initial range

  const handleSliderChange = (event, newValue) => {
    setYearRange(newValue);
    onChange(newValue); // Pass the selected range to the parent component
  };

  return (
    <div className="slider-container">
      <h3>Career Start Year Range</h3>
      <Slider
        value={yearRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={1949}
        max={2023}
        className="slider"
      />
      <div className="selected-range">{`Selected range: ${yearRange[0]} - ${yearRange[1]}`}</div>
    </div>
  );
}

export default StartYearSlider;
