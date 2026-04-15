import React from 'react';
import { useParams } from "react-router-dom";
// 컴포넌트 임포트
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobDetailComponent from "../components/jobs/JobDetail";
// 데이터 임포트
import { sampleJobs } from "../data/sampleJobs";

export default function JobDetail() {
  // URL 파라미터에서 id 추출
  const { id } = useParams();
  // 샘플 데이터에서 해당 id의 공고 찾기
  const job = sampleJobs.find((j) => String(j.id) === String(id));

  return (
    <>
      <Header />
      {/* 공고 상세 컴포넌트에 job 데이터 전달 */}
      <JobDetailComponent job={job} />
      <Footer />
    </>
  );
}