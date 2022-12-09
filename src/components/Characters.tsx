import React, { useState } from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import CharactersCard from "./CharactersCard";
const Characters = () => {
  const [page, setPage] = useState<number>(1);
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
  console.log(data, "characters");
  if (isError) return <p>{`An error has occured ${error.message}`}</p>;
  console.log(page, "page");
  return (
    <>
      <div>{isFetching && <p>Loading...</p>}</div>

      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <CharactersCard key={item.id} item={item} />
            ))
          : null}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          margin: "40px 0",
        }}
      >
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
