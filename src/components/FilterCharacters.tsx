import { useRecoilValue } from "recoil";
import { status, gender } from "../recoil/selector/filterSelector";
import axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "../api";
import useCounterHook from "../useCounterHook";
import CharactersCard from "./CharactersCard";
import { useLocation } from "react-router-dom";

const FilterCharacters = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genderSelect = queryParams.get("gender");
  const statusSelect = queryParams.get("status");
  //   const statusSelect = useRecoilValue(status);
  //   const genderSelect = useRecoilValue(gender);
  const { page, handleNext, handlePrev } = useCounterHook();
  console.log(statusSelect, genderSelect);

  const fetchCharacters = async (
    genderSelect: string | null,
    statusSelect: string | null,
    page: number
  ) => {
    const response = await axios(
      `${baseUrl}/character?page=${page}&gender=${genderSelect}&status=${statusSelect}`
    );
    console.log(response.data, "data");
    return response?.data;
  };
  const { data, isLoading, isSuccess }: any = useQuery(
    ["fetchCharacters", page],
    () => fetchCharacters(genderSelect, statusSelect, page),
    {
      keepPreviousData: true,
    }
  );
  console.log(data);
  return (
    <div>
      <h2>All characters</h2>
      <div className="episode_Wrapper">
        {isSuccess && data?.results?.length
          ? data?.results?.map((item: any) => (
              <CharactersCard key={item.id} item={item} status={true} />
            ))
          : null}
      </div>
      <p>{`Page ${page} out of ${data?.info.pages}`}</p>
      <div className="btn_wrapper">
        <button
          className="btn_pagination"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="btn_pagination"
          disabled={page === 42}
          onClick={() => {
            console.log("hey");
            handleNext();
          }}
          // Disable the Next Page button until we know a next page is available
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FilterCharacters;
