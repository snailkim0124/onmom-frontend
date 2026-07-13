import React, { useState, useEffect } from "react";
import { AudioFilled, BellFilled, CalendarOutlined } from "@ant-design/icons";
import nightImg from "../../assets/images/night.png";
import siriImg from "../../assets/images/siri.png";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home = ({ setActiveTab }: HomeProps) => {
  // 🚀 1. 실제 API 데이터와 가상(Mock) 데이터를 통합 관리하는 상태
  const [userInfo, setUserInfo] = useState({
    // [실제 API 연동 영역]
    nickname: "산모",
    babyName: "튼튼이",
    pregnancyWeekStart: 17,
    dDay: 158,

    // [아직 백엔드 API가 없어서 가상 데이터로 채우는 영역]
    spouseMessage: "오늘 보건소 갈 때 조심히 다녀와 여보! ❤️",
    spouseMessageTime: "방금 전",
    nextHospitalVisit: "7월 15일 (수) 오전 10시",
    babyTip: "엄마, 지금 저는 망고 한 개 크기만큼 자랐어요! 주변 소리도 조금씩 들을 수 있답니다.",
  });

  // 🚀 2. 화면이 켜질 때 실제 데이터가 있으면 가로채서 바인딩하고, 없으면 가상 데이터 유지
  useEffect(() => {
    // KakaoCallback 등에서 저장해둔 실제 서버 데이터 파싱
    const savedNickname = localStorage.getItem("userNickname");
    const savedBabyName = localStorage.getItem("babyNickname");
    const savedWeek = localStorage.getItem("pregnancyWeekStart");

    setUserInfo((prev) => ({
      ...prev,
      // 실제 값이 존재할 때만 교체하고, 없으면 기존 기본 가상 데이터를 유지합니다.
      nickname: savedNickname || prev.nickname,
      babyName: savedBabyName || prev.babyName,
      pregnancyWeekStart: savedWeek ? Number(savedWeek) : prev.pregnancyWeekStart,
    }));

    // TODO: 대시보드 API 구현되면 풀기
    /*
    const fetchHomeData = async () => {
      try {
        const response = await api.get('/api/v1/home-dashboard');
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("홈 대시보드 조회 실패:", error);
      }
    };
    fetchHomeData();
    */
  }, []);

  // 🚀 3. 하단 주요 기능 카드 클릭 시 안내 액션 처리 핸들러
  const handleFeatureClick = (featureName: string) => {
    alert(`[${featureName}] 기능은 현재 가상 모드로 구동 중입니다. 백엔드 API가 추가되면 연동될 예정이에요! ✨`);
  };

  return (
      <div className="flex min-h-screen flex-col bg-appBg p-5 pb-24 overflow-y-auto gap-6">
        {/* 1. 상단 헤더 구역 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <h1 className="font-gowun text-2xl font-bold text-gray-800">
              Good Morning,
            </h1>
            <h1 className="font-gowun text-2xl font-bold text-gray-800">
              {userInfo.nickname}님 🌸
            </h1>
          </div>

          <div className="flex">
            <button className="relative p-2 text-gray-600 active:scale-95 transition">
              <BellFilled className="text-pinky text-3xl" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pinky animate-ping"></span>
            </button>

            {/* 취침 모드 */}
            <button className="relative p-2 text-gray-600 active:scale-95 transition">
              <img src={nightImg} alt="취침모드" />
            </button>
          </div>
        </div>

        {/* 2. 핵심 상태 대시보드 구역 */}
        <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pinky/45 via-[#FFF9F8] to-[#FFEAE5] p-6 shadow-md border border-[#FFD0C7]/60 flex flex-col gap-4">
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
          <span className="font-gowun text-sm font-medium text-pinky/60 animate-pulse pl-8">
            밀어서 녹음하기 {">>>"}
          </span>

            <div className="absolute left-1 top-1 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-pinky shadow-lg active:cursor-grabbing active:scale-95 transition-transform">
              <AudioFilled className="text-xl text-white" />
            </div>
          </div>
        </div>

        {/* 3. 아기 상태 일러스트 요약 구역 */}
        <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
          <div className="flex justify-between items-start">
            <div>
            <span className="inline-block rounded-full bg-pinky/10 px-3 py-1 text-xs font-bold text-pinky">
              {userInfo.pregnancyWeekStart}주차 정보
            </span>
              <h2 className="mt-2 font-gowun text-2xl font-black text-gray-800">
                {userInfo.babyName} 만나는 날
              </h2>
            </div>
            <span className="font-gowun text-3xl font-black text-pinky">
            D-{userInfo.dDay}
          </span>
          </div>
          <div className="mt-2 flex items-center gap-4 rounded-xl bg-appBg p-4">
            <span className="text-4xl">👶</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              "{userInfo.babyTip}" {/* 🚀 가상 팁 멘트 데이터 결합 */}
            </p>
          </div>
        </div>

        {/* 4. 배우자 상호작용 구역 */}
        <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xl">
              🙋‍♂️
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-400">배우자의 한마디</h4>
              <p className="text-sm font-medium text-gray-700 mt-0.5">
                "{userInfo.spouseMessage}" {/* 🚀 가상 한마디 메시지 결합 */}
              </p>
            </div>
            <span className="text-xs text-gray-400">{userInfo.spouseMessageTime}</span>
          </div>
        </div>

        {/* 5. 다음 진료 일정 요약 카드 */}
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
              {userInfo.nextHospitalVisit} {/* 🚀 가상 진료 일정 결합 */}
            </span>
            </div>
          </div>
          <button
              onClick={() => handleFeatureClick("병원 일정 변경")}
              className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
          >
            변경
          </button>
        </div>

        {/* 6. 주요 기능 그리드 구역 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-gowun text-base font-bold text-gray-500 pl-1">
            오늘의 기록
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* 일정 관리 카드 */}
            <div
                onClick={() => handleFeatureClick("일정 관리")}
                className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
            >
              <span className="text-2xl">📅</span>
              <span className="font-bold text-gray-800 text-sm">일정 관리</span>
              <span className="text-xs text-gray-400">정기 검진일 체크</span>
            </div>

            {/* 신체 기록 카드 */}
            <div
                onClick={() => handleFeatureClick("신체 기록")}
                className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
            >
              <span className="text-2xl">⚖️</span>
              <span className="font-bold text-gray-800 text-sm">신체 기록</span>
              <span className="text-xs text-gray-400">몸무게 및 증상</span>
            </div>

            {/* 영양 정보 카드 */}
            <div
                onClick={() => handleFeatureClick("영양 정보")}
                className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-gray-100/50 active:scale-[0.98] transition flex flex-col gap-2"
            >
              <span className="text-2xl">🥗</span>
              <span className="font-bold text-gray-800 text-sm">영양 정보</span>
              <span className="text-xs text-gray-400">주수별 추천 식단</span>
            </div>

            {/* 온맘 대화 카드 (실제 연결된 탭 이동 유지) */}
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