import React from 'react';
import './SearchBar.css';

function SearchBar({ renderSortByOptions, handleTermChange, handleLocationChange, handleSearch }) {

  function onKeyPress(e) {
    if(e.which === 13) {
      handleSearch();
    }
  }

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input onChange={handleTermChange} onKeyPress={onKeyPress} placeholder="Search Businesses" />
        <input onChange={handleLocationChange} onKeyPress={onKeyPress} placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <button onClick={handleSearch}>Let's Go</button>
      </div>
    </div>
  );
};

export default SearchBar;