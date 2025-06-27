import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import './PpgSlider.css';  // Import a separate CSS file for the PPG slider

function PpgSlider({ onChange }) {
  const [ppg, setPpg] = useState(15); // Initialize ppg state

  const handleSliderChange = (event, newValue) => {
    setPpg(newValue); // Update the ppg state
    onChange(newValue); // Pass the selected PPG value to the parent component
  };

  return (
    <div className="slider-container">
      <h3>Minimum Career PPG</h3>
      <Slider
        value={ppg}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={8}
        max={20}
        className="slider"
      />
      <div className="selected-value">{`Selected minimum PPG: ${ppg}`}</div>
    </div>
  );
}

export default PpgSlider;