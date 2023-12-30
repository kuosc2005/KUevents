import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { images } from "../../constants";
import "./Advertisement.scss";

const Advertisement = () => {
  // Retrieve isLoggedIn from Redux state
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Update local state when isLoggedIn changes
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="ad">
      <div className="ad__img">
        <img src={images.ad_image} alt="ad_image" />
      </div>
      <div className="ad__text">
        <h2>Make your own Event</h2>
        <p>
          Unleash your creativity and create unforgettable events that reflect
          your unique style and objectives. Make your mark in the event world
          today.
        </p>
        {isUserLoggedIn ? (
          <Link to="/create-event">
            <button>Create Events</button>
          </Link>
        ) : (
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Advertisement;
