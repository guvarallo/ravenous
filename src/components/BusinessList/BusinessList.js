import React from 'react';
import './BusinessList.css';

function BusinessList({ businesses, sortedBusinesses, searchSort }) {

  return (
    <div className="BusinessList">
      {searchSort === 'best_match' ? 
        businesses.map(business => {
          return (
            <div key={business.id} className="Business">
              <div className="image-container">
                <img src={business.imageSrc} alt=''/>
              </div>
              <h2>{business.name}</h2>
              <div className="Business-information">
                <div className="Business-address">
                  <p>{business.address}</p>
                  <p>{business.city}</p>
                  <p>{business.state} {business.zipCode}</p>
                </div>
                <div className="Business-reviews">
                  <h3>{business.category}</h3>
                  <h3 className="rating">{business.rating} stars</h3>
                  <p>{business.reviewCount} reviews</p>
                </div>
              </div>
              <p>More information: <a href={business.url}>Click here</a></p>
            </div>
          ) 
        })
        :
        sortedBusinesses.map(business => {
          return (
            <div key={business.id} className="Business">
              <div className="image-container">
                <img src={business.imageSrc} alt=''/>
              </div>
              <h2>{business.name}</h2>
              <div className="Business-information">
                <div className="Business-address">
                  <p>{business.address}</p>
                  <p>{business.city}</p>
                  <p>{business.state} {business.zipCode}</p>
                </div>
                <div className="Business-reviews">
                  <h3>{business.category}</h3>
                  <h3 className="rating">{business.rating} stars</h3>
                  <p>{business.reviewCount} reviews</p>
                </div>
              </div>
              <p>More information: <a href={business.url}>Click here</a></p>
            </div>
          ) 
        })
      }
    </div>
  );  
}

export default BusinessList;