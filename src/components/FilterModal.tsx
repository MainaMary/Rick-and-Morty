import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { useQuery } from "react-query";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
}
const FilterModal = ({ openModal, handleModal }: Props) => {
  const [search, setSearch] = useState<string>("");

  if (!openModal) {
    return null;
  }
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const fetchCharacters = async (search: string) => {
    const response = await axios(
      `${baseUrl}/character/?name=${search}&status=alive`
    );
    return response?.data;
  };
  const { data, refetch, isLoading, isSuccess }: any = useQuery(
    ["fetchCharacters", search],
    () => fetchCharacters(search),
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;
    refetch();
  };
  console.log(data, "data");
  return (
    <div className="modal_wrapper">
      <form className="modal_form" onSubmit={handleSubmit}>
        <div className="close_modal">
          <p>x</p>
          <input type="text" value={search} onChange={handleChange} />
          <button>Submit</button>
        </div>
        <select>name</select>
      </form>
    </div>
  );
};

export default FilterModal;
