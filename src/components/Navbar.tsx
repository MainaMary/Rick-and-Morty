import React, { useState } from "react";
import FilterModal from "./FilterModal";

interface Props {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  activeMenu?: string;
}
const Navbar = ({ handleClick, activeMenu }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <div className="nav_wrapper">
        <h2 className="title">Rick and Morty</h2>
        <div className="btn_wrapper">
          <button className="btn" onClick={() => handleClick("Characters")}>
            Characters
          </button>
          <button className="btn" onClick={handleModal}>
            {activeMenu === "Characters"
              ? "Filter by characters"
              : " Filter by episodes"}
          </button>
          <button className="btn" onClick={() => handleClick("Episodes")}>
            Episodes
          </button>
        </div>
      </div>
      {openModal && (
        <FilterModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleModal={handleModal}
        />
      )}
    </>
  );
};

export default Navbar;
