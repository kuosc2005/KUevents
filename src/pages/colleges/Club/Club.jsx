import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../../components/EventCard/EventCard";
import "./club.scss";

const Event1 = () => {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/clubs/${id}`
        );

        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/events`
        );

        const clubData = clubResponse.data;
        const eventsData = eventsResponse.data;

        setClub(clubData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, [id]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div className="club">
      <div className="club__image">
        <img src={club.imgUrl} alt={club.name} />
        <Link to="/">
          <div className="club__image__button">
            <p>Back</p>
          </div>
        </Link>
      </div>

      <div className="club__content">
        <div className="club__logo">
          <img
            src={club.logoUrl}
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
          <div className="club__content__title" style={{ fontWeight: 'bold' }}>
            {club.name}
          </div>

          <div className="club__content__description">
            <p>{club.description}</p>
            <p>
              <strong>Department:</strong> {club.Department}
            </p>
            <p>
              <strong>Location:</strong> {club.location}
            </p>
            <p>
              <strong>College:</strong> {club.College}
            </p>
            <p>
              <strong>Email:</strong> {club.Email}
            </p>
            {/* Add other relevant fields */}
          </div>
        </div>
      </div>

      {club.events && club.events.length !== 0 ? (
        <div className="club__events">
          <div className="club__events__title">
            Upcoming <span>Events</span>
          </div>
          <div className="club__events__list">
            {events
              .filter((event) => event.clubs[0] === id)
              .reverse()
              .map((event) => (
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

      {club.fests && club.fests.length !== 0 ? (
        <div className="club__events">
          <div className="club__events__title">
            Regular <span>Events</span>
          </div>
          <div className="club__events__list">
            {club.fests.map((event) => (
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
      ) : null}
    </div>
  );
};

export default Event1;
