import React, { useState } from "react";
import axios from "axios";

import "./Register.scss";
import { images } from "../../constants";

const Register = ({ date, time, eventId }) => {
  const [payment, setPayment] = useState(false);
  const handlePayment = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/events/${eventId}/booking`, {
        amount: 1,
        eventId: eventId,
      })
      .then(() => {
        // Payment successful, update the state to mark it as booked
        console.log("Payment successful");
        setPayment(true);
      })
      .catch((error) => {
        console.error("Error handling payment:", error);
        // Log the complete error object for more details
        console.error(error);
        // Handle error logic if needed
      });
  };
  
  return (
    <div className="ticket">
      <div className="ticket__heading">
        <h1
          style={{
            padding: "0",
            margin: "0",
          }}
        >
          Date & Time
        </h1>
      </div>
      <div className="ticket__time">
        <h2>
          Saturday, {date}, {time}
        </h2>
      </div>
      <div className="ticket__book">
        <button onClick={handlePayment}>
          {payment ? "Booked" : "Book now"}
        </button>
        {payment && (
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            View  Details
          </a>
        )}
      </div>
      {/* <div className="ticket__promote">
        <button>Program promoter</button>
      </div> */}
      
    </div>
  );
};

export default Register;
