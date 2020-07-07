import React, { useState } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import apiConfig from './apiKeys';


function App() {
  const [businesses, setBusinesses] = useState([]);
  const [searchSort, setSearchSort] = useState({sortBy: 'best_match'});
  const [searchTerm, setSearchTerm] = useState({term: ''});
  const [searchLocale, setSearchLocale] = useState({location: ''});
  const apiKey = apiConfig.apiKey;
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  function handleSortByChange(sortByOption) {
    setSearchSort({sortBy: sortByOption});
  }

  function handleTermChange(event) {
    setSearchTerm({term: event.target.value});
  }

  function handleLocationChange(event) {
    setSearchLocale({location: event.target.value});
  }

  function getSortByClass(sortByOption) {
    if (searchSort.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  function handleSearch() {
    searchYelp(searchTerm.term, searchLocale.location, searchSort.sortBy);
    setBusinesses([]); //Needed to clear previous states
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

  function searchYelp(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            return setBusinesses(el => [...el, {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              url: business.url,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
              }])
            })
          }
        }
      );
  }

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar renderSortByOptions={renderSortByOptions} handleSearch={handleSearch} handleTermChange={handleTermChange} handleLocationChange={handleLocationChange} />
      <BusinessList businesses={businesses} />
    </div>
  );
}

export default App;
