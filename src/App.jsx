import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityWrite from "./pages/CommunityWrite";
import ResumeList from "./pages/ResumeList";
import ResumeForm from "./pages/ResumeForm";
import ResumeDetail from "./pages/ResumeDetail";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import AiRecommend from "./pages/AiRecommend";

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/communityDetail/:post_id" element={<CommunityDetail />} />
        <Route path="/communityWrite" element={<CommunityWrite />} />
        {/* 이력서 라우트 */}
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/resumes/new" element={<ResumeForm />} />
        <Route path="/resumes/:id" element={<ResumeDetail />} />
        <Route path="/resumes/:id/edit" element={<ResumeForm />} />
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/:id" element={<JobDetail/>} />
        <Route path="/ai-recommend" element={<AiRecommend/>} />
        </Routes>
    </div>
  );
}
