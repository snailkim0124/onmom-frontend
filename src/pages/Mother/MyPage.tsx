import React from "react";
import {
  SettingOutlined,
  BellOutlined,
  RightOutlined,
  UserOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const MyPage = () => {
  // 1. 임시 사용자 데이터
  const user = {
    name: "김산모",
    babyName: "튼튼이",
    weeks: 17,
    dDay: 132,
    nextHospitalVisit: "7월 15일 (수) 오전 10시",
  };

  // 2. 메뉴 리스트 데이터
  const menuGroups = [
    {
      title: "내 정보",
      items: [
        { icon: <UserOutlined />, label: "산모 및 태아 정보 수정" },
        { icon: <CalendarOutlined />, label: "병원 진료 일정 관리" },
      ],
    },
    {
      title: "앱 설정",
      items: [
        { icon: <BellOutlined />, label: "AI 알림 및 푸시 설정" },
        { icon: <SettingOutlined />, label: "화면 테마 및 기타 설정" },
      ],
    },
    {
      title: "고객 지원",
      items: [
        { icon: <CustomerServiceOutlined />, label: "공지사항 및 고객센터" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* 1. 상단 프로필 카드 영역 */}
      <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FFDFD9] to-pinky/20 p-6 shadow-sm border border-white flex items-center gap-5">
        {/* 프로필 이미지 (아바타) */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-inner border-2 border-pinky/30">
          <span className="text-2xl">👩‍🍼</span>
        </div>

        {/* 프로필 텍스트 정보 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-gowun text-xl font-black text-gray-800">
              {user.name}님
            </h2>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-pinky shadow-sm">
              D-{user.dDay}
            </span>
          </div>
          <p className="font-gowun text-sm text-gray-600 mt-1">
            우리 {user.babyName}, 벌써{" "}
            <strong className="text-pinky">{user.weeks}주차</strong>네요! 🌸
          </p>
        </div>
      </div>

      {/* 3. 메뉴 리스트 영역 */}
      <div className="flex flex-col gap-6 mt-2">
        {menuGroups.map((group, index) => (
          <div key={index} className="flex flex-col gap-2">
            {/* 메뉴 그룹 타이틀 */}
            <h3 className="pl-2 font-gowun text-sm font-extrabold text-gray-400">
              {group.title}
            </h3>

            {/* 하위 메뉴 버튼들 */}
            <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              {group.items.map((item, idx) => (
                <button
                  key={idx}
                  className={`flex w-full items-center justify-between bg-white px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                    idx !== group.items.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-lg">{item.icon}</span>
                    <span className="font-gowun text-base font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                  <RightOutlined className="text-xs text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. 로그아웃 / 탈퇴 버튼 */}
      <div className="mt-4 flex justify-center gap-4 text-xs font-bold text-gray-300">
        <button className="hover:text-gray-500 transition-colors">
          로그아웃
        </button>
        <span>|</span>
        <button className="hover:text-gray-500 transition-colors">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
