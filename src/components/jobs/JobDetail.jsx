import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sampleJobs } from '../../data/sampleJobs';

export const InfoItem = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value || '-'}</span>
    </div>
);

export default function JobDetail() {
  const { id } = useParams();

  // 1. 공고 데이터 관련 상태
  const [job, setJob] = useState(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState(null);

  // 2. 모달 및 단계 제어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('select'); // 'select' | 'create' | 'preview'
  const [selectedResume, setSelectedResume] = useState(null); // 선택된 이력서 데이터 보관

  // 3. 이력서 목록 상태
  const [resumes, setResumes] = useState([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4. 새 이력서 작성 폼 상태
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', disabilityType: '', introduction: '',
    envBothHands: '', envEyesight: '', envLiftPower: '', envLstnTalk: '', envStndWalk: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalStep('select');
      setSelectedResume(null);
    }, 300);
  };

  // 지원하기 최종 제출 핸들러
  const handleApply = async () => {
    setIsSubmitting(true);
    // [백엔드 연동 시 여기에 POST 요청 작성]
    // await fetch(`/api/applications`, { method: 'POST', body: JSON.stringify({ jobId: id, resumeId: selectedResume.id }) });

    setTimeout(() => {
      setIsSubmitting(false);
      alert('지원이 완료되었습니다!');
      handleCloseModal();
    }, 800);
  };

  // --- 헬퍼 함수 ---
  const formatTermDate = (term) => {
    if (!term) return '';
    if (term === '상시') return '상시';
    const parts = term.split('~').map(s => s.trim());
    const fmt = (d) => {
      if (!d) return '';
      const clean = d.replace(/[^0-9]/g, '');
      if (clean.length === 8) return clean.slice(4,6) + '-' + clean.slice(6,8);
      const mmdd = d.match(/(\d{2})[-/](\d{2})/);
      return mmdd ? `${mmdd[1]}-${mmdd[2]}` : d;
    };
    if (parts.length === 2) return `${fmt(parts[0])}~${fmt(parts[1])}`;
    return fmt(parts[0]);
  };

  const formatEnv = (env) => {
    if (!env) return env;
    const kgMatch = env.match(/[\d,~]+Kg/);
    if (kgMatch) return kgMatch[0];
    if (env.includes('듣') || env.includes('말')) return '청취/발화';
    if (env.includes('서서')) return '서서작업';
    if (env.includes('양손')) return '양손작업';
    if (env.includes('정밀')) return '정밀작업';
    return env.length > 15 ? env.slice(0, 15) + '...' : env;
  };

  // --- 공고 데이터 Fetch ---
  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoadingJob(true);
      setJobError(null);
      setTimeout(() => {
        const foundJob = sampleJobs.find((j) => String(j.id) === String(id));
        if (foundJob) setJob(foundJob);
        else setJobError('존재하지 않거나 삭제된 공고입니다.');
        setIsLoadingJob(false);
      }, 500);
    };
    fetchJobData();
  }, [id]);

  // --- 이력서 데이터 Fetch ---
  useEffect(() => {
    if (isModalOpen && modalStep === 'select' && resumes.length === 0) {
      setIsLoadingResumes(true);
      setTimeout(() => {
        // 프리뷰를 위해 임시 데이터 구조 확장
        setResumes([
          {
            id: 1, title: '기본 이력서', isDefault: true, userName: '김다온', university: '서울대학교', disabilityType: '지체장애', disabilityLevel: '3급',
            phone: '010-1234-5678', email: 'daon@example.com',
            envBothHands: '양손작업 가능', envEyesight: '일상적 활동 가능', envLiftPower: '5kg 이하', envLstnTalk: '듣고 말하기 어려움 없음', envStndWalk: '어려움',
            introduction: '주어진 업무를 성실히 수행하며, 문제 해결에 능장적인 지원자입니다.'
          },
          {
            id: 2, title: 'IT 개발자 이력서', isDefault: false, userName: '김다온', university: '서울대학교', disabilityType: '지체장애', disabilityLevel: '3급',
            phone: '010-1234-5678', email: 'dev.daon@example.com',
            envBothHands: '양손작업 가능', envEyesight: '일상적 활동 가능', envLiftPower: '5kg 이하', envLstnTalk: '간단한 의사소통 가능', envStndWalk: '어려움',
            introduction: 'Spring Boot와 JPA를 활용한 백엔드 개발 경험이 있으며, 사용자 친화적인 시스템 구축에 관심이 많습니다.'
          }
        ]);
        setIsLoadingResumes(false);
      }, 600);
    }
  }, [isModalOpen, modalStep, resumes.length]);

  // --- UI 렌더링 ---
  if (isLoadingJob) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">공고 정보를 불러오는 중입니다...</p>
        </div>
    );
  }

  if (jobError || !job) return <div className="py-20 text-center text-gray-500">공고를 찾을 수 없습니다.</div>;

  const orig = job.original || {};

  return (
      <>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg sm:text-xl font-extrabold text-[#5D4037] shadow-sm">
                    {job.company.slice(0, 2)}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-gray-500 mb-1">{job.company}</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight truncate" title={job.title}>{job.title}</h1>
                    <div className="text-sm text-gray-500 font-medium mt-1 mb-4 flex items-center gap-1">
                      <i className="ri-map-pin-line text-gray-400"></i>{orig.compAddr || job.location || '위치 미상'}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {job.tags?.map((t, i) => <span key={`tag-${i}`} className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100 whitespace-nowrap">{t}</span>)}
                      {job.workEnv?.map((env, i) => <span key={`env-${i}`} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 whitespace-nowrap">{formatEnv(env)}</span>)}
                      {job.tech?.map((tech, i) => <span key={`tech-${i}`} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200 whitespace-nowrap">#{tech}</span>)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2 shrink-0 bg-gray-50 sm:bg-transparent p-4 sm:p-0 rounded-lg mt-4 sm:mt-0">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-orange-500">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>마감: {formatTermDate(orig.termDate || job.date)}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="bg-gray-50 rounded-xl p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border border-gray-100">
                <InfoItem label="고용 형태" value={orig.empType || orig.enterType} />
                <InfoItem label="경력" value={orig.reqCareer} />
                <InfoItem label="학력" value={orig.reqEduc} />
                <InfoItem label="연봉" value={orig.salary ? `${orig.salary}${orig.salaryType ? ' ' + orig.salaryType : ''}` : null} />
                <InfoItem label="근무/입사 형태" value={orig.enterType} />
                <InfoItem label="근무 기간" value={formatTermDate(orig.termDate || job.date)} />
                <InfoItem label="담당자" value={orig.regagnName} />
                <InfoItem label="연락처" value={orig.cntctNo} />
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-gray-100">
                <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto flex-1 px-6 py-3.5 bg-[#E66235] hover:bg-[#D45326] shadow-md shadow-orange-200 transition-all text-white font-bold rounded-xl text-center">
                  지금 지원하기
                </button>
                <Link to="/jobs" className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-bold rounded-xl text-center">목록으로</Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- 모달 영역 --- */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* 모달 헤더 */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                  {modalStep === 'select' ? (
                      <h2 className="text-lg font-bold text-gray-900">지원하기</h2>
                  ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setModalStep('select'); setSelectedResume(null); }} className="text-gray-500 hover:text-gray-900 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <h2 className="text-lg font-bold text-[#5D4037]">
                          {modalStep === 'create' ? '새 이력서 작성' : '이력서 확인 및 지원'}
                        </h2>
                      </div>
                  )}
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* 모달 바디 */}
                <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
                  {modalStep !== 'create' && (
                      <div className="bg-[#FFF9F3] p-4 rounded-xl mb-6 shrink-0">
                        <p className="text-[13px] text-gray-500 mb-1">{job.company}</p>
                        <p className="text-[15px] font-bold text-gray-900">{job.title}</p>
                      </div>
                  )}

                  {/* [STEP 1] 이력서 선택 */}
                  {modalStep === 'select' && (
                      <>
                        <h3 className="text-[15px] font-bold text-gray-900 mb-3">저장된 이력서 선택</h3>
                        <div className="space-y-3">
                          {isLoadingResumes ? (
                              <div className="py-8 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
                                <div className="animate-spin w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full"></div>
                                불러오는 중...
                              </div>
                          ) : (
                              resumes.map((resume) => (
                                  <button
                                      key={resume.id}
                                      onClick={() => {
                                        setSelectedResume(resume);
                                        setModalStep('preview');
                                      }}
                                      className="w-full flex justify-between p-4 bg-[#FFF9F3] border border-orange-100 rounded-xl hover:border-orange-300 text-left group transition-all"
                                  >
                                    <div>
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="font-bold text-gray-900">{resume.title}</span>
                                        {resume.isDefault && <span className="px-1.5 py-0.5 bg-orange-100 text-[#E66235] text-[11px] font-bold rounded">기본</span>}
                                      </div>
                                      <div className="text-[13px] text-gray-500 leading-tight">
                                        {resume.userName} · {resume.disabilityType}
                                      </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                  </button>
                              ))
                          )}
                          <button onClick={() => setModalStep('create')} className="w-full p-4 border border-dashed border-gray-300 rounded-xl text-[14px] font-medium text-gray-500 hover:bg-gray-50 transition-colors flex justify-center gap-1.5">
                            <span className="text-lg leading-none">+</span> 새 이력서 작성하기
                          </button>
                        </div>
                      </>
                  )}

                  {/* [STEP 2] 새 이력서 작성 (기존 코드 유지) */}
                  {modalStep === 'create' && (
                      <div className="space-y-5">
                        {/* 폼 내용 기존과 동일 생략 없이 유지 */}
                        <div><label className="block text-[13px] font-bold text-[#5D4037] mb-1.5">이름</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" /></div>
                        <div><label className="block text-[13px] font-bold text-[#5D4037] mb-1.5">연락처</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" /></div>
                        <div><label className="block text-[13px] font-bold text-[#5D4037] mb-1.5">이메일</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" /></div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#5D4037] mb-1.5">장애 유형</label>
                          <select name="disabilityType" value={formData.disabilityType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm">
                            <option value="">선택해주세요</option><option value="지체장애">지체장애</option><option value="시각장애">시각장애</option><option value="청각장애">청각/언어장애</option><option value="발달장애">발달장애 (지적/자폐)</option>
                          </select>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <h4 className="text-[14px] font-bold text-gray-900 mb-4">근로 가능 환경</h4>
                          <div className="space-y-4">
                            <div><label className="block text-[12px] font-bold text-[#5D4037] mb-1">상체/손 활용</label><select name="envBothHands" value={formData.envBothHands} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"><option value="양손작업 가능">양손작업 가능</option></select></div>
                            <div><label className="block text-[12px] font-bold text-[#5D4037] mb-1">시각</label><select name="envEyesight" value={formData.envEyesight} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"><option value="일상적 활동 가능">일상적 활동 가능</option></select></div>
                            <div><label className="block text-[12px] font-bold text-[#5D4037] mb-1">물건 다루기</label><select name="envLiftPower" value={formData.envLiftPower} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"><option value="5kg 이하">5kg 이하</option></select></div>
                            <div><label className="block text-[12px] font-bold text-[#5D4037] mb-1">의사소통</label><select name="envLstnTalk" value={formData.envLstnTalk} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"><option value="듣고 말하기 어려움 없음">듣고 말하기 어려움 없음</option></select></div>
                            <div><label className="block text-[12px] font-bold text-[#5D4037] mb-1">이동/서기</label><select name="envStndWalk" value={formData.envStndWalk} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"><option value="오랫동안 가능">오랫동안 가능</option></select></div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <label className="block text-[13px] font-bold text-[#5D4037] mb-1.5">자기소개</label>
                          <textarea name="introduction" value={formData.introduction} onChange={handleInputChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none" />
                        </div>
                      </div>
                  )}

                  {/* [STEP 3] 이력서 확인 (Preview) */}
                  {modalStep === 'preview' && selectedResume && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[15px] font-bold text-gray-900">{selectedResume.title}</span>
                          {selectedResume.isDefault && <span className="px-1.5 py-0.5 bg-orange-100 text-[#E66235] text-[11px] font-bold rounded">기본</span>}
                        </div>

                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4">
                          <div>
                            <p className="text-[11px] font-bold text-gray-400 mb-0.5">기본 정보</p>
                            <p className="text-[13px] text-gray-900 font-medium">{selectedResume.userName} ({selectedResume.disabilityType})</p>
                            <p className="text-[13px] text-gray-600 mt-1">{selectedResume.phone} | {selectedResume.email}</p>
                          </div>

                          <div className="border-t border-gray-100 pt-3">
                            <p className="text-[11px] font-bold text-gray-400 mb-1.5">근로 가능 환경</p>
                            <div className="grid grid-cols-2 gap-y-2 text-[12px]">
                              <span className="text-gray-500">상체/손 활용:</span> <span className="text-gray-900 font-medium">{selectedResume.envBothHands}</span>
                              <span className="text-gray-500">시각:</span> <span className="text-gray-900 font-medium">{selectedResume.envEyesight}</span>
                              <span className="text-gray-500">물건 다루기:</span> <span className="text-gray-900 font-medium">{selectedResume.envLiftPower}</span>
                              <span className="text-gray-500">의사소통:</span> <span className="text-gray-900 font-medium">{selectedResume.envLstnTalk}</span>
                              <span className="text-gray-500">이동/서기:</span> <span className="text-gray-900 font-medium">{selectedResume.envStndWalk}</span>
                            </div>
                          </div>

                          <div className="border-t border-gray-100 pt-3">
                            <p className="text-[11px] font-bold text-gray-400 mb-1.5">자기소개</p>
                            <p className="text-[13px] text-gray-800 leading-relaxed bg-white p-3 border border-gray-100 rounded-lg">
                              {selectedResume.introduction || "등록된 자기소개가 없습니다."}
                            </p>
                          </div>
                        </div>
                      </div>
                  )}
                </div>

                {/* 모달 푸터 */}
                {modalStep === 'create' && (
                    <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0">
                      <button onClick={() => setModalStep('select')} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-[#5D4037] font-bold text-sm hover:bg-gray-50">이전</button>
                      <button onClick={() => { alert('임시저장 되었습니다.'); setModalStep('select'); }} className="flex-1 py-3.5 rounded-xl bg-[#E66235] text-white font-bold text-sm hover:bg-[#D45326]">다음</button>
                    </div>
                )}

                {modalStep === 'preview' && (
                    <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0 bg-white">
                      <button onClick={() => { setModalStep('select'); setSelectedResume(null); }} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-[#5D4037] font-bold text-sm hover:bg-gray-50">
                        다른 이력서 선택
                      </button>
                      <button
                          onClick={handleApply}
                          disabled={isSubmitting}
                          className="flex-1 py-3.5 rounded-xl bg-[#E66235] text-white font-bold text-sm hover:bg-[#D45326] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 처리중...</>
                        ) : '이 이력서로 지원하기'}
                      </button>
                    </div>
                )}
              </div>
            </div>
        )}
      </>
  );
}