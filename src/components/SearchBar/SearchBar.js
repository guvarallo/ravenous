import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ searchYelp }) {
  const [search, setSearch] = useState({
    term: '',
    location: '',
    sortBy: 'best_match'
  });

  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  function getSortByClass(sortByOption) {
    return search.sortBy === sortByOption ? 'active' : '';
  }

  function handleSortByChange(sortByOption) {
    return setSearch({
      sortBy: sortByOption
    });
  }

  function handleTermChange(event) {
    return setSearch({
      term: event.target.value
    });
  }

  function handleLocationChange(event) {
    return setSearch({
      location: event.target.value
    });
  }

  function handleSearch(event) {
    searchYelp(search.term, search.location, search.sortBy);
    event.preventDefault();
  }

  function renderSortByOptions() {
    return Object.keys(sortByOptions).map(el => {
      let sortByOptionValue = sortByOptions[el];
      return <li 
              onClick={() => handleSortByChange(sortByOptionValue)} 
              className={getSortByClass(sortByOptionValue)} 
              key={sortByOptionValue}>{el}</li>;
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
        <input onChange={handleTermChange} placeholder="Search Businesses" />
        <input onChange={handleLocationChange} placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <button onClick={handleSearch}>Let's Go</button>
      </div>
    </div>
  );
};

export default SearchBar;