import React from "react";

import "./ClubCard.scss";

const ClubCard = ({ name, location, image, description }) => {
  return (
    <div className="club__card">
      <div className="club__card__image">
        <img src={image} alt="club__card" />
      </div>
      <div className="club__card__content">
        <h3 className="club__card__content__name">{name}</h3>
        <p className="club__card__content__desc">{description}</p>
        <p className="club__card__content__location">{location}</p>
      </div>
    </div>
  );
};

export default ClubCard;
