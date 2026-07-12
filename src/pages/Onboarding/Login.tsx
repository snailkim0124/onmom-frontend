import React from "react";
import kakaoLogo from "../../assets/images/kakao.webp";
import googleLogo from "../../assets/images/google.webp";
import appleLogo from "../../assets/images/apple.webp";

interface LoginProps {
  onNext: () => void;
}

const Login = ({ onNext }: LoginProps) => {
  const btnBaseStyle =
      "relative w-full rounded-xl py-4 text-base font-bold flex items-center justify-center transition duration-200 active:scale-[0.98]";

  // 🚀 카카오 인가 코드 요청 핸들러
  const handleKakaoLogin = () => {
    // 백엔드 README 기준 설정 값들
    const REST_API_KEY = "YOUR_KAKAO_REST_API_KEY"; // 백엔드 ONMOM_KAKAO_CLIENT_ID와 동일한 값
    const REDIRECT_URI = window.location.origin + "/auth/kakao-callback"; // 백엔드 ONMOM_KAKAO_REDIRECT_URI와 동일한 값

    // CSRF 방지를 위한 state 생성 (백엔드 지침 반영)
    const state = Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem("oauth_state", state);

    // 카카오 인증 URL로 이동
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

    window.location.href = kakaoAuthUrl;
  };

  const handleUnimplementedLogin = (provider: string) => {
    alert(`${provider} 로그인은 현재 준비 중입니다. 카카오 로그인을 이용해 주세요!`);
  };

  return (
      <div className="flex h-screen flex-col items-center justify-center p-6 bg-appBg animate-fade-in">
        {/* 상단 안내 문구 */}
        <div className="mb-12 text-center">
          <h1 className="font-gowun text-3xl font-extrabold text-gray-800">
            간편 로그인
          </h1>
          <p className="mt-3 font-gowun text-sm text-gray-500">
            온맘에 오신 것을 환영합니다
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {/* 1. 카카오 로그인 */}
          <button
              onClick={handleKakaoLogin} // 🚀 카카오 로그인 핸들러 연결
              className={`${btnBaseStyle} bg-[#FEE500] text-[#000000] opacity-90 hover:opacity-100`}
          >
            <img
                src={kakaoLogo}
                alt="카카오 로고"
                className="absolute left-6 h-6 w-6 object-contain"
            />
            카카오로 시작하기
          </button>

          {/* 2. 구글 로그인 */}
          <button
              onClick={() => handleUnimplementedLogin("구글")} // 🚀 미지원 안내
              className={`${btnBaseStyle} bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 opacity-50`}
          >
            <img
                src={googleLogo}
                alt="구글 로고"
                className="absolute left-6 h-6 w-6 object-contain"
            />
            구글로 시작하기
          </button>

          {/* 3. 애플 로그인 */}
          <button
              onClick={() => handleUnimplementedLogin("Apple")} // 🚀 미지원 안내
              className={`${btnBaseStyle} bg-black text-white hover:bg-gray-800 shadow-md opacity-50`}
          >
            <img
                src={appleLogo}
                alt="애플 로고"
                className="absolute left-6 h-6 w-6 object-contain"
            />
            Apple로 시작하기
          </button>
        </div>
      </div>
  );
};

export default Login;