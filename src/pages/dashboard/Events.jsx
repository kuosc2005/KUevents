import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { images } from "../../constants";
import { EventCard } from "../../components";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/users/events`
        );
        const eventsData = eventsResponse.data;
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [/* Add dependencies if needed */]);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEvents(filtered);
  }, [search, events]);

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredEvents(events);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: "1.5rem",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "50%",
            position: "absolute",
            padding: "0 2rem",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <h1>Discover and experience extraordinary Events</h1>
          <p>
            Enter in the world of events. Discover now the latest Events or
            start creating your own!
          </p>
          <div>
            <Link
              to={"/events"}
              style={{
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              Discover now
            </Link>
            {/* <Link
              style={{
                color: "#fff",
              }}
            >
              Watch video
            </Link> */}
          </div>
        </div>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
          src={images.events_dashboard}
          alt=""
        />
      </div>

      {/* Additional Code */}
      <div className="events__header">
        <h1 className="events__header__name">My Events</h1>
        <div className="events__header__input">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for events"
            className="events__header__input__search"
          />
          <div
            className="events__header__input__icon"
            onClick={handleSearch}
          >
            <img src={images.search} alt="Search" />
          </div>
          {search && (
            <div
              className="events__header__input__icon"
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
        <div className="events__container">
          {filteredEvents.reverse().map((event) => (
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
      )}
    </div>
  );
};

export default UserEvents;
