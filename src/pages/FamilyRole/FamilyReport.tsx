import React from "react";
import { CheckCircleFilled, HeartFilled } from "@ant-design/icons";

const FamilyReport = () => {
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
              피로감이 몰려온 날 😴
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
            <span className="text-sm font-bold text-gray-500">신체 증상</span>
            <span className="font-gowun text-base font-black text-gray-800">
              다리 부종, 허리 통증
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

        <p className="font-gowun text-base text-gray-700 leading-relaxed">
          오늘 아내분은 임신 17주차에 접어들며 체중 증가와 혈액량 변화로 인해
          다리가 많이 붓고 피로를 느끼고 있어요.
          <br />
          <br />
          평소보다 조금 더 세심한 배려가 필요한 날입니다. 무거운 물건은 남편분이
          대신 들어주시고, 잠들기 전 따뜻한 물로 족욕을 준비해 주시면 아내의
          컨디션 회복에 아주 큰 도움이 될 거예요!
        </p>

        {/* 액션 플랜 (미션) */}
        <div className="mt-2 flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-indigo-400">
            오늘의 추천 액션
          </span>
          <div className="flex items-center gap-3">
            <CheckCircleFilled className="text-gray-300 text-xl" />
            <span className="font-gowun text-sm font-bold text-gray-800">
              잠들기 전 10분 종아리 마사지 해주기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyReport;
