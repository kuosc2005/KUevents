import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "./../../store";

import Sidebar from "./Sidebar";
import "./styles.scss";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    // Dispatch your logout action to update the authentication state
    dispatch(authActions.logout());
    
    // Redirect to the home page or any other desired page after logout
    navigate("/");

  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Sidebar
        user={{}} // data is the user data from the context
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className="dashboard__content"
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          marginLeft: "15%",
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f8f8fa",
        }}
      >
        <div
          style={{
            height: "5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem",
            backgroundColor: "#7848f4",
            position: "fixed",
            top: 0,
            right: 0,
            left: "15%",
            zIndex: 100,
          }}
        >
          <Link to="/clubs" className="clubs1">
            Clubs
          </Link>
          <Link to="/events" className="events1">
            Events
          </Link>
          <Link to="/about" className="about1">
            About
          </Link>
          <Link to="/contact" className="contact1">
            Contact
          </Link>
          <Link to="/create-event" className="create1">
            Create
          </Link>
          <button onClick={handleLogout} className="signout1">
            Sign Out
          </button>
        </div>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
