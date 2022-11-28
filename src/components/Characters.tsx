import React, { useState } from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import CharactersCard from "./CharactersCard";
const Characters = () => {
  const [page, setPage] = useState<number>(1);
  const fetchCharacters: any = async (page: number): Promise<number> => {
    console.log(page, "page");
    //https://rickandmortyapi.com/api/character?page=1
    const response = await axios(`${baseUrl}/character?page=${page}`);
    return response?.data;
  };
  const {
    data,
    error,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    isPreviousData,
  }: any = useQuery(["fetchCharacters", page], fetchCharacters(page));
  console.log(data, "characters");
  if (isError) return <p>{`An error has occured ${error.message}`}</p>;
  return (
    <>
      <div>{isFetching && <p>Loading...</p>}</div>
      <div>
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
            if (!isPreviousData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.hasMore}
        >
          Next
        </button>
      </div>
      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <CharactersCard key={item.id} item={item} />
            ))
          : null}
      </div>
    </>
  );
};

export default Characters;
