import React, { useState, useEffect } from "react";
import Layout from "./components/layout/Layout.tsx";

// 📌 공통 온보딩 페이지
import Splash from "./pages/Onboarding/Splash.tsx";
import SelectRole from "./pages/Onboarding/SelectRole.tsx";
import Login from "./pages/Onboarding/Login.tsx";

// 👩‍🍼 산모(Mother)용 메인 페이지
import MotherInfo from "./pages/Onboarding/MotherInfo.tsx";
import SpouseConnect from "./pages/Onboarding/SpouseConnect.tsx";
import Home from "./pages/Mother/Home.tsx";
import AiChat from "./pages/Mother/Aichat.tsx";
import Record from "./pages/Mother/Record.tsx";
import Family from "./pages/Mother/FamilyManage.tsx";
import MyPage from "./pages/Mother/MyPage.tsx";

// 가족(Family)용 메인 페이지
import FamilyHome from "./pages/FamilyRole/FamilyHome.tsx";
import FamilyChat from "./pages/FamilyRole/FamilyReport.tsx";

const FamilyRecord = () => (
  <div className="p-6 font-bold">📅 아내의 기록 보기 (준비 중)</div>
);
const FamilyMyPage = () => (
  <div className="p-6 font-bold">⚙️ 남편용 마이페이지 (준비 중)</div>
);

export default function App() {
  // 1. 앱 진행 단계 상태
  const [currentStep, setCurrentStep] = useState<
    "splash" | "role" | "login" | "motherInfo" | "connect" | "main"
  >("splash");

  // 2. 하단 네비게이션 탭 상태
  const [activeTab, setActiveTab] = useState("home");

  // 🌟 3. [핵심] 현재 접속한 사용자의 역할 상태 (기본값은 null 또는 'mother')
  const [userRole, setUserRole] = useState<"mother" | "family" | null>(
    "mother",
  );

  // 스플래시 화면 타이머
  useEffect(() => {
    if (currentStep === "splash") {
      const timer = setTimeout(() => setCurrentStep("role"), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  if (currentStep === "main") {
    return (
      <Layout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
      >
        {/* 👩‍🍼 산모 모드일 때 렌더링되는 화면들 */}
        {userRole === "mother" && (
          <>
            {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
            {activeTab === "chat" && <AiChat />}
            {activeTab === "record" && <Record />}
            {activeTab === "family" && <Family />}
            {activeTab === "mypage" && <MyPage />}
          </>
        )}

        {/* 👨‍👩‍👦 가족 모드일 때 렌더링되는 화면들 */}
        {userRole === "family" && (
          <>
            {activeTab === "home" && <FamilyHome />}
            {activeTab === "chat" && <FamilyChat />}
            {activeTab === "record" && <FamilyRecord />}
            {activeTab === "family" && (
              <div className="p-6">우리 가족 연결 설정</div>
            )}
            {activeTab === "mypage" && <FamilyMyPage />}
          </>
        )}
      </Layout>
    );
  }

  // ----------------------------------------------------
  // 🟡 [온보딩 화면] 앱 초기 진입 및 가입 단계
  // ----------------------------------------------------
  return (
    <>
      {currentStep === "splash" && <Splash />}

      {/* 역할 선택 화면: 여기서 "산모"인지 "남편"인지 선택하면 userRole을 업데이트! */}
      {currentStep === "role" && (
        <SelectRole
          onNext={(role) => {
            setUserRole(role); // 선택한 역할 저장
            setCurrentStep("login"); // 다음 단계로 이동
          }}
        />
      )}

      {currentStep === "login" && (
        <div
          onClick={() => {
            // 남편이면 정보 입력 패스하고 바로 메인으로 가거나, 남편용 연결 코드로 이동
            if (userRole === "family") {
              setCurrentStep("connect"); // 임시로 연결 화면으로 보냄
            } else {
              setCurrentStep("motherInfo");
            }
          }}
        >
          <Login />
        </div>
      )}

      {currentStep === "motherInfo" && (
        <MotherInfo onNext={() => setCurrentStep("connect")} />
      )}

      {currentStep === "connect" && (
        <SpouseConnect onNext={() => setCurrentStep("main")} />
      )}
    </>
  );
}
