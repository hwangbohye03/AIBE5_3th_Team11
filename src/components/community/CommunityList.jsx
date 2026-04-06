import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";



export default function CommunityList() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { label: "전체", path: "/community" },
        { label: "자유게시판", path: "/community/free" },
        { label: "취업정보", path: "/community/jobs" },
        { label: "질문게시판", path: "/community/qna" },
    ];

    const isActive = (path) => location.pathname === path;

    
    // 📌 게시글 데이터
    const posts = [
        {
        id: 1,
        category: "취업정보",
        title: "2024년 장애인 의무고용 기업 목록 공유합니다",
        author: "취업도우미",
        date: "2026-04-01",
        views: "1,243",
        likes: 87,
        comments: 3,
        isNotice: true,
        },
        {
        id: 2,
        category: "질문게시판",
        title: "지체장애 3급인데 사무직 취업 가능한가요?",
        author: "희망을찾아서",
        date: "2026-04-01",
        views: 892,
        likes: 45,
        comments: 2,
        },
        {
        id: 3,
        category: "자유게시판",
        title: "다온일 서비스 사용해보니 정말 편리하네요!",
        author: "행복한하루",
        date: "2026-03-31",
        views: 567,
        likes: 62,
        comments: 1,
        },
    ];



  return (
    <div className="max-w-7xl mx-auto px-10 py-8 bg-[#FDFBF7]">
      
      {/* ================= 상단: 탭 + 검색 ================= */}
      <div className="flex items-center justify-between mb-8">
        
        {/* 카테고리 탭 */}
         <div className="flex gap-2">
        {tabs.map((tab) => (
            <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                        isActive(tab.path)
                        ? "bg-[#2A1D16] text-white shadow"
                        : "bg-white text-gray-500 border border-gray-200 hover:bg-[#2A1D16] hover:text-white hover:border-[#2A1D16]"
                    }
                `}
            >
                {tab.label}
            </button>
        ))}
      </div>

        {/* 검색 영역 */}
        <div className="flex gap-2">
            <div className="relative">
                <input
                    type="text"
                    placeholder="게시글 검색"
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <i className="ri-search-line absolute right-3 top-2.5 text-gray-400"></i>
                </div>

                <button className="px-6 py-2 bg-[#2A1D16] text-white text-sm rounded-md font-bold hover:opacity-90 transition">
                검색
                </button>
            </div>
        </div>

      {/* ================= 정렬 / 게시글 개수 ================= */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600 font-medium">
          총 <span className="text-[#E66235]">{posts.length}</span>개의 게시글
        </span>

        <div className="flex border border-gray-200 rounded-md overflow-hidden">
            {/* 최신순 */}
            <button className="px-4 py-1.5 bg-[#2A1D16] text-white text-xs font-bold transition-all duration-200 hover:opacity-80">
            최신순
            </button>

            {/* 인기순 */}
            <button className="px-4 py-1.5 bg-white text-gray-500 text-xs font-bold border-l border-gray-200 transition-all duration-200 hover:bg-[#2A1D16] hover:text-white">
            인기순
            </button>
        </div>
      </div>

      {/* ================= 게시글 테이블 ================= */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#F3E8D0] overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          
          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-[#FFFDF9] text-gray-500 font-medium border-b border-[#F3E8D0]">
              <th className="px-6 py-4 text-center w-16">번호</th>
              <th className="px-6 py-4 w-24 whitespace-nowrap">카테고리</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4 w-24">작성자</th>
              <th className="px-6 py-4 w-24">작성일</th>
              <th className="px-6 py-4 w-20">조회수</th>
              <th className="px-6 py-4 w-20 text-center">좋아요</th>
            </tr>
          </thead>

          {/* 테이블 바디 */}
          <tbody className="divide-y divide-[#F3E8D0]">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* 번호 */}
                <td className="px-6 py-4 text-center text-yellow-600 font-medium">
                  {post.id}
                </td>

                {/* 카테고리 */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      post.category === "취업정보"
                        ? "bg-[#FFF3E0] text-[#E66235]"
                        : post.category === "질문게시판"
                        ? "bg-[#F3E5F5] text-[#9C27B0]"
                        : "bg-[#E8F5E9] text-[#4CAF50]"
                    }`}
                  >
                    {post.category}
                  </span>
                </td>

                {/* 제목 */}
                <td className="px-6 py-4 font-semibold text-[#2A1D16]">
                  {post.isNotice && (
                    <span className="mr-1 text-yellow-500">★</span>
                  )}
                  {post.title}
                  <span className="ml-2 text-[#E66235] text-xs">
                    [{post.comments}]
                  </span>
                </td>

                {/* 작성자 */}
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{post.author}</td>

                {/* 작성일 */}
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{post.date}</td>

                {/* 조회수 */}
                <td className="px-6 py-4 text-gray-400">
                  <i className="ri-eye-line mr-1"></i>
                  {post.views}
                </td>

                {/* 좋아요 */}
                <td className="px-6 py-4 text-center">
                  <span className="text-[#E66235] flex items-center justify-center gap-1">
                    <i className="ri-heart-line"></i>
                    {post.likes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= 페이지네이션 ================= */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <i className="ri-arrow-left-s-line text-gray-400 cursor-pointer"></i>

        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-full text-sm font-bold ${
              num === 1
                ? "bg-[#2A1D16] text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <i className="ri-arrow-right-s-line text-gray-400 cursor-pointer"></i>
      </div>
    </div>
  );
}