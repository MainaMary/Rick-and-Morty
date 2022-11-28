import React from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import { AxiosError } from "axios";
import EpisodesCard from "../components/EpisodesCard";
interface Props {
  data: any;
  error: AxiosError;
  isLoading: boolean;
}
const Episodes = () => {
  const fetchEpisodes = async () => {
    const response = await axios(`${baseUrl}/episode`);
    return response.data;
  };

  const { data, error, isLoading, isSuccess }: any = useQuery(
    ["fetchEpisodes"],
    fetchEpisodes
  );
  if (error) return <p>{`An error has occured ${error.message}`}</p>;
  console.log(data, "data");
  return (
    <>
      <div>{isLoading && <p>Loading...</p>}</div>
      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <EpisodesCard key={item.id} item={item} />
            ))
          : null}
      </div>
    </>
  );
};

export default Episodes;
