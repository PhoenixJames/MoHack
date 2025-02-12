import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dictaphone from "./Dictaphone";
import SmileDetection from "./SmileDetection";
import Service from "./Service";
import Information from "./Information";
import Result from "./Result";
import Signature from "./Signature";
import ByeBye from "./ByeBye";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/dictaphone" element={<Dictaphone />} />
      <Route path="/smile-detection" element={<SmileDetection />} />
      <Route path="/service" element={<Service />} />
      <Route path="/information" element={<Information />} />
      <Route path="/result" element={<Result />} />
      <Route path="/signature" element={<Signature />} />
      <Route path="/byebye" element={<ByeBye />} />
    </Routes>
  );
}

export default App;
