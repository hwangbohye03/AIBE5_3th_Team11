import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community"; // 추가
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/jobs/:id" element={<JobDetail/>} />
    </Routes>
  );
}