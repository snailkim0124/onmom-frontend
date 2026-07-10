import React from "react";
import kakaoLogo from "../../assets/images/kakao.webp";
import googleLogo from "../../assets/images/google.webp";
import appleLogo from "../../assets/images/apple.webp";

// 🚀 1. App.tsx에서 넘겨주는 onNext 함수를 받기 위한 타입 정의
interface LoginProps {
  onNext: () => void;
}

const Login = ({ onNext }: LoginProps) => {
  // 🚀 2. 버튼에 relative 추가 (안의 absolute 로고를 가두기 위해!)
  const btnBaseStyle =
    "relative w-full rounded-xl py-4 text-base font-bold flex items-center justify-center transition duration-200 active:scale-[0.98]";

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
          onClick={onNext}
          className={`${btnBaseStyle} bg-[#FEE500] text-[#000000] opacity-90 hover:opacity-100`}
        >
          {/* 🚀 4. 이미지에 absolute 추가 */}
          <img
            src={kakaoLogo}
            alt="카카오 로고"
            className="absolute left-6 h-6 w-6 object-contain"
          />
          카카오로 시작하기
        </button>

        {/* 2. 구글 로그인 */}
        <button
          onClick={onNext}
          className={`${btnBaseStyle} bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50`}
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
          onClick={onNext}
          className={`${btnBaseStyle} bg-black text-white hover:bg-gray-800 shadow-md`}
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
