import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityWrite from "./pages/CommunityWrite"

export default function App() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/community" element={<Community />} />
        <Route path="/communityDetail/:post_id" element={<CommunityDetail />} />
        <Route path="/communityWrite" element={<CommunityWrite />} /> 
      </Routes>
  </div>
  );
}



