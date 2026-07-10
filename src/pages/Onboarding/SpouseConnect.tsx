import React, { useState } from "react";
import Button from "../../components/common/Button.tsx";

interface SpouseConnectProps {
  onNext: () => void;
  // 나중에 userRole("mother" | "family")을 Props로 받아서
  // 산모면 '내 코드 복사'를, 남편이면 '코드 입력창'을 먼저 보여주게 분기 처리할 수도 있어!
}

const SpouseConnect = ({ onNext }: SpouseConnectProps) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // 1. 산모용: 내 초대 코드 복사하기
  const handleCopyCode = async () => {
    try {
      // 나중에는 백엔드에서 GET 해온 코드를 여기에 넣으면 돼!
      const myCode = "ABC123";
      await navigator.clipboard.writeText(myCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      alert("코드 복사에 실패했습니다.");
    }
  };

  // 2. 남편용: 코드 입력 후 백엔드 인증(POST) 요청하기
  const handleConnect = async () => {
    if (inviteCode.length < 6) {
      alert("6자리 초대 코드를 정확히 입력해 주세요.");
      return;
    }

    setIsConnecting(true);

    // 🚀 실제 개발할 때는 여기에 axios 통신 코드가 들어감!
    // 예: await axios.post('/api/connect', { code: inviteCode })

    setTimeout(() => {
      setIsConnecting(false);
      setIsSuccess(true);

      // 연결 성공 애니메이션 보여주고 1.5초 뒤에 홈 화면으로 이동!
      setTimeout(() => {
        onNext();
      }, 1500);
    }, 1000); // 백엔드 응답 대기 시간 1초 시뮬레이션
  };

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-6 pt-12 text-center animate-fade-in">
      {/* 상단 타이틀 */}
      <div className="mb-10">
        <h1 className="leading-snug font-gowun text-3xl font-extrabold text-gray-800">
          배우자와 함께 <br />
          온맘을 시작해 보세요
        </h1>
        <p className="mt-3 text-sm text-gray-500 font-gowun">
          코드를 연결하면 AI가 부부를 <br />더 잘 이해할 수 있도록 도와드려요.
        </p>
      </div>

      {/* 💳 연결 코드 UI 박스 */}
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-left font-gowun text-sm font-bold text-gray-600">
            배우자 초대 코드 입력
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="영문/숫자 6자리"
              className="w-56 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-lg font-black tracking-[0.3em] text-indigo-500 outline-none transition-colors focus:border-indigo-400 focus:bg-white"
            />

            <button
              onClick={handleConnect}
              disabled={isConnecting || isSuccess}
              className={`shrink-0 w-24 rounded-xl font-bold text-sm text-white flex items-center justify-center whitespace-nowrap transition-all shadow-sm ${
                isSuccess
                  ? "bg-green-500 cursor-default"
                  : isConnecting
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 active:scale-95 disabled:opacity-70"
              }`}
            >
              {isConnecting ? "확인중..." : isSuccess ? "연결완료!" : "연결"}
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* 산모 전달용 UI */}
        <div className="flex flex-col gap-3">
          <span className="font-gowun text-sm font-bold text-gray-600">
            아직 코드가 없으신가요?
          </span>
          <button
            onClick={handleCopyCode}
            className="flex items-center justify-center gap-2 rounded-xl bg-pinky/10 py-3 font-bold text-pinky transition-colors hover:bg-pinky/20 active:scale-95"
          >
            {isCopied
              ? "✅ 코드가 복사되었어요!"
              : "내 초대 코드 복사해서 보내기"}
          </button>
        </div>
      </div>

      {/* 하단 건너뛰기 버튼 */}
      <div className="mt-auto pb-8">
        <button
          onClick={onNext}
          className="text-sm font-bold text-gray-400 underline underline-offset-4 hover:text-gray-600"
        >
          나중에 연결하기
        </button>
      </div>
    </div>
  );
};

export default SpouseConnect;
