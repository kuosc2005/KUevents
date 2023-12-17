import React from "react";

import DailyTraffic from "./components/DailyTraffic";


const User = () => {
  const cards = [{}, {}, {}, {}];
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
        {cards.map(() => {
          return (
            <div
              style={{
                flex: "1 1 0",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignItems: "center",
                padding: "5rem",
                borderRadius: "10px",
              }}
            >
              Card
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        <DailyTraffic
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        />
      </div>

    </div>
  );
};

export default User;
