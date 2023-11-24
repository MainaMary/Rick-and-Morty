import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import { statusState, genderState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
}
const FilterModal = ({ openModal, handleModal }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [statusSelect, setStatusSelect] = useRecoilState(statusState);
  const [genderType, setGenderType] = useRecoilState(genderState);

  if (!openModal) {
    return null;
  }
  const genders = [
    {
      id: "female",
      label: "Female",
    },
    {
      id: "male",
      label: "Male",
    },
    {
      id: "genderless",
      label: "Genderless",
    },
    {
      id: "unknown",
      label: "Unknown",
    },
  ];
  const status = [
    {
      id: "alive",
      label: "Alive",
    },
    {
      id: "dead",
      label: "Dead",
    },
    {
      id: "unknown",
      label: "Unknown",
    },
  ];

  const handleStatus = (e: any) => {
    setStatusSelect(e.target.value);
  };
  const handleGender = (e: any) => {
    setGenderType(e.target.value);
  };
  interface Props {
    status: string;
    gender: string;
  }

  const fetchCharacters = async (genderType: string, statusSelect: string) => {
    const response = await axios(
      `${baseUrl}/character/?gender=${genderType}&status=${statusSelect}`
    );
    console.log(response.data);
    return response?.data;
  };
  const { data, refetch, isLoading, isSuccess }: any = useQuery(
    ["fetchCharacters", search],
    () => fetchCharacters(genderType, statusSelect),
    {
      keepPreviousData: true,
      enabled: false,
    }
  );
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/filter?gender=${genderType}&status=${statusSelect}`);
    handleModal();
    setGenderType("");
    setStatusSelect("");
    window.location.reload();
  };
  console.log(statusSelect, genderType, "data");
  return (
    <div className="modal_wrapper">
      <form className="modal_form" onSubmit={handleSubmit}>
        <div className="close_modal">
          <h3>Filter</h3>
          <p className="close-icon" onClick={handleModal}>
            x
          </p>
          {/* <input type="text" value={search} onChange={handleChange} />
          <button>Submit</button> */}
        </div>
        <div className="select">
          <select value={genderType} onChange={handleGender}>
            <option>Select gender...</option>
            {genders.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select value={statusSelect} onChange={handleStatus}>
            <option>Select status...</option>
            {status.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
