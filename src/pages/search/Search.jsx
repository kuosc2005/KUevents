import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Search.scss";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const schoolId = searchParams.get("schoolId");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (schoolId) {
          // Fetch events based on schoolId
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_HOST}/events?schoolId=${schoolId}`
          );
          setFilteredEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [schoolId]);

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
