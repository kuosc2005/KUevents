import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "../../components";
import "./DropdownContainer.scss";

const DropdownContainer = () => {
  const [colleges, setColleges] = useState([]);
  const [clubs, setClubs] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]); // Add state for events

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedClubs, setSelectedClubs] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collegesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/colleges`
        );
        setColleges(collegesResponse.data);

        const clubsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/clubs`
        );
        setClubs(clubsResponse.data);

        // Fetch events data and set it to the state
        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/events`
        );
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter events based on selected college
    const filtered = events.filter((event) =>
      event.college === selectedCollege
    );
    setFilteredEvents(filtered);
  }, [selectedCollege, events]);

  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
  };

  const handleClubsChange = (value) => {
    setSelectedClubs(value);
  };

  // const handleCategoryChange = (value) => {
  //   setSelectedCategory(value);
  // };

  const handleSearch = () => {
    console.log("Selected College:", selectedCollege);
    console.log("Selected Clubs:", selectedClubs);
    // console.log("Selected Category:", selectedCategory);
    console.log("Filtered Events:", filteredEvents);
  };

  return (
    <div className="dropdown__container">
      <Dropdown
        options={colleges}
        label="Select School"
        value={selectedCollege}
        onChange={handleCollegeChange}
      />
      <Dropdown
        options={clubs}
        label="Select Clubs"
        value={selectedClubs}
        onChange={handleClubsChange}
      />
        <Link to="/search">
        <button onClick={handleSearch}>Search</button>
      </Link>
    </div>
  );
};

export default DropdownContainer;
