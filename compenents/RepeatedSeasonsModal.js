import React from 'react'; 
import './RepeatedSeasonsModal.css';

const RepeatedSeasonsModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Repeated Seasons and N/As</h2>
        <ul>
          <li>Repeated seasons indicate that a player was on multiple teams that year.</li>
          <li>The row of the first repeated season contains the combined stats for all teams that season.</li>
          <li>Seasons marked N/A mean the player was either injured or played in another league that season.</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RepeatedSeasonsModal;