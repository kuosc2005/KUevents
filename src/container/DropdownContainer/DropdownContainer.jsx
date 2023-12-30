import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import axios from "axios";
import { Dropdown } from "../../components";
import "./DropdownContainer.scss";

const DropdownContainer = () => {
  const [colleges, setColleges] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedClubs, setSelectedClubs] = useState("");
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

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

  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
  };

  const handleClubsChange = (value) => {
    setSelectedClubs(value);
  };

  const handleSearch = () => {
    console.log("Selected College:", selectedCollege);
    console.log("Selected Clubs:", selectedClubs);

    // Redirect to /search with selectedCollege as a query parameter
    navigate(`/search?schoolId=${selectedCollege}`);
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default DropdownContainer;
