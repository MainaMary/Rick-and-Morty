import React, { useState, useEffect } from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import CharactersCard from "./CharactersCard";
import { BsSearch } from "react-icons/bs";
const Characters = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchError, setSearchError] = useState<string>("");
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  console.log(search, "search");
  const fetchCharacters: any = async (page = 1): Promise<any> => {
    //https://rickandmortyapi.com/api/character?page=1
    const response = await axios(`${baseUrl}/character?page=${page}`);
    return response?.data;
  };
  const { data, error, isSuccess, isFetching, isError }: any = useQuery(
    ["fetchCharacters", page],
    () => fetchCharacters(page),
    {
      keepPreviousData: true,
    }
  );
  console.log(page, "page");
  if (isLoading) {
    <p>Loading...</p>;
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) {
      setSearchError("Please search for a name");
    }
    setSearchError("");
    const filterCharacters = async () => {
      try {
        const response = await axios(
          `${baseUrl}/character/?name=${search}&status=alive`
        );
        console.log(response.data, "response");
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setIsLoading(false);
      }
      setSearch("");
    };
    filterCharacters();
  };
  useEffect(() => {}, []);
  if (isError) return <p>{`An error has occured ${error.message}`}</p>;
  console.log(page, "page");
  console.log(searchError, "error");
  return (
    <>
      <div>{isFetching && <p>Loading...</p>}</div>
      <div className="search-box">
        <form className="form-modal" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            name="name"
            className="search-txt"
            placeholder="Search by name..."
          />
          <button className="search-btn">
            <BsSearch className="search-icon" />
          </button>
        </form>
      </div>
      <p style={{ textAlign: "center", color: "red", margin: "4px 0" }}>
        {searchError}
      </p>
      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <CharactersCard key={item.id} item={item} />
            ))
          : null}
      </div>
      <p>{`Page ${page}`}</p>
      <div className="btn_wrapper">
        <button
          className="btn_pagination"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </button>
        <button
          className="btn_pagination"
          onClick={() => {
            console.log("hey");
            setPage(page + 1);
          }}
          // Disable the Next Page button until we know a next page is available
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Characters;
