import React, { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Club.scss";

import { ClubCard } from "../../../components";
import { images } from "../../../constants";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const clubsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/clubs`
        );
        const clubsData = clubsResponse.data;
        setClubs(clubsData);
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
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredClubs(filtered);
  }, [search, clubs]);

  const handleSearch = () => {
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClubs(filtered);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredClubs(clubs);
  };

  // const imgArray = [images.college1, images.college2, images.college3];

  return (
    <div className="clubs">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
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
            club events
          </span>{" "}
          now!!
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridGap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              clipPath: "circle(50.0% at 50% 50%)",
              height: "300px",
              background: `url(https://res.cloudinary.com/dtauaal8p/image/upload/v1700827040/KUvents/images/kusom)`,
            }}
          ></div>
          <div
            style={{
              width: "100%",
              clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              height: "300px",
              background: `url(
                https://res.cloudinary.com/dtauaal8p/image/upload/v1700827040/KUvents/images/kusol) center center / cover`,
            }}
          ></div>
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
          <div
            style={{
              width: "100%",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              height: "300px",
              background: `url(
                https://res.cloudinary.com/dtauaal8p/image/upload/v1700827040/KUvents/images/kusoe)`,
            }}
          ></div>
        </div>
      </div>
      <div className="clubs__header">
        <h1 className="clubs__header__name">Clubs</h1>
        <div className="clubs__header__input">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for club"
            className="clubs__header__input__search"
          />
          <div className="clubs__header__input__icon" onClick={handleSearch}>
            <img src={images.search} alt="Search" />
          </div>
          {search && (
            <div
              className="clubs__header__input__icon"
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
        <div className="clubs__container">
          {filteredClubs.map((club) => (
            <Link key={club._id} to={`/clubs/${club._id}`}>
            <ClubCard
              name={club.name}
              location={club.location}
              image={club.imgUrl}
              description={club.description ? club.description.substring(0, 100) + "..." : ""}
            />
          </Link>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
