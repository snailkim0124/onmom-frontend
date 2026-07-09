import React, { useState } from "react";
import Button from "../../components/common/Button.tsx";
import Home from "../Mother/Home.tsx";

interface SpouseConnectProps {
  onNext: () => void;
}

const SpouseConnect = ({ onNext }: SpouseConnectProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // 초대 링크 복사 함수
  const handleCopyLink = async () => {
    try {
      const inviteLink = "https://onmom.app/invite/abc1234";
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-6 pt-12 text-center">
      {/* 상단 타이틀 */}
      <div className="mb-8">
        <h1 className="leading-snug font-gowun text-3xl font-extrabold text-gray-800">
          배우자와 함께 <br />
          온맘을 시작해 보세요
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          연결하면 AI가 서로를 <br />더 잘 이해할 수 있도록 도와드려요.
        </p>
      </div>

      {/* 📷 카메라 스캐너 뷰파인더 영역 */}
      <div className="mx-auto mb-8 flex w-full max-w-sm flex-col items-center">
        {/* 카메라 화면이 깔릴 검은 바탕 */}
        <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-800 shadow-inner">
          {/* 나중에 여기에 <QrReader /> 같은 실제 카메라 컴포넌트가 들어갈 자리! */}
          <span className="absolute z-0 font-gowun text-sm text-gray-400">
            카메라 화면이 나오는 자리
          </span>

          {/* 스캔 가이드라인 (가운데 네모) */}
          <div className="z-10 h-48 w-48 rounded-lg border-4 border-white/70 shadow-[0_0_0_999px_rgba(0,0,0,0.4)]"></div>

          {/* 스캐너 스윽스윽 지나가는 애니메이션 선 (디테일 꿀팁!) */}
          <div className="absolute top-1/2 z-10 h-0.5 w-48 -translate-y-1/2 animate-pulse bg-pinky shadow-[0_0_8px_2px_rgba(255,140,162,0.8)]"></div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-auto flex flex-col gap-4 pb-8">
        <Button
          onClick={handleCopyLink}
          className="shadow-lg transition-colors"
        >
          {isCopied ? "✅ 링크가 복사되었습니다!" : "🔗 초대 링크 대신 보내기"}
        </Button>

        <Button variant="secondary" onClick={onNext}>
          나중에 연결하기
        </Button>
      </div>
    </div>
  );
};

export default SpouseConnect;
