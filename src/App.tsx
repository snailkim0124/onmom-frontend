import React, { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";

// 📌 공통 온보딩 페이지
import Splash from "./pages/Onboarding/Splash";
import SelectRole from "./pages/Onboarding/SelectRole";
import Login from "./pages/Onboarding/Login";
import KakaoCallback from "./pages/Onboarding/KakaoCallback"; // 🚀 주소지에 맞게 콜백 컴포넌트 추가

// 👩‍🍼 산모(Mother)용 메인 페이지
import MotherInfo from "./pages/Onboarding/MotherInfo";
import SpouseConnect from "./pages/Onboarding/SpouseConnect";
import Home from "./pages/Mother/Home";
import AiChat from "./pages/Mother/Aichat";
import Record from "./pages/Mother/Record";
import FamilyManage from "./pages/Mother/FamilyManage";
import MyPage from "./pages/Mother/MyPage";

// 👨‍👩‍👦 가족(Family)용 메인 페이지
import FamilyHome from "./pages/FamilyRole/FamilyHome";
import FamilyChat from "./pages/FamilyRole/FamilyReport";
import FamilyRecord from "./pages/FamilyRole/FamilyRecord";
import FamilyMyPage from "./pages/FamilyRole/FamilyMyPage";
import FamilyInfo from "./pages/FamilyRole/FamilyInfo";

export default function App() {
  // 'callback' 단계를 step 조건에 추가
  const [currentStep, setCurrentStep] = useState<
    "splash" | "role" | "login" | "callback" | "motherInfo" | "connect" | "main"
  >("splash");

  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState<"MOTHER" | "FAMILY" | null>(
    "MOTHER",
  );

  //  진입 주소를 감지하는 인터셉터 배치 (카카오 리다이렉트 대응용)
  useEffect(() => {
    if (window.location.pathname === "/auth/kakao/callback") {
      setCurrentStep("callback");
    }
  }, []);

  // 스플래시 화면 타이머 (주소창이 콜백이 아닐 때만 작동하도록 안전 가드 추가)
  useEffect(() => {
    if (
      currentStep === "splash" &&
      window.location.pathname !== "/auth/kakao/callback"
    ) {
      const timer = setTimeout(() => setCurrentStep("role"), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // 로그인 성공 후 내부 단계 이동 핸들러
  const handleLoginSuccess = (role: "MOTHER" | "FAMILY") => {
    setUserRole(role); // 백엔드 검증 결과값으로 최종 동기화
    if (role === "FAMILY") {
      setCurrentStep("connect");
    } else {
      setCurrentStep("motherInfo");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="relative h-screen w-full max-w-[430px] overflow-hidden bg-white shadow-2xl sm:h-[90vh] sm:rounded-[2rem]">
        {/* 🟢 [메인 화면] 하단 탭바(Layout)가 있는 상태 */}
        {currentStep === "main" && (
          <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
          >
            {userRole === "MOTHER" && (
              <>
                {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
                {activeTab === "chat" && <AiChat />}
                {activeTab === "record" && <Record />}
                {activeTab === "FAMILY" && <FamilyManage />}
                {activeTab === "mypage" && (
                  <MyPage setActiveTab={setActiveTab} />
                )}
              </>
            )}

            {userRole === "FAMILY" && (
              <>
                {activeTab === "home" && (
                  <FamilyHome setActiveTab={setActiveTab} />
                )}
                {activeTab === "chat" && <FamilyChat />}
                {activeTab === "record" && <FamilyRecord />}
                {activeTab === "FAMILY" && <FamilyInfo />}
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

        {/* 🚀 userRole 상태 주입 */}
        {currentStep === "login" && (
          <Login
            userRole={userRole}
            onNext={() => handleLoginSuccess(userRole || "MOTHER")}
          />
        )}

        {/* 🚀 카카오 인증코드를 받아 백엔드 JWT를 받아낼 전용 핸들러 연결 */}
        {currentStep === "callback" && (
          <KakaoCallback
            onLoginSuccess={(finalRole) => handleLoginSuccess(finalRole)}
            onLoginFailure={() => setCurrentStep("login")}
          />
        )}

        {currentStep === "motherInfo" && (
          <MotherInfo onNext={() => setCurrentStep("connect")} />
        )}

        {currentStep === "connect" && (
          <SpouseConnect
            userRole={userRole === "FAMILY" ? "FAMILY" : "MOTHER"}
            onNext={() => setCurrentStep("main")}
          />
        )}
      </div>
    </div>
  );
}
