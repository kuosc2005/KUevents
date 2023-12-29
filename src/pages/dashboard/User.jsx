import React from "react";
import DailyTraffic from "./components/DailyTraffic";

const User = () => {
  const userId = "your_user_id"; // Replace with the actual user ID
  const cards = [
    {
      title: "Your Events",
      content: (
        <div>
          <p>Total Events Created: 10</p>
          <p>Upcoming Events: 5</p>
          <p>Past Events: 5</p>
        </div>
      ),
      backgroundColor: "#FFD700", // Golden color
    },
    {
      title: "Event Statistics",
      content: (
        <div>
          <p>Total Attendees: 200</p>
          <p>Average Rating: 4.5</p>
        </div>
      ),
      backgroundColor: "#00BFFF", // Deep Sky Blue color
    },
    {
      title: "User Engagement",
      content: (
        <div>
          <p>Your Followers: 50</p>
          <p>Recent Interactions: 20</p>
        </div>
      ),
      backgroundColor: "#98FB98", // Pale Green color
    },
  ];

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 0",
              backgroundColor: card.backgroundColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h3>{card.title}</h3>
            {card.content}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        <DailyTraffic
          userId={userId}
          style={{
            // backgroundColor: "#FF6347", // Tomato color
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default User;
