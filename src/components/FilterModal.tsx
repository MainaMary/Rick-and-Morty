import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
}
const FilterModal = ({ openModal, handleModal }: Props) => {
  if (!openModal) {
    return null;
  }

  return (
    <div className="modal_wrapper">
      <form className="modal_form">
        <div className="close_modal" onClick={handleModal}>
          <p>x</p>
        </div>
        <select>name</select>
      </form>
    </div>
  );
};

export default FilterModal;
