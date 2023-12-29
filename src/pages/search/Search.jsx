// Search.jsx

import React from "react";
import "./Search.scss";

const Search = ({ filteredEvents }) => {
  // Check if filteredEvents is not an array or has no items
  if (!Array.isArray(filteredEvents) || filteredEvents.length === 0) {
    return (
      <div className="search__container">
        <h2>No Search Results</h2>
      </div>
    );
  }

  return (
    <div className="search__container">
      <h2>Search Results</h2>
      {filteredEvents.map((event) => (
        <div key={event._id} className="search__result">
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Search;
