import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import Sidebar from "./Sidebar";


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
            backgroundColor: "#ffffff",
            position: "fixed",
            top: 0,
            right: 0,
            left: "15%",
            zIndex: 100,
          }}
        >
          <Link to="/clubs" style={{ marginRight: "1rem" }}>
            Clubs
          </Link>
          <Link to="/events" style={{ marginRight: "1rem" }}>
            Events
          </Link>
          <Link to="/about" style={{ marginRight: "1rem" }}>
            About
          </Link>
          <Link to="/contact" style={{ marginRight: "1rem" }}>
            Contact
          </Link>
          <Link to="/create-event" style={{ marginRight: "1rem" }}>
            Create
          </Link>
          {/* <button onClick=Add sign out logic here>Sign out</button> */}
        </div>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
