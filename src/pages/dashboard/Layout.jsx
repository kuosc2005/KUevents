import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./styles.scss";


const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <Link to="/" className="signout1">
            Sign Out
          </Link>
          </div>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
