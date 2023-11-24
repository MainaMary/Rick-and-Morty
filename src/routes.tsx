import { Route, Routes } from "react-router-dom";
import Characters from "./components/Characters";
import Episodes from "./components/Episodes";
import SearchResults from "./components/SearchResults";
import SingleCharacter from "./components/SingleCharacter";
import FilterCharacters from "./components/FilterCharacters";
const appRoutes = [
  {
    path: "/",
    component: <Characters />,
  },
  {
    path: "/episodes",
    component: <Episodes />,
  },
  {
    path: "/searchResults/:search",
    component: <SearchResults />,
  },
  {
    path: "/singleCharacter/:id",
    component: <SingleCharacter />,
  },
  {
    path: "/filter",
    component: <FilterCharacters />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};
export default AppRoutes;
