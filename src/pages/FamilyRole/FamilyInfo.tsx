import React, { useState } from "react";
import {
  CheckCircleFilled,
  HeartFilled,
  LinkOutlined,
} from "@ant-design/icons";

const FamilyInfo = () => {
  // 1. 서버에서 받아올 연결 상태 (테스트할 때 true/false로 바꿔가며 확인해 봐!)
  const [isConnected, setIsConnected] = useState(false);
  const partnerName = "김산모"; // 연결된 아내 이름

  // 2. 남편이 아내의 코드를 입력할 때 쓰는 상태
  const [inviteCode, setInviteCode] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // 3. 연결 요청 함수 (나중에 백엔드 API 붙일 곳)
  const handleConnect = () => {
    if (inviteCode.length < 6) {
      alert("아내가 보낸 6자리 코드를 정확히 입력해 주세요.");
      return;
    }
    setIsConnecting(true);

    // 백엔드 통신 시뮬레이션 (1초 뒤 성공)
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      alert("아내와 성공적으로 연결되었습니다! 🎉");
    }, 1000);
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
        /* 🟢 [상태 1] 아내와 이미 연결되었을 때 보여줄 화면 */
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 rounded-xl bg-indigo-50 p-5 border border-indigo-100">
            <HeartFilled className="text-4xl text-indigo-400" />
            <div className="flex flex-col">
              <span className="font-gowun text-sm font-bold text-gray-500">
                우리 가족 연결 상태
              </span>
              <h3 className="font-gowun text-lg font-black text-gray-800 mt-0.5">
                <span className="text-indigo-500">{partnerName}</span> 님과
                든든하게 연결됨
              </h3>
            </div>
          </div>
          <p className="font-gowun text-sm text-gray-600 text-center mt-2 leading-relaxed">
            아내의 감정 기록을 확인하고, <br />
            AI가 추천하는 미션을 함께 수행해 보세요!
          </p>
        </div>
      ) : (
        /* 🔴 [상태 2] 아직 연결 전일 때 보여줄 코드 입력 화면 */
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-4xl mb-2">💌</div>
            <h2 className="font-gowun text-xl font-extrabold text-gray-800">
              아내와 연결하기
            </h2>
            <p className="text-sm text-gray-500 font-gowun leading-relaxed">
              앱을 처음 시작할 때 연결을 건너뛰셨네요!
              <br />
              아내가 보내준 6자리 코드를 입력해 주세요.
            </p>
          </div>

          {/* 코드 입력 폼 */}
          <div className="flex w-full flex-col gap-2">
            <label className="text-left font-gowun text-sm font-bold text-gray-600 pl-1">
              초대 코드 입력
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="영문/숫자 6자리"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-lg font-black tracking-[0.3em] text-indigo-500 outline-none transition-colors focus:border-indigo-400 focus:bg-white"
              />
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="rounded-xl bg-indigo-500 px-5 font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 disabled:bg-gray-300"
              >
                {isConnecting ? "확인중" : "연결"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <LinkOutlined />
            <span>코드는 아내 앱의 [가족] 탭에서 확인할 수 있어요.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInfo;
