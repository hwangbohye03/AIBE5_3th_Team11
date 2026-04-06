import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community"; // 추가

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
}