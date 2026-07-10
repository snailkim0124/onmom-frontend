import React, { useState } from "react";
import {
  UserOutlined,
  BellOutlined,
  LinkOutlined,
  RightOutlined,
} from "@ant-design/icons";

const FamilyMyPage = () => {
  // 알림 토글 상태 관리
  const [notifyMood, setNotifyMood] = useState(true);
  const [notifyMission, setNotifyMission] = useState(true);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* 1. 상단 타이틀 */}
      <div className="flex flex-col gap-1 px-1">
        <h1 className="font-gowun text-2xl font-black text-gray-800">
          설정 관리 ⚙️
        </h1>
      </div>

      {/* 2. 남편 프로필 & 부부 연동 상태 */}
      <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-4 p-5 border-b border-gray-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl shadow-inner">
            👨‍👩‍👦
          </div>
          <div className="flex flex-col">
            <span className="font-gowun text-lg font-black text-gray-800">
              든든한 남편님
            </span>
            <span className="text-sm text-gray-400">family@onmom.com</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 px-5">
          <div className="flex items-center gap-2">
            <LinkOutlined className="text-indigo-400" />
            <span className="text-sm font-bold text-gray-600">
              아내와 연결됨
            </span>
          </div>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-500">
            김산모 님 🌸
          </span>
        </div>
      </div>

      {/* 3. 남편 맞춤형 알림 설정 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-gowun text-sm font-bold text-gray-500 pl-2">
          알림 설정
        </h3>
        <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100 p-2">
          {/* 토글 1: 아내 감정 기록 알림 */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pinky/10 text-pinky">
                <BellOutlined />
              </div>
              <span className="font-gowun text-sm font-bold text-gray-700">
                아내 감정 기록 알림
              </span>
            </div>
            <button
              onClick={() => setNotifyMood(!notifyMood)}
              className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${notifyMood ? "bg-indigo-500" : "bg-gray-200"}`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${notifyMood ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {/* 토글 2: AI 미션 알림 */}
          <div className="flex items-center justify-between p-3 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
                <BellOutlined />
              </div>
              <span className="font-gowun text-sm font-bold text-gray-700">
                오늘의 AI 추천 미션
              </span>
            </div>
            <button
              onClick={() => setNotifyMission(!notifyMission)}
              className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${notifyMission ? "bg-indigo-500" : "bg-gray-200"}`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${notifyMission ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. 기타 메뉴 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-gowun text-sm font-bold text-gray-500 pl-2">
          앱 관리
        </h3>
        <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100 p-2">
          <button className="flex items-center justify-between p-3 active:bg-gray-50 transition-colors rounded-xl">
            <div className="flex items-center gap-3">
              <UserOutlined className="text-gray-400 text-lg" />
              <span className="font-gowun text-sm font-bold text-gray-700">
                내 정보 수정
              </span>
            </div>
            <RightOutlined className="text-gray-300 text-xs" />
          </button>

          <button className="flex items-center justify-between p-3 border-t border-gray-50 active:bg-gray-50 transition-colors rounded-xl">
            <div className="flex items-center gap-3 pl-1">
              <span className="text-gray-400 text-sm font-bold pl-1">
                버전 정보
              </span>
            </div>
            <span className="text-xs font-bold text-gray-400">v1.0.0</span>
          </button>

          <button className="flex items-center justify-between p-3 border-t border-gray-50 active:bg-gray-50 transition-colors rounded-xl">
            <div className="flex items-center gap-3 pl-1">
              <span className="text-red-400 text-sm font-bold pl-1">
                로그아웃
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyMyPage;
