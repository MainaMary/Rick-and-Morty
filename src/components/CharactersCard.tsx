import React from "react";

const CharactersCard = ({ item }: any) => {
  return (
    <div className="episode_Card">
      <img src={item.image} alt={item.name} className="image_card" />
      <h3>{item.name}</h3>
      <h3>{item.gender}</h3>
    </div>
  );
};

export default CharactersCard;
