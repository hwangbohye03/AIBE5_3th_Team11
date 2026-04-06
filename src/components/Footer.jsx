export default function Footer() {
  return (
    <footer className="w-full bg-[#FFE2DA] rounded-t-3xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

        {/* 왼쪽 (브랜드) */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-[#5D4037]">다온일</h2>

          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            모두에게 온 기회. 장애인 맞춤 일자리 추천 플랫폼 다온일입니다.
          </p>

          <p className="text-xs text-gray-400">
            © 2024 다온일. All rights reserved.
          </p>
        </div>

        {/* 오른쪽 (정보) */}
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <p>스프린트 팀</p>
          <p>사업자등록번호: 000-00-00000</p>
          <p>고객센터: 1588-0000 (평일 09:00~18:00)</p>
        </div>

      </div>
    </footer>
  );
}