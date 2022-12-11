import React from "react";

interface Props {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  activeMenu?: string;
}
const Navbar = ({ handleClick, activeMenu }: Props) => {
  return (
    <div className="nav_wrapper">
      <h2 className="title">Rick and Morty</h2>
      <div className="btn_wrapper">
        <button className="btn" onClick={() => handleClick("Characters")}>
          Characters
        </button>
        <button className="btn">
          {activeMenu === "Characters"
            ? "Filter by characters"
            : " Filter by episodes"}
        </button>
        <button className="btn" onClick={() => handleClick("Episodes")}>
          Episodes
        </button>
      </div>
    </div>
  );
};

export default Navbar;
