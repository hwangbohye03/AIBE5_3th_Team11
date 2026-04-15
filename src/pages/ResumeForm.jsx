import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const emptyResume = {
  title: "",
  profile: {
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  skills: [],
  certificates: [],
};

export default function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [resume, setResume] = useState(emptyResume);
  const [skillInput, setSkillInput] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "basic", label: "기본정보" },
    { id: "experience", label: "경력" },
    { id: "education", label: "학력" },
    { id: "skills", label: "스킬/자격증" },
  ];

  /* ── 프로필 핸들러 ── */
  const handleProfile = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  /* ── 경력 ── */
  const addExperience = () =>
    setResume((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: "", position: "", period: "", description: "" },
      ],
    }));

  const updateExperience = (idx, field, value) =>
    setResume((prev) => {
      const arr = [...prev.experiences];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...prev, experiences: arr };
    });

  const removeExperience = (idx) =>
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== idx),
    }));

  /* ── 학력 ── */
  const addEducation = () =>
    setResume((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        { school: "", major: "", period: "", degree: "" },
      ],
    }));

  const updateEducation = (idx, field, value) =>
    setResume((prev) => {
      const arr = [...prev.educations];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...prev, educations: arr };
    });

  const removeEducation = (idx) =>
    setResume((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== idx),
    }));

  /* ── 스킬 ── */
  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || resume.skills.includes(s)) return;
    setResume((prev) => ({ ...prev, skills: [...prev.skills, s] }));
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  /* ── 자격증 ── */
  const addCertificate = () =>
    setResume((prev) => ({
      ...prev,
      certificates: [...prev.certificates, { name: "", issuer: "", date: "" }],
    }));

  const updateCertificate = (idx, field, value) =>
    setResume((prev) => {
      const arr = [...prev.certificates];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...prev, certificates: arr };
    });

  const removeCertificate = (idx) =>
    setResume((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== idx),
    }));

  /* ── 저장 ── */
  const handleSave = () => {
    if (!resume.title.trim()) {
      alert("이력서 제목을 입력해주세요.");
      return;
    }
    if (!resume.profile.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    setSaved(true);
    setTimeout(() => {
      navigate("/resumes");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/resumes" className="text-gray-500 hover:text-gray-800 text-sm">← 목록</Link>
            <h1 className="text-xl font-bold text-gray-900">
              {isEdit ? "이력서 수정" : "새 이력서 작성"}
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saved}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {saved ? "저장됨 ✓" : "저장하기"}
          </button>
        </div>

        {/* 탭 */}
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-0 border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* ── 기본정보 탭 ── */}
        {activeTab === "basic" && (
          <>
            {/* 이력서 제목 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                이력서 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={resume.title}
                onChange={(e) => setResume((p) => ({ ...p, title: e.target.value }))}
                placeholder="예: 프론트엔드 개발자 이력서"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 기본 프로필 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">기본 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "이름", name: "name", required: true, placeholder: "홍길동" },
                  { label: "이메일", name: "email", type: "email", placeholder: "example@email.com" },
                  { label: "전화번호", name: "phone", placeholder: "010-0000-0000" },
                  { label: "주소", name: "address", placeholder: "서울특별시 강남구" },
                  { label: "생년월일", name: "birthDate", type: "date" },
                ].map(({ label, name, type = "text", required, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs text-gray-500 mb-1">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={resume.profile[name]}
                      onChange={handleProfile}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">자기소개 / 요약</label>
                <textarea
                  name="summary"
                  value={resume.profile.summary}
                  onChange={handleProfile}
                  rows={4}
                  placeholder="본인의 강점과 경력을 간략히 소개해주세요."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </>
        )}

        {/* ── 경력 탭 ── */}
        {activeTab === "experience" && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">경력 사항</h2>
              <button
                onClick={addExperience}
                className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + 경력 추가
              </button>
            </div>
            {resume.experiences.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">아직 등록된 경력이 없습니다.</p>
            ) : (
              <div className="space-y-5">
                {resume.experiences.map((exp, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">경력 #{idx + 1}</span>
                      <button
                        onClick={() => removeExperience(idx)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        삭제
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "회사명", field: "company", placeholder: "(주)회사명" },
                        { label: "직책/직위", field: "position", placeholder: "프론트엔드 개발자" },
                        { label: "재직기간", field: "period", placeholder: "2020.03 ~ 2023.12" },
                      ].map(({ label, field, placeholder }) => (
                        <div key={field}>
                          <label className="block text-xs text-gray-500 mb-1">{label}</label>
                          <input
                            type="text"
                            value={exp[field]}
                            onChange={(e) => updateExperience(idx, field, e.target.value)}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">주요 업무 / 성과</label>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(idx, "description", e.target.value)}
                        placeholder="담당 업무 및 주요 성과를 입력해주세요."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 학력 탭 ── */}
        {activeTab === "education" && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">학력 사항</h2>
              <button
                onClick={addEducation}
                className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + 학력 추가
              </button>
            </div>
            {resume.educations.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">아직 등록된 학력이 없습니다.</p>
            ) : (
              <div className="space-y-5">
                {resume.educations.map((edu, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">학력 #{idx + 1}</span>
                      <button
                        onClick={() => removeEducation(idx)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        삭제
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "학교명", field: "school", placeholder: "○○대학교" },
                        { label: "전공", field: "major", placeholder: "컴퓨터공학과" },
                        { label: "재학기간", field: "period", placeholder: "2013.03 ~ 2017.02" },
                        { label: "학위", field: "degree", placeholder: "학사" },
                      ].map(({ label, field, placeholder }) => (
                        <div key={field}>
                          <label className="block text-xs text-gray-500 mb-1">{label}</label>
                          <input
                            type="text"
                            value={edu[field]}
                            onChange={(e) => updateEducation(idx, field, e.target.value)}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 스킬/자격증 탭 ── */}
        {activeTab === "skills" && (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">보유 스킬</h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="예: React, TypeScript"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addSkill}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-blue-400 hover:text-blue-700 ml-1 leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {resume.skills.length === 0 && (
                  <p className="text-sm text-gray-400">추가된 스킬이 없습니다.</p>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">자격증</h2>
                <button
                  onClick={addCertificate}
                  className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  + 자격증 추가
                </button>
              </div>
              {resume.certificates.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">아직 등록된 자격증이 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {resume.certificates.map((cert, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-600">자격증 #{idx + 1}</span>
                        <button
                          onClick={() => removeCertificate(idx)}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          삭제
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { label: "자격증명", field: "name", placeholder: "정보처리기사" },
                          { label: "발급기관", field: "issuer", placeholder: "한국산업인력공단" },
                          { label: "취득일", field: "date", placeholder: "2023.05" },
                        ].map(({ label, field, placeholder }) => (
                          <div key={field}>
                            <label className="block text-xs text-gray-500 mb-1">{label}</label>
                            <input
                              type="text"
                              value={cert[field]}
                              onChange={(e) => updateCertificate(idx, field, e.target.value)}
                              placeholder={placeholder}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
