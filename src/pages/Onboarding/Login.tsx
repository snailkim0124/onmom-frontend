import React from "react";
import kakaoLogo from "../../assets/images/kakao.webp";
import googleLogo from "../../assets/images/google.webp";
import appleLogo from "../../assets/images/apple.webp";

const Login = () => {
  const btnBaseStyle =
    "w-full rounded-xl py-4 text-lg font-bold flex items-center justify-center gap-3 transition duration-200 active:scale-[0.98]";

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 bg-appBg">
      {/* 상단 안내 문구 */}
      <div className="mb-12 text-center">
        <h1 className="font-gowun text-3xl font-extrabold text-gray-800">
          간편 로그인
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          온 맘에 오신 것을 환영합니다
        </p>
      </div>

      {/* 버튼 3개 배치 영역 */}
      <div className="flex w-full flex-col gap-4">
        {/* 1. 카카오 로그인 */}
        <button
          className={`${btnBaseStyle} bg-[#FEE500] text-[#000000] opacity-85 hover:opacity-100`}
        >
          {/* 아이콘을 왼쪽 끝에 고정 (absolute left-6) */}
          <img
            src={kakaoLogo}
            alt="카카오 로고"
            className="left-6 w-6 h-6 object-contain"
          />
          카카오로 시작하기
        </button>

        {/* 2. 구글 로그인 */}
        <button
          className={`${btnBaseStyle} bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50`}
        >
          <img
            src={googleLogo}
            alt="구글 로고"
            className="left-6 w-6 h-6 object-contain"
          />
          구글로 시작하기
        </button>

        {/* 3. 애플 로그인 */}
        <button
          className={`${btnBaseStyle} bg-black text-white hover:bg-gray-800`}
        >
          <img
            src={appleLogo}
            alt="애플 로고"
            className="left-6 w-6 h-6 object-contain"
          />
          Apple로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
