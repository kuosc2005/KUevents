import React, { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Colleges.css";

import { CollegeCard } from "../../../components";
import { images } from "../../../constants";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState(colleges);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const collegesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/colleges`
        );
        const collegesData = collegesResponse.data;
        setColleges(collegesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredColleges(filtered);
  }, [search, colleges]);

  const handleSearch = () => {
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredColleges(colleges);
  };

const containerStyle1 = {
              
              height: "400px",
              borderRadius: "10 px",
              background : "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "50%",  
}
const containerStyle2 = {
              
              height:"400px",
              borderRadius: "10 px",
              background : "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "50%",  
}
 const textStyle = {
  fontSize: '20px',
  margin: '0',
};

  return (
    <div className="colleges">
      <div
          style={{
            color: "black",
            fontSize: "64px",
            fontSmooth: "always",
            fontWeight: "bold",
            lineHeight: "1.2",
            
          }}
        >
          Checkout your{" "}
          <span
            style={{
              color: "#7848F4",
            }}
          >
            college events
          </span>{" "}
          now!!
        </div>
     
      <div
        style={containerStyle1}>
          <h2 style={textStyle}>School of Engineering</h2>
          <p>
      This is some content inside the container. You can add text, images, and more here.
    </p>
          <div
            style={{
              position: "absolute",
              zIndex: "-1",
              top: "10%",
              right: "28%",
              width: "40rem",
              height: "40rem",
              backgroundImage:
                "radial-gradient(circle at center, #7848f4 0%, #7848f4 5%, rgba(120, 120, 120, 0) 40%)",
            }}
          ></div>
          
         
          
          
        
      </div>
      <div
        style={containerStyle2}>
          <h2 style={textStyle}>School of Engineering</h2>
          <p>
      This is some content inside the container. You can add text, images, and more here.
    </p>
    </div>
      <div className="colleges__header">
        <h1 className="colleges__header__name">Colleges</h1>
        <div className="colleges__header__input">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for colleges"
            className="colleges__header__input__search"
          />
          <div className="colleges__header__input__icon" onClick={handleSearch}>
            <img src={images.search} alt="Search" />
          </div>
          {search && (
            <div
              className="colleges__header__input__icon"
              onClick={handleReset}
            >
              <img src={images.reset} alt="Reset" />
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "3rem",
          }}
        >
          <SyncLoader
            color={"#7848F4"}
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="colleges__container">
          {filteredColleges.map((college) => (
            <Link key={college._id} to={`/colleges/${college._id}`}>
              <CollegeCard
                name={college.name}
                location={college.location}
                image={college.imgUrl}
                description={college.description.substring(0, 100) + "..."}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colleges;
