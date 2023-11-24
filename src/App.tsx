import Navbar from "./components/Navbar";
import Search from "./components/Search";
import AppRoutes from "./routes";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <div className="content">
        <div className="container">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
