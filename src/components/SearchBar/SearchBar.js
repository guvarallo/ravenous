import React from 'react';
import './SearchBar.css';

function SearchBar() {
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  function renderSortByOptions() {
    return Object.keys(sortByOptions).map(el => {
      let sortByOptionValue = sortByOptions[el];
      return <li key={sortByOptionValue}>{el}</li>;
    });
  }

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" />
        <input placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <a>Let's Go</a>
      </div>
    </div>
  );
};

export default SearchBar;