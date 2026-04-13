import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sampleJobs } from '../../data/sampleJobs';

export default function JobsPage() {
  // sampleJobs는 '../../data/sampleJobs'에서 import 됩니다.

  // 2. 상태 관리 (검색어, 선택된 필터, 필터창 열림 여부)
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 네비게이터는 최상단에서 한 번만 호출합니다.
  const navigate = useNavigate();

  // format termDate (e.g. '2026-04-06~2026-07-05' or '20260406~20260705') -> '04-06~07-05' or '04-06'
  const formatTermDate = (term) => {
    if (!term) return '';
    if (term === '상시') return '상시';
    // possible formats: '2026-04-06~2026-07-05' or '20260406~20260705' or single date
    const parts = term.split('~').map(s => s.trim());
    const fmt = (d) => {
      if (!d) return '';
      const clean = d.replace(/[^0-9]/g, '');
      if (clean.length === 8) {
        return clean.slice(4,6) + '-' + clean.slice(6,8);
      }
      // fallback: try to find MM-DD
      const mmdd = d.match(/(\d{2})[-/](\d{2})/);
      return mmdd ? `${mmdd[1]}-${mmdd[2]}` : d;
    };
    if (parts.length === 2) return `${fmt(parts[0])}~${fmt(parts[1])}`;
    return fmt(parts[0]);
  };

  // 필터 옵션 목록
  // 기본 장애 필터 + 작업환경에서 추출한 레이블(동적)
  const disabilityOptions = ['지체장애', '시각장애', '청각장애', '지적장애'];
  const envSet = new Set();
  sampleJobs.forEach(job => job.workEnv?.forEach(e => {
    const label = (function formatEnvShort(env) {
      if (!env) return '';
      const kgMatch = env.match(/[\d,~]+Kg/);
      if (kgMatch) return kgMatch[0];
      if (env.includes('듣') || env.includes('말')) return '청취/발화 가능';
      if (env.includes('서서')) return '서서작업 가능';
      if (env.includes('양손')) return '양손작업';
      if (env.includes('정밀')) return '정밀작업 가능';
      return env.length > 18 ? env.slice(0,18) + '...' : env;
    })(e);
    if (label) envSet.add(label);
  }));
  const envFilters = Array.from(envSet);
  const filterOptions = [...disabilityOptions, ...envFilters];

  // 3. 필터링 로직
  const filteredJobs = sampleJobs.filter((job) => {
    // 검색어 매칭 (직무 또는 회사명) - 대소문자 구분 없이
    const q = (searchTerm || '').toString().toLowerCase();
    const matchesSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);

    // 필터 매칭
    if (activeFilters.length === 0) return matchesSearch;
    const matchesFilter = activeFilters.some((filter) => {
      // 1) disability tags (if present)
      if (job.tags?.includes(filter)) return true;
      // 2) workEnv formatted labels
      const formattedWorkEnv = (job.workEnv || []).map(e => {
        // reuse format logic (short)
        const kgMatch = e.match(/[\d,~]+Kg/);
        if (kgMatch) return kgMatch[0];
        if (e.includes('듣') || e.includes('말')) return '청취/발화 가능';
        if (e.includes('서서')) return '서서작업 가능';
        if (e.includes('양손')) return '양손작업';
        if (e.includes('정밀')) return '정밀작업 가능';
        return e.length > 18 ? e.slice(0,18) + '...' : e;
      });
      if (formattedWorkEnv.includes(filter)) return true;
      return false;
    });

    return matchesSearch && matchesFilter;
  });

  // 필터 토글 핸들러
  const toggleFilter = (option) => {
    if (activeFilters.includes(option)) {
      setActiveFilters(activeFilters.filter((f) => f !== option));
    } else {
      setActiveFilters([...activeFilters, option]);
    }
  };

  // 로고 렌더링 함수
  const renderLogo = (company) => {
    const cleaned = company.replace(/[()\s\u00A0]/g, '');
    const initials = cleaned.slice(0, 2);
    return (
        <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 shrink-0">
          {initials}
        </div>
    );
  };

  // 작업환경 텍스트를 짧은 레이블로 변환
  const formatEnv = (env) => {
    if (!env) return env;
    const kgMatch = env.match(/[\d,~]+Kg/);
    if (kgMatch) return kgMatch[0];
    if (env.includes('듣') || env.includes('말')) return '청취/발화 가능';
    if (env.includes('서서')) return '서서작업 가능';
    if (env.includes('양손')) return '양손작업';
    if (env.includes('정밀')) return '정밀작업 가능';
    return env.length > 18 ? env.slice(0, 18) + '...' : env;
  };

  // 위치를 '도 시/군/구'까지 깔끔하게 추출 (예: '경기도 안산시')
  const formatLocation = (loc) => {
    if (!loc) return '';
    const cleaned = loc.replace(/\(.*?\)/g, '').replace(/[,·]/g, ' ').trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
    return parts[0];
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* --- 배너 및 검색 영역 --- */}
        <div className="w-full bg-[#2A1D16] py-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">채용 공고</h1>
                <p className="text-[#D1CAB9] text-sm sm:text-base font-medium">장애 유형에 맞는 채용 공고를 찾아보세요</p>
              </div>
              <Link
                  to="/jobs/write"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-md border border-white/20 transition-all shrink-0"
              >
                <i className="ri-pencil-fill"></i>
                공고 등록
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-2/3 md:w-4/5 relative">
              {/* 검색창 */}
              <div className="relative flex-1 flex items-center bg-white rounded-lg shadow-sm">
                <i className="ri-search-line absolute left-4 text-gray-400 text-lg"></i>
                <input
                    type="text"
                    placeholder="직무, 회사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-base rounded-lg"
                />
              </div>

              {/* 필터 버튼 */}
              <div className="relative shrink-0">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E66235] hover:bg-[#D45326] text-white font-semibold rounded-lg transition-colors text-base h-full shadow-sm w-full sm:w-auto"
                >
                  <i className="ri-filter-3-line"></i>
                  필터 {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>

                {/* 필터 드롭다운 팝업 */}
                {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 border-b border-gray-100 mb-1">장애 유형</div>
                      {filterOptions.map((option) => (
                          <label key={option} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={activeFilters.includes(option)}
                                onChange={() => toggleFilter(option)}
                                className="w-4 h-4 text-[#E66235] rounded border-gray-300 focus:ring-[#E66235]"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                      ))}
                    </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* --- 공고 목록 영역 --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* 검색 결과 카운트 */}
          <div className="mb-6 text-gray-600 font-medium">
            총 <span className="text-[#E66235] font-bold">{filteredJobs.length}</span>건의 공고가 있습니다.
          </div>

          {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate(`/jobs/${job.id}`); e.preventDefault(); } }}
                      className="relative p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group cursor-pointer"
                    >
                      <button className="absolute top-5 right-5 text-gray-300 hover:text-yellow-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <i className="ri-star-line text-xl"></i>
                      </button>

                      <div className="flex items-start gap-4 mb-4 pr-6">
                        {renderLogo(job.company)}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-base font-bold text-gray-900 leading-tight truncate group-hover:text-[#5D4037] transition-colors">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 truncate">
                            {job.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex-grow flex flex-wrap content-start gap-1.5 mb-5">
                        {job.badges?.map((b, i) => (
                            <span key={`badge-${i}`} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">{b}</span>
                        ))}
                        {job.tags?.map((t, i) => (
                            <span key={`tag-${i}`} className={`px-2 py-1 text-xs font-medium rounded-md ${activeFilters.includes(t) ? 'bg-[#E66235] text-white' : 'bg-orange-50 text-orange-600'}`}>
                      {t}
                    </span>
                        ))}
                        {job.workEnv?.map((env, i) => (
                            <span key={`env-${i}`} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md">{formatEnv(env)}</span>
                        ))}
                        {job.tech?.map((tech, i) => (
                            <span key={`tech-${i}`} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">{tech}</span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between w-full mt-auto">
                        <div className="text-sm text-gray-500 truncate pr-2">{formatLocation(job.location)}</div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className={`text-sm font-semibold ${formatTermDate(job.date) === '상시' ? 'text-blue-500' : 'text-orange-500'}`}>{formatTermDate(job.date)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
          ) : (
              // 검색 결과가 없을 때 보여줄 화면
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-2xl">
                <i className="ri-file-search-line text-5xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">조건에 맞는 채용 공고가 없습니다.</p>
                <button
                    onClick={() => { setSearchTerm(''); setActiveFilters([]); }}
                    className="mt-4 px-4 py-2 text-sm text-[#E66235] bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  초기화
                </button>
              </div>
          )}
        </div>
      </div>
  );
}