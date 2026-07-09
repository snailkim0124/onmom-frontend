import React from "react";
import { AudioFilled, BellFilled, CalendarOutlined } from "@ant-design/icons";
import nightImg from "../../assets/images/night.png";
import siriImg from "../../assets/images/siri.png";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home = ({ setActiveTab }: HomeProps) => {
  const user = {
    babyName: "튼튼이",
    weeks: 17,
    dDay: 132,
    nextHospitalVisit: "7월 15일 (수) 오전 10시",
  };

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-5 pb-24 overflow-y-auto gap-6">
      {/* 1. 상단 헤더 구역 */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <h1 className="font-gowun text-2xl font-bold text-gray-800">
            Good Morning,
          </h1>{" "}
          <h1 className="font-gowun text-2xl font-bold text-gray-800">
            OOO님 🌸
          </h1>
        </div>

        <div className="flex">
          <button className="relative p-2 text-gray-600 active:scale-95 transition">
            <BellFilled className="text-pinky text-3xl" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pinky animate-ping"></span>
          </button>

          {/* 취침 모드 */}
          <button className="relative p-2 text-gray-600 active:scale-95 transition">
            <img src={nightImg} />
          </button>
        </div>
      </div>

      {/* 2. 핵심 상태 대시보드 구역 */}
      <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pinky/45 via-[#FFF9F8] to-[#FFEAE5] p-6 shadow-md border border-[#FFD0C7]/60 flex flex-col gap-4">
        {/* 1. 상단 타이틀 영역 */}
        <div>
          <h2 className="font-gowun text-xl font-black text-gray-800">
            오늘 기분은 어떤가요?
          </h2>
        </div>

        <div className="font-gowun flex flex-col text-sm text-gray-600">
          <span>지금 이야기하면</span>
          <span>AI가 이해하고 도와줄 거에요.</span>
        </div>

        <div className="relative mt-2 flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-white bg-white/50 shadow-inner">
          {/* 배경에 깔리는 안내 텍스트 (깜빡거림 효과) */}
          <span className="font-gowun text-sm font-medium text-pinky/60 animate-pulse pl-8">
            밀어서 녹음하기 {">>>"}
          </span>

          {/* 3. 스와이프 손잡이 (버튼) - CSS로 일단 맨 왼쪽에 고정시켜둠! */}
          <div className="absolute left-1 top-1 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-pinky shadow-lg active:cursor-grabbing active:scale-95 transition-transform">
            <AudioFilled className="text-xl text-white" />
          </div>
        </div>
      </div>

      {/* 아기 상태 일러스트나 요약 문구가 들어갈 자리 */}
      <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block rounded-full bg-pinky/10 px-3 py-1 text-xs font-bold text-pinky">
              17주차 4일차
            </span>
            <h2 className="mt-2 font-gowun text-2xl font-black text-gray-800">
              튼튼이 만나는 날
            </h2>
          </div>
          <span className="font-gowun text-3xl font-black text-pinky">
            D-158
          </span>
        </div>
        <div className="mt-2 flex items-center gap-4 rounded-xl bg-appBg p-4">
          <span className="text-4xl">👶</span>
          <p className="text-sm text-gray-600 leading-relaxed">
            "엄마, 지금 저는 망고 한 개 크기만큼 자랐어요! 주변 소리도 조금씩
            들을 수 있답니다."
          </p>
        </div>
      </div>

      {/* 3. 배우자 상호작용 구역 */}
      <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xl">
            🙋‍♂️
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-400">배우자의 한마디</h4>
            <p className="text-sm font-medium text-gray-700 mt-0.5">
              "오늘 보건소 갈 때 조심히 다녀와 여보! ❤️"
            </p>
          </div>
          <span className="text-xs text-gray-400">방금 전</span>
        </div>
      </div>

      {/* 2. 다음 진료 일정 요약 카드 */}
      <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
            <CalendarOutlined className="text-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold">
              다음 병원 가는 날
            </span>
            <span className="font-gowun text-sm font-bold text-gray-700 mt-0.5">
              {user.nextHospitalVisit}
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
          변경
        </button>
      </div>

      {/* 4. 주요 기능 그리드 구역 (2줄씩 배치) */}
      <div className="flex flex-col gap-3">
        <h3 className="font-gowun text-base font-bold text-gray-500 pl-1">
          오늘의 기록
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* 카드 1 */}
          <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2">
            <span className="text-2xl">📅</span>
            <span className="font-bold text-gray-800 text-sm">일정 관리</span>
            <span className="text-xs text-gray-400">정기 검진일 체크</span>
          </div>

          {/* 카드 2 */}
          <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2">
            <span className="text-2xl">⚖️</span>
            <span className="font-bold text-gray-800 text-sm">신체 기록</span>
            <span className="text-xs text-gray-400">몸무게 및 증상</span>
          </div>

          {/* 카드 3 */}
          <div className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2">
            <span className="text-2xl">🥗</span>
            <span className="font-bold text-gray-800 text-sm">영양 정보</span>
            <span className="text-xs text-gray-400">주수별 추천 식단</span>
          </div>

          {/* 카드 4 */}
          <div
            onClick={() => setActiveTab("chat")}
            className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
          >
            <span className="text-2xl">💬</span>
            <span className="font-bold text-gray-800 text-sm">온맘 대화</span>
            <span className="text-xs text-gray-400">AI 코칭 상담소</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
