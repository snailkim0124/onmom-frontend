import React, { useState } from "react";
import {
  CheckCircleFilled,
  CopyOutlined,
  HeartFilled,
} from "@ant-design/icons";

const FamilyManage = () => {
  // 1. 서버에서 받아올 연결 상태 데이터 (지금은 테스트를 위해 false로 두거나 true로 바꿔보면서 확인해 봐!)
  const [isConnected, setIsConnected] = useState(false);
  const partnerName = "김남편";

  // 2. SpouseConnect.tsx와 짝을 이루는 6자리 초대 코드
  const inviteCode = "ABC123";

  // 3. 클립보드 복사 함수
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    alert(`초대 코드 [${inviteCode}]가 복사되었습니다! 🔗`);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* 상단 타이틀 */}
      <div className="flex flex-col gap-1 px-1">
        <h1 className="font-gowun text-2xl font-black text-gray-800">
          가족 연동 👨‍👩‍👦
        </h1>
      </div>

      {isConnected ? (
        /* 🟢 [상태 1] 이미 연결되었을 때 보여줄 화면 */
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 rounded-xl bg-pinky/10 p-5 border border-pinky/20">
            <HeartFilled className="text-4xl text-pinky" />
            <div className="flex flex-col">
              <span className="font-gowun text-sm font-bold text-gray-500">
                우리 가족 연결 상태
              </span>
              <h3 className="font-gowun text-lg font-black text-gray-800 mt-0.5">
                <span className="text-pinky">{partnerName}</span>님과 든든하게
                연결됨
              </h3>
            </div>
          </div>
          <p className="font-gowun text-sm text-gray-600 text-center mt-2 leading-relaxed">
            이제 남편분과 감정 기록과 AI 추천 미션을 <br />
            함께 공유하며 출산을 준비할 수 있어요!
          </p>
        </div>
      ) : (
        /* 🔴 [상태 2] 아직 연결 전일 때 보여줄 초대 화면 */
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-4xl mb-2">💌</div>
            <h2 className="font-gowun text-xl font-extrabold text-gray-800">
              남편 초대하기
            </h2>
            <p className="text-sm text-gray-500 font-gowun leading-relaxed">
              아직 남편과 연결되지 않았어요.
              <br />
              아래 6자리 코드를 남편에게 전달해 주세요!
            </p>
          </div>

          {/* 6자리 코드 표시 박스 */}
          <div className="flex items-center justify-center rounded-xl bg-gray-50 w-full py-6 border border-gray-200">
            <span className="text-3xl font-black tracking-[0.4em] text-pinky">
              {inviteCode}
            </span>
          </div>

          {/* 복사하기 액션 버튼 */}
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pinky py-4 text-sm font-bold text-white shadow-md active:scale-95 transition-transform"
          >
            <CopyOutlined className="text-lg" />
            초대 코드 복사해서 보내기
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyManage;
