import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Write from "./Write";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/write"} element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
