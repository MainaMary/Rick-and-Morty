import React from "react";
import { useState } from "react";

interface Props {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}
const Navbar = ({ handleClick }: Props) => {
  return (
    <div className="nav_wrapper">
      <h2 className="title">Rick and Morty</h2>
      <div className="btn_wrapper">
        <button className="btn" onClick={() => handleClick("Characters")}>
          Characters
        </button>
        <button className="btn" onClick={() => handleClick("Episodes")}>
          Episodes
        </button>
      </div>
    </div>
  );
};

export default Navbar;
