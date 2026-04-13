import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community"; // 추가
import Login from "./pages/Login";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  );
}