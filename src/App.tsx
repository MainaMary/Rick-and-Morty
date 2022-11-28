import { useState } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Episodes from "./components/Episodes";

function App() {
  const [activeMenu, setActiveMenu] = useState<string>("Episodes");
  return (
    <div className="App">
      <Navbar handleClick={setActiveMenu} />
      <div className="content">
        <div className="container">
          {activeMenu === "Characters" ? <Characters /> : <Episodes />}
        </div>
      </div>
    </div>
  );
}

export default App;
