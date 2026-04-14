import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityWrite from "./pages/CommunityWrite"
// import Footer from "../components/Footer"; // 푸터 하단 고정

export default function App() {
  return (
    <div>
      <div className="bg-[#FDFBF7] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/community" element={<Community />} />
          <Route path="/communityDetail/:post_id" element={<CommunityDetail />} />
          <Route path="/communityWrite" element={<CommunityWrite />} /> 
        </Routes>
      </div>
      
    </div>
    
  );
}



