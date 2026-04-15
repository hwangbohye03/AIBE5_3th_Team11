import { useState } from "react";

export default function MemberMypageBody() {
    const [activeTab, setActiveTab] = useState("basic");

    const [profile, setProfile] = useState({
        name: "김다온",
        email: "daon.kim@email.com",
        phone: "010-1234-5678",
        address: "서울특별시 강남구",
        desiredJob: "프론트엔드 개발자",
        desiredSalary: "4000",
        disabilityType: "지체장애",
        disabilityGrade: "3급",
        accommodationNeeds: "휠체어 접근 가능 환경, 재택근무 우선 배정",
    });

    const handleChange = (field, value) => {
        setProfile({
            ...profile,
            [field]: value,
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">

            {/* 상단 프로필 */}
            <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                    👤
                </div>

                <div>
                    <h2 className="font-bold text-lg">{profile.name}</h2>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
            {profile.disabilityType} {profile.disabilityGrade}
          </span>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
                <button
                    onClick={() => setActiveTab("basic")}
                    className={`flex-1 py-2 rounded ${
                        activeTab === "basic" ? "bg-white shadow font-semibold" : ""
                    }`}
                >
                    기본정보
                </button>

                <button
                    onClick={() => setActiveTab("disability")}
                    className={`flex-1 py-2 rounded ${
                        activeTab === "disability" ? "bg-white shadow font-semibold" : ""
                    }`}
                >
                    장애정보
                </button>

                <button
                    onClick={() => setActiveTab("account")}
                    className={`flex-1 py-2 rounded ${
                        activeTab === "account" ? "bg-white shadow font-semibold" : ""
                    }`}
                >
                    계정설정
                </button>
            </div>

            {/* 기본정보 */}
            {activeTab === "basic" && (
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        value={profile.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="이름"
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={profile.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="이메일"
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={profile.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="전화번호"
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={profile.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="주소"
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={profile.desiredJob}
                        onChange={(e) => handleChange("desiredJob", e.target.value)}
                        placeholder="희망 직종"
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={profile.desiredSalary}
                        onChange={(e) => handleChange("desiredSalary", e.target.value)}
                        placeholder="희망 연봉"
                    />
                </div>
            )}

            {/* 장애정보 */}
            {activeTab === "disability" && (
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <select
                        className="w-full border p-2 rounded"
                        value={profile.disabilityType}
                        onChange={(e) => handleChange("disabilityType", e.target.value)}
                    >
                        <option>지체장애</option>
                        <option>시각장애</option>
                        <option>청각장애</option>
                        <option>언어장애</option>
                    </select>

                    <select
                        className="w-full border p-2 rounded"
                        value={profile.disabilityGrade}
                        onChange={(e) => handleChange("disabilityGrade", e.target.value)}
                    >
                        <option>1급</option>
                        <option>2급</option>
                        <option>3급</option>
                        <option>4급</option>
                        <option>5급</option>
                        <option>6급</option>
                    </select>

                    <textarea
                        className="w-full border p-2 rounded"
                        rows="4"
                        value={profile.accommodationNeeds}
                        onChange={(e) =>
                            handleChange("accommodationNeeds", e.target.value)
                        }
                    />
                </div>
            )}

            {/* 계정설정 */}
            {activeTab === "account" && (
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <input
                        type="password"
                        className="w-full border p-2 rounded"
                        placeholder="현재 비밀번호"
                    />

                    <input
                        type="password"
                        className="w-full border p-2 rounded"
                        placeholder="새 비밀번호"
                    />

                    <input
                        type="password"
                        className="w-full border p-2 rounded"
                        placeholder="새 비밀번호 확인"
                    />

                    <button className="w-full bg-blue-500 text-white py-2 rounded">
                        비밀번호 변경
                    </button>

                    <button className="w-full bg-red-500 text-white py-2 rounded">
                        계정 탈퇴
                    </button>
                </div>
            )}
        </div>
    );
}