import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dictaphone from "./Dictaphone";
import SmileDetection from "./SmileDetection";
import Result from "./Result";
import ByeBye from "./ByeBye";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/dictaphone" element={<Dictaphone />} />
      <Route path="/smile-detection" element={<SmileDetection />} />
      <Route path="/result" element={<Result />} />
      <Route path="/byebye" element={<ByeBye />} />
    </Routes>
  );
}

export default App;
