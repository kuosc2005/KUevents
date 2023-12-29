import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./club.scss";
import EventCard from "../../../components/EventCard/EventCard";

const Event1 = () => {
  const [clubs, setclubs] = useState([]);
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/clubs`
        );
        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/events`
        );
        const clubsData = clubsResponse.data;
        const eventsData = eventsResponse.data;

        setclubs(clubsData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const clubData = clubs.find((club) => club._id === id);

  const clubEvents = events.filter((event) => event.clubs[0] === id);

  if (!clubData) {
    return <div>Event not found</div>;
  }

  return (
    <div
      className="club"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div className="club__image">
        <img src={clubData.imgUrl} alt={clubData.name} />
        <Link to="/">
          <div className="club__image__button">
            <p>Back</p>
          </div>
        </Link>
      </div>

      <div className="club__content">
        <div className="club__logo">
          <img
            src={clubData.logoUrl}
            alt="logo"
            style={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
              margin: "2rem 0",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className="club__content__title">{clubData.name}</div>
          <div className="club__content__description">
            <p>{clubData.description}</p>
          </div>
        </div>
      </div>

      {clubData.events.length !== 0 ? (
        <div className="club__events">
          <div className="club__events__title">
            Upcomingg <span>Events</span>
          </div>
          <div className="club__events__list">
            {clubEvents.reverse().map((event) => (
              <Link key={event._id} to={`/events/${event._id}`}>
                <EventCard
                  name={event.name}
                  date={event.start_date}
                  time={event.start_time}
                  location={event.location}
                  img={event.banner}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="club__events">
        <div>
          {clubData.fests.length === 0 ? (
            <div className="club__events__title">
              No <span>Events</span>
            </div>
          ) : null}
        </div>
        <div className="club__events__title">
          Regular <span>Events</span>
        </div>
        <div className="club__events__list">
          {clubData.fests.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              name={event.name}
              img={event.imgUrl}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event1;
