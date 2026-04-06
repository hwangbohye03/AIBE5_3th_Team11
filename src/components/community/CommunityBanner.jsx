import React from 'react';
import { Link } from 'react-router-dom';

export default function CommunityBanner() {
  return (
    <div className="w-full bg-[#2A1D16] py-10">
      <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
        
        {/* 왼쪽 텍스트 섹션 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
            <i className="ri-discuss-line"></i>
            <span>Community</span>
          </div>
          
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            커뮤니티
          </h1>
          
          <p className="text-gray-400 text-sm font-medium">
            함께 나누는 취업 이야기, 정보와 경험을 공유해요
          </p>
        </div>

        {/* 오른쪽 버튼 섹션 */}
        <Link
          to="/community/write"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E66235] hover:bg-[#D45326] text-white text-sm font-bold rounded-md transition-all shadow-sm"
        >
          <i className="ri-pencil-fill"></i>
          글쓰기
        </Link>
        
      </div>
    </div>
  );
}