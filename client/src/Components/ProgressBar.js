import React from 'react';

const ProgressBar = ({ progress }) => {
  const calculateColor = (progress) => {
    // Calculate the color values based on the progress
    const red = 255 - Math.round((255 * progress) / 100); // Red decreases from 255 to 0
    const green = Math.round((255 * progress) / 100); // Green increases from 0 to 255

    return `rgb(${red}, ${green}, 0)`; // Blue component remains constant
  };

  const color = calculateColor(progress);

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;