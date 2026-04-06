import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: "채용공고", path: "/jobs", icon: "ri-file-list-3-line" },
    { label: "커뮤니티", path: "/community", icon: "ri-discuss-line" },
    { label: "AI추천", path: "/ai-recommend", icon: "ri-sparkling-2-line" },
    { label: "공지사항", path: "/notice", icon: "ri-notification-3-line" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="w-full bg-white border-b border-[#F3E8D0]">
      <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-between">

        {/* 왼쪽 (로고 + 메뉴) */}
        <div className="flex items-center gap-8">

          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white">
              <i className="ri-briefcase-line text-sm"></i>
            </div>
            <span className="text-lg font-extrabold text-[#5D4037]">
              다온일
            </span>
          </Link>

          {/* 메뉴 */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition
                  ${
                    isActive(item.path)
                      ? "bg-yellow-500 text-white font-bold"
                      : "text-gray-500 hover:text-[#5D4037]"
                  }
                `}
              >
                <i className={`${item.icon} text-sm`}></i>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 오른쪽 (로그인 + 회원가입 버튼) */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium rounded-md border border-[#D7B89C] text-[#8D6E63] hover:bg-[#FFF3E0] transition"
          >
            로그인
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-yellow-500 hover:opacity-90 transition"
          >
            회원가입
          </Link>
        </div>

      </div>
    </header>
  );
}