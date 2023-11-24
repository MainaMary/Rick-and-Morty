import { Route, Routes } from "react-router-dom";
import Characters from "./components/Characters";
import Episodes from "./components/Episodes";
import SearchResults from "./components/SearchResults";
import SingleCharacter from "./components/SingleCharacter";
import App from "./App";
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
