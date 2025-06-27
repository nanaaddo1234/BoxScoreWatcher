import React from 'react';
import './SearchBar.css'; 

const SearchBar = ({ searchQuery, onSearchChange, onCheckClick }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search for players..."
            />
            <button className="check-button" onClick={onCheckClick}>Check</button>
        </div>
    );
};

export default SearchBar;