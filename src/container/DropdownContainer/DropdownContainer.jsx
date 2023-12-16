import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "../../components";
import "./DropdownContainer.scss";

const DropdownContainer = () => {
  const [colleges, setColleges] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedClubs, setSelectedClubs] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const collegesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/colleges`
        );
        setColleges(collegesResponse.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    const fetchClubs = async () => {
      try {
        const clubsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/clubs`
        );
        setClubs(clubsResponse.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    const fetchCategories = async () => {
      // Fetch categories data
      // ...
    };

    fetchColleges();
    fetchClubs();
    fetchCategories();
  }, []);

  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
  };

  const handleClubsChange = (value) => {
    setSelectedClubs(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSearch = () => {
    console.log("Selected College:", selectedCollege);
    console.log("Selected Clubs:", selectedClubs);
    console.log("Selected Category:", selectedCategory);
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
      <Dropdown
        options={categories}
        label="Select Category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
      <Link to="/search">
        <button onClick={handleSearch}>Search</button>
      </Link>
    </div>
  );
};

export default DropdownContainer;
