import React from 'react';
import './HowToPlayModal.css';

const HowToPlayModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>How To Play</h2>
        <ul>
          <li>Guess the player based on the displayed statistics.</li>
          <li>Click on a box in the grid to uncover a statistic</li>
          <li>Clicking on "Points" subtracts 2 points from your score.</li>
          <li>Clicking on any other stat subtracts 1 point.</li>
          <li>Clicking on "Team" subtracts 4 points.</li>
          <li>Incorrect guesses subtract 4 points.</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HowToPlayModal;