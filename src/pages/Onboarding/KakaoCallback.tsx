import React, { useEffect } from "react";
import { api } from "../../api/axios";

interface LoginApiResponse {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  role: "MOTHER" | "FAMILY";
  tokenType: string;
  accessToken: string;
  expiresIn: number;
}

interface KakaoCallbackProps {
  onLoginSuccess: (role: "MOTHER" | "FAMILY") => void;
  onLoginFailure: () => void;
}

const KakaoCallback = ({
  onLoginSuccess,
  onLoginFailure,
}: KakaoCallbackProps) => {
  useEffect(() => {
    const handleLoginProcess = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      const savedState = sessionStorage.getItem("oauth_state");
      if (state !== savedState) {
        console.warn("OAuth state 값이 일치하지 않습니다.");
      }

      const selectedRole = localStorage.getItem("userRole") || "MOTHER";

      if (!code) {
        alert("카카오 로그인 인가 코드를 가져오지 못했습니다.");
        onLoginFailure();
        return;
      }

      try {
        const requestBody = {
          authorizationCode: code,
          role: selectedRole,
        };

        const response = await api.post(
          "/api/v1/auth/kakao-login",
          requestBody,
        );
        const responseData = response.data.data as LoginApiResponse;

        // 자체 JWT 토큰 브라우저 영구 보관 (우리 무전기에 토큰 장착 완료)
        localStorage.setItem("accessToken", responseData.accessToken);

        // 주소창 깔끔하게 밀어주기 (새로고침 시 재요청 방지)
        window.history.replaceState({}, document.title, window.location.origin);

        alert(`${responseData.nickname}님, 온맘에 오신 것을 환영합니다! 🎉`);

        // 백엔드 결과를 하위 소문자 포맷 규격으로 매핑하여 App.tsx에 성공 보고
        const appRole = responseData.role === "FAMILY" ? "FAMILY" : "MOTHER";
        onLoginSuccess(appRole);
      } catch (error) {
        console.error("카카오 로그인 연동 실패:", error);
        alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        onLoginFailure();
      }
    };

    handleLoginProcess();
  }, [onLoginSuccess, onLoginFailure]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-appBg p-6">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-pinky border-t-transparent"></div>
      <h2 className="mt-6 font-gowun text-xl font-bold text-gray-700">
        안전하게 로그인하는 중입니다
      </h2>
      <p className="mt-2 font-gowun text-sm text-gray-400">
        잠시만 기다려 주세요...
      </p>
    </div>
  );
};

export default KakaoCallback;
