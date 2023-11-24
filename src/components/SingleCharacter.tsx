import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../api";
import CharactersCard from "./CharactersCard";

const SingleCharacter = () => {
  const { id } = useParams();
  const fetchSingleCharacterInfo = async (id: any) => {
    console.log(id, "id");
    const res = await axios(`${baseUrl}/character/${id}`);
    console.log(res.data);
    return res?.data;
  };
  const { data, isLoading, isSuccess, error, isError } = useQuery(
    ["singleCharacter", id],
    () => fetchSingleCharacterInfo(id)
  );

  console.log(data, "data");

  return (
    <div>
      {isLoading && <p>Loading results...</p>}
      <div className="episode_Wrapper">
        {isSuccess && data ? (
          <CharactersCard key={data.id} item={data} />
        ) : null}
      </div>
    </div>
  );
};

export default SingleCharacter;
