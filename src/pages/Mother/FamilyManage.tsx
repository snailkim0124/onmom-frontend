import React from "react";
import {
  CheckCircleFilled,
  QrcodeOutlined,
  LinkOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const Family = () => {
  // 1. 서버에서 받아왔다고 가정하는 연결 데이터
  const partnerName = "김철수"; // 남편 이름
  const inviteLink = "https://onmom.app/join/A1B2C3"; // 고유 초대 링크

  // 2. 클립보드 복사 함수
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("초대 링크가 클립보드에 복사되었습니다! 🔗");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* 1. 연결 완료 상태 카드 */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#FFF3F0] p-5 shadow-sm border border-[#FFDFD9]">
        <CheckCircleFilled className="text-3xl text-pinky" />
        <div className="flex flex-col">
          <span className="font-gowun text-sm font-bold text-gray-500">
            우리 가족 연결 상태
          </span>
          <h3 className="font-gowun text-lg font-black text-gray-800 mt-0.5">
            배우자 <span className="text-pinky">{partnerName}</span>님과 연결됨
          </h3>
        </div>
      </div>

      {/* 2. QR 코드 및 링크 공유 영역 */}
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col gap-1 mt-2">
          <h2 className="font-gowun text-xl font-extrabold text-gray-800">
            산모 계정 초대하기
          </h2>
          <p className="text-sm text-gray-500 font-gowun">
            남편의 앱에서 아래 QR 코드를 스캔하거나
            <br />
            링크를 보내서 온맘에 초대해 주세요.
          </p>
        </div>

        {/* 가짜 QR 코드 박스 (UI 목업) */}
        <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-4 border-gray-100 bg-gray-50 p-2 shadow-inner">
          <QrcodeOutlined className="text-[140px] text-gray-800" />
        </div>

        {/* 링크 복사 버튼 영역 */}
        <div className="w-full flex flex-col gap-3 w-full mt-2">
          {/* 눈에 보이는 링크 주소 박스 */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 border border-gray-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <LinkOutlined className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-600 truncate">
                {inviteLink}
              </span>
            </div>
          </div>

          {/* 복사하기 액션 버튼 */}
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pinky py-3.5 text-sm font-bold text-white shadow-md active:scale-95 transition-transform"
          >
            <CopyOutlined className="text-lg" />
            초대 링크 복사하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Family;
