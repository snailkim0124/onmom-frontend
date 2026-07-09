import React from "react";
import { AudioFilled, BellFilled, CalendarOutlined } from "@ant-design/icons";
import nightImg from "../../assets/images/night.png"; // 경로 확인 필요!

interface FamilyHomeProps {
  setActiveTab: (tab: string) => void;
}

const FamilyHome = ({ setActiveTab }: FamilyHomeProps) => {
  // 남편용 임시 데이터
  const user = {
    wifeName: "김산모",
    babyName: "튼튼이",
    weeks: 17,
    dDay: 132,
    nextHospitalVisit: "7월 15일 (수) 오전 10시",
  };

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-5 pb-24 overflow-y-auto gap-6 animate-fade-in">
      {/* 1. 상단 헤더 구역 */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <h1 className="font-gowun text-2xl font-bold text-gray-800">
            Good Morning,
          </h1>
          <h1 className="font-gowun text-2xl font-bold text-gray-800">
            남편님 👨‍👩‍👦
          </h1>
        </div>

        <div className="flex">
          <button className="relative p-2 text-gray-600 active:scale-95 transition">
            <BellFilled className="text-indigo-500 text-3xl" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
          </button>

          {/* 취침 모드 */}
          <button className="relative p-2 text-gray-600 active:scale-95 transition">
            <img src={nightImg} alt="night mode" />
          </button>
        </div>
      </div>

      {/* 2. 남편 전용 AI 코칭 리포트 (채팅 대신 단방향 브리핑) */}
      <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200/50 via-[#F8F9FF] to-[#E5E8FF] p-6 shadow-md border border-indigo-100/60 flex flex-col gap-4">
        <div>
          <h2 className="font-gowun text-xl font-black text-gray-800">
            오늘의 AI 코칭 브리핑
          </h2>
        </div>

        <div className="font-gowun flex flex-col text-sm text-gray-600">
          <span>아내가 남긴 감정 기록을 바탕으로</span>
          <span>온맘 AI가 맞춤형 조언을 준비했어요.</span>
        </div>

        <button
          onClick={() => setActiveTab("report")}
          className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-white shadow-md active:scale-95 transition-all font-bold"
        >
          <span className="text-lg">✨</span>
          오늘의 코멘트 확인하기
        </button>
      </div>

      {/* 3. 아기 상태 일러스트 카드 (산모와 동일 레이아웃, 인디고 테마) */}
      <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-500">
              {user.weeks}주차 4일차
            </span>
            <h2 className="mt-2 font-gowun text-2xl font-black text-gray-800">
              {user.babyName} 만나는 날
            </h2>
          </div>
          <span className="font-gowun text-3xl font-black text-indigo-500">
            D-{user.dDay}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 rounded-xl bg-appBg p-4">
          <span className="text-4xl">👶</span>
          <p className="text-sm text-gray-600 leading-relaxed">
            "아빠, 엄마가 요즘 다리가 많이 붓는대요. 오늘 퇴근하고 엄마 다리 꼭
            주물러 주세요!"
          </p>
        </div>
      </div>

      {/* 4. 아내의 한마디 (배우자 상호작용 구역) */}
      <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pinky/10 text-xl">
            👩‍🍼
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-400">아내의 한마디</h4>
            <p className="text-sm font-medium text-gray-700 mt-0.5">
              "오늘 퇴근길에 🍓 딸기 사다 주면 좋겠어 여보! ❤️"
            </p>
          </div>
          <span className="text-xs text-gray-400">1시간 전</span>
        </div>
      </div>

      {/* 5. 아내 진료 일정 요약 카드 */}
      <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
            <CalendarOutlined className="text-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold">
              아내 다음 병원 가는 날
            </span>
            <span className="font-gowun text-sm font-bold text-gray-700 mt-0.5">
              {user.nextHospitalVisit}
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
          동행 체크
        </button>
      </div>

      {/* 6. 주요 기능 그리드 구역 */}
      <div className="flex flex-col gap-3">
        <h3 className="font-gowun text-base font-bold text-gray-500 pl-1">
          오늘의 서포트
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* 카드 1 */}
          <div
            onClick={() => setActiveTab("record")}
            className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
          >
            <span className="text-2xl">🌸</span>
            <span className="font-bold text-gray-800 text-sm">아내의 기분</span>
            <span className="text-xs text-gray-400">오늘의 감정 기록</span>
          </div>

          {/* 카드 2 */}
          <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-gray-800 text-sm">오늘의 미션</span>
            <span className="text-xs text-gray-400">AI 추천 서포트</span>
          </div>

          {/* 카드 3 */}
          <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2">
            <span className="text-2xl">💡</span>
            <span className="font-bold text-gray-800 text-sm">주차별 정보</span>
            <span className="text-xs text-gray-400">아빠가 알아야 할 것</span>
          </div>

          {/* 카드 4 */}
          <div
            onClick={() => setActiveTab("report")}
            className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
          >
            <span className="text-2xl">📝</span>
            <span className="font-bold text-gray-800 text-sm">AI 리포트</span>
            <span className="text-xs text-gray-400">아내 맞춤형 조언</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyHome;
