import React, { useState } from "react";
import Button from "../../components/common/Button";
import { api } from "../../api/axios";
interface SpouseConnectProps {
  onNext: () => void;
  // 🚀 상위 컴포넌트(App.tsx 등)에서 백엔드 규격에 맞는 유저 역할 값을 주입받습니다.
  userRole: "MOTHER" | "FAMILY";
  pregnancyId?: number; // 산모일 때 초대 코드 발급을 위해 필요한 ID (선택)
}

const SpouseConnect = ({
  onNext,
  userRole,
  pregnancyId,
}: SpouseConnectProps) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(""); // 🚀 산모용 발급된 코드 저장용

  // 1. 산모용(MOTHER): 가짜 초대 코드 발급 및 복사하기
  const handleCopyCode = async () => {
    // 🚀 [시연용 Mocking] API 호출 대신 고정 코드 사용
    const mockCode = "ONMOM123";
    setGeneratedCode(mockCode);

    await navigator.clipboard.writeText(mockCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    /* // 서버 복구 시 아래 주석 해제
    try {
      const response = await api.post(`/api/v1/pregnancies/${pregnancyId}/family-invite-codes`);
      setGeneratedCode(response.data.data.code);
      // ... 복사 로직
    } catch (err) { alert("코드 발급 실패"); }
    */
  };

  // 2. 가족용(FAMILY): 코드 입력 후 백엔드 인증 없이 성공 처리하기
  const handleConnect = async () => {
    // 입력값 검증만 유지
    if (inviteCode.length < 6) {
      alert("6자리 초대 코드를 정확히 입력해 주세요.");
      return;
    }

    setIsConnecting(true);

    // 🚀 [강제 이동] 로직 단순화
    console.log("시연 모드: 즉시 성공으로 처리");

    // 상태 변경
    setIsConnecting(false);
    setIsSuccess(true);

    // 이동 확인을 위해 alert 추가
    alert("연결 성공! 다음 페이지로 이동합니다.");
    onNext(); // 👈 여기서 바로 호출!
  };

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-6 pt-12 text-center">
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
        {/* 🚀 [가족(FAMILY) 전용 역할 분기] 코드 입력 영역 */}
        {userRole === "FAMILY" && (
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
        )}

        {/* 역할을 구분하는 디바이더 라인은 가족용일 때만 띄워 노출 밸런스를 잡습니다 */}
        {userRole === "FAMILY" && (
          <div className="h-px w-full bg-gray-100"></div>
        )}

        {/* 🚀 [산모(MOTHER) 전용 역할 분기] 초대 코드 복사 발급 영역 */}
        {userRole === "MOTHER" && (
          <div className="flex flex-col gap-3">
            <span className="font-gowun text-sm font-bold text-gray-600 text-left">
              가족 초대 코드 발급
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center justify-center gap-2 rounded-xl bg-pinky/10 py-4 font-bold text-pinky transition-colors hover:bg-pinky/20 active:scale-95"
            >
              {isCopied
                ? "✅ 코드가 복사되었어요!"
                : generatedCode
                  ? `[${generatedCode}] 다시 복사하기`
                  : "내 초대 코드 발급해서 보내기"}
            </button>
          </div>
        )}
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
