import React, { useState, useEffect } from "react";
import { CheckCircleFilled, HeartFilled } from "@ant-design/icons";
import { api } from "../../api/axios";

// 🚀 백엔드에서 내려주는 메시지 및 인사이트 규격 정의
interface FamilyMessageData {
  moodLabel: string;
  symptoms: string;
  aiCommentary: string;
  actionPlan: string;
  isActionCompleted: boolean;
}

const FamilyReport = () => {
  // 🚀 API 데이터를 담을 상태 관리 (실서버 연동 전까지 가짜 데이터로 레이아웃 유지)
  const [reportData, setReportData] = useState<FamilyMessageData>({
    moodLabel: "피로감이 몰려온 날 😴",
    symptoms: "다리 부종, 허리 통증",
    aiCommentary: "오늘 아내분은 체중 증가와 혈액량 변화로 인해 다리가 많이 붓고 피로를 느끼고 있어요. 평소보다 조금 더 세심한 배려가 필요한 날입니다. 무거운 물건은 대신 들어주시고, 잠들기 전 따뜻한 물로 족욕을 준비해 주시면 아내의 컨디션 회복에 아주 큰 도움이 될 거예요!",
    actionPlan: "잠들기 전 10분 종아리 마사지 해주기",
    isActionCompleted: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // 🚀 컴포넌트 마운트 시 배우자 수신 메시지 최신 건 조회 (Cursor Pagination 기반 예시)[cite: 1]
  useEffect(() => {
    const fetchFamilyReport = async () => {
      setIsLoading(true);
      try {
        // 🚀 백엔드 스펙: GET /api/v1/family-messages?size=20[cite: 1]
        // 헤더에 familyToken(Authorization: Bearer) 필수 탑재[cite: 1]
        console.log("백엔드 수신 메시지 API 호출: GET /api/v1/family-messages");[cite: 1]


        const response = await api.get('/api/v1/family-messages?size=1');


      } catch (error) {
        console.error("리포트 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamilyReport();
  }, []);

  // 🚀 추천 액션 체크 핸들러
  const handleToggleAction = () => {
    setReportData((prev) => ({
      ...prev,
      isActionCompleted: !prev.isActionCompleted,
    }));
  };

  if (isLoading) {
    return (
        <div className="flex h-64 items-center justify-center font-gowun text-sm text-gray-400">
          아내의 소중한 기록을 AI 분석 리포트로 가져오는 중입니다...
        </div>
    );
  }

  return (
      <div className="flex flex-col gap-6 animate-fade-in pb-10">
        {/* 1. 상단 타이틀 */}
        <div className="flex flex-col gap-1 px-1">
          <h1 className="font-gowun text-2xl font-black text-gray-800">
            오늘의 온맘 리포트 📝
          </h1>
          <p className="text-sm text-gray-500 font-gowun">
            아내의 하루를 돌아보고, 내일의 서포트를 준비해요.
          </p>
        </div>

        {/* 2. 아내의 오늘 상태 요약 */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <HeartFilled className="text-pinky text-lg" />
            <h2 className="font-gowun text-lg font-bold text-gray-700">
              오늘 아내는 이랬어요
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <span className="text-sm font-bold text-gray-500">기분</span>
              <span className="font-gowun text-base font-black text-gray-800">
              {reportData.moodLabel} {/* 🚀 기분 상태 동적 매핑 */}
            </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <span className="text-sm font-bold text-gray-500">신체 증상</span>
              <span className="font-gowun text-base font-black text-gray-800">
              {reportData.symptoms} {/* 🚀 신체 증상 동적 매핑 */}
            </span>
            </div>
          </div>
        </div>

        {/* 3. AI 맞춤형 코멘트 (핵심 기능!) */}
        <div className="flex flex-col gap-4 rounded-2xl bg-[#F0F2FF] p-6 shadow-sm border border-indigo-100">
          <div className="flex items-center gap-2 border-b border-indigo-100/50 pb-3">
            <span className="text-xl">🤖</span>
            <h2 className="font-gowun text-lg font-black text-indigo-500">
              AI 조력자 코멘트
            </h2>
          </div>

          <p className="font-gowun text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {reportData.aiCommentary} {/* 🚀 번역 및 해설 텍스트 동적 매핑 */}
          </p>

          {/* 액션 플랜 (미션) */}
          <div
              onClick={handleToggleAction}
              className="mt-2 flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
          >
          <span className="text-xs font-bold text-indigo-400">
            오늘의 추천 액션
          </span>
            <div className="flex items-center gap-3">
              <CheckCircleFilled
                  className={`text-xl transition-colors ${
                      reportData.isActionCompleted ? "text-green-500" : "text-gray-300"
                  }`}
              />
              <span className={`font-gowun text-sm font-bold transition-all ${
                  reportData.isActionCompleted ? "text-gray-400 line-through" : "text-gray-800"
              }`}>
              {reportData.actionPlan} {/* 🚀 미션 텍스트 동적 매핑 */}
            </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FamilyReport;