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
import FamilyManage from "./pages/Mother/FamilyManage.tsx"; // 🚀 이름 통일
import MyPage from "./pages/Mother/MyPage.tsx";

// 👨‍👩‍👦 가족(Family)용 메인 페이지
import FamilyHome from "./pages/FamilyRole/FamilyHome.tsx";
import FamilyChat from "./pages/FamilyRole/FamilyReport.tsx";
import FamilyRecord from "./pages/FamilyRole/FamilyRecord.tsx";
import FamilyMyPage from "./pages/FamilyRole/FamilyMyPage.tsx";
import FamilyInfo from "./pages/FamilyRole/FamilyInfo.tsx";

export default function App() {
  // 1. 앱 진행 단계 상태
  const [currentStep, setCurrentStep] = useState<
    "splash" | "role" | "login" | "motherInfo" | "connect" | "main"
  >("splash");

  // 2. 하단 네비게이션 탭 상태
  const [activeTab, setActiveTab] = useState("home");

  // 🌟 3. 현재 접속한 사용자의 역할 상태 (기본값은 null 또는 'mother')
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

  // 로그인 성공 시 실행할 라우팅 로직
  const handleLoginSuccess = () => {
    if (userRole === "family") {
      setCurrentStep("connect"); // 남편은 산모 정보 입력 패스하고 바로 연결!
    } else {
      setCurrentStep("motherInfo"); // 산모는 정보 입력으로!
    }
  };

  return (
    // 🚀 모든 화면(온보딩+메인)이 모바일 사이즈(max-w-430px) 안에서 보이도록 감싸줍니다.
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="relative h-screen w-full max-w-[430px] overflow-hidden bg-white shadow-2xl sm:h-[90vh] sm:rounded-[2rem]">
        {/* ---------------------------------------------------- */}
        {/* 🟢 [메인 화면] 하단 탭바(Layout)가 있는 상태 */}
        {/* ---------------------------------------------------- */}
        {currentStep === "main" && (
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
                {activeTab === "family" && <FamilyManage />}
                {activeTab === "mypage" && <MyPage />}
              </>
            )}

            {/* 👨‍👩‍👦 가족(남편) 모드일 때 렌더링되는 화면들 */}
            {userRole === "family" && (
              <>
                {activeTab === "home" && (
                  <FamilyHome setActiveTab={setActiveTab} />
                )}
                {activeTab === "chat" && <FamilyChat />}
                {activeTab === "record" && <FamilyRecord />}
                {activeTab === "family" && <FamilyInfo />}
                {activeTab === "mypage" && <FamilyMyPage />}
              </>
            )}
          </Layout>
        )}

        {/* ---------------------------------------------------- */}
        {/* 🟡 [온보딩 화면] 앱 초기 진입 및 가입 단계 (전체 화면) */}
        {/* ---------------------------------------------------- */}
        {currentStep === "splash" && <Splash />}

        {currentStep === "role" && (
          <SelectRole
            onNext={(role) => {
              setUserRole(role);
              setCurrentStep("login");
            }}
          />
        )}

        {/* 🚀 Login 컴포넌트 내부에서 카카오로그인 버튼 등을 누르면 onNext가 실행되게 설계! */}
        {currentStep === "login" && <Login onNext={handleLoginSuccess} />}

        {currentStep === "motherInfo" && (
          <MotherInfo onNext={() => setCurrentStep("connect")} />
        )}

        {currentStep === "connect" && (
          <SpouseConnect onNext={() => setCurrentStep("main")} />
        )}
      </div>
    </div>
  );
}
