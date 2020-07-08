import React, { useState, useEffect } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import apiConfig from './apiKeys';
import ReactLoading from 'react-loading';


function App() {
  const [businesses, setBusinesses] = useState([]);
  const [sortedBusinesses, setSortedBusiness] = useState([]);
  const [searchSort, setSearchSort] = useState({sortBy: 'best_match'});
  const [searchTerm, setSearchTerm] = useState({term: ''});
  const [searchLocale, setSearchLocale] = useState({location: ''});
  const [isLoading, setIsLoading] = useState(false); //Needed for ReactLoadin animation
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
    console.log('handleSort');
  }

  function handleTermChange(event) {
    setSearchTerm({term: event.target.value});
    console.log('handleTermChange');
  }

  function handleLocationChange(event) {
    setSearchLocale({location: event.target.value});
    console.log('handleLocationChange');
  }

  function getSortByClass(sortByOption) {
    if (searchSort.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  function handleSearch() {
    searchYelp(searchTerm.term, searchLocale.location);
    console.log('handleSearch');
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
          setIsLoading(false); //After the response, the animation from ReactLoading stops
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
      <SearchBar
        renderSortByOptions={renderSortByOptions} 
        handleSearch={handleSearch} 
        handleTermChange={handleTermChange} 
        handleLocationChange={handleLocationChange} 
        setIsLoading={setIsLoading}
      />
      {isLoading ? 
        <div className="Loader">
          <ReactLoading type={'spinningBubbles'} height={'20%'} width={'20%'} color={'#cca353'} />
        </div>
      :
        <BusinessList
          businesses={businesses} 
          sortedBusinesses={sortedBusinesses} 
          searchSort={searchSort} 
        />
      }
    </div>
  );
}

export default App;
