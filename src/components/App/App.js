import React, { useState, useEffect } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import apiConfig from './apiKeys';


function App() {
  const [businesses, setBusinesses] = useState([]);
  const [sortedBusinesses, setSortedBusiness] = useState([]);
  const [searchSort, setSearchSort] = useState({sortBy: 'best_match'});
  const [searchTerm, setSearchTerm] = useState({term: ''});
  const [searchLocale, setSearchLocale] = useState({location: ''});
  const apiKey = apiConfig.apiKey;
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'reviewCount'
  };

  useEffect(() => {
    let sorted = businesses.map(a => ({...a}));
    sorted.sort((a, b) => (a[searchSort.sortBy] > b[searchSort.sortBy]) ? -1 : 1);
    setSortedBusiness(sorted);
  }, [businesses, searchSort.sortBy]);

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
    searchYelp(searchTerm.term, searchLocale.location);
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

  function searchYelp(term, location) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=best_match`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      }
    }).then(setBusinesses([])) //Empty previous state only when fetching new data
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            console.log(business);
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
      <BusinessList businesses={businesses} sortedBusinesses={sortedBusinesses} searchSort={searchSort} />
    </div>
  );
}

export default App;
