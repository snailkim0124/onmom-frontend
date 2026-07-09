import React, { useState } from "react";
import {
  FileTextFilled,
  HeartFilled,
  HomeFilled,
  SmileFilled,
  WechatFilled,
} from "@ant-design/icons";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  const navItems = [
    { id: "home", label: "홈", icon: <HomeFilled className="text-2xl" /> },
    {
      id: "chat",
      label: "AI 대화",
      icon: <WechatFilled className="text-2xl" />,
    },
    {
      id: "record",
      label: "기록",
      icon: <FileTextFilled className="text-2xl" />,
    },
    { id: "family", label: "가족", icon: <HeartFilled className="text-2xl" /> },
    { id: "mypage", label: "마이", icon: <SmileFilled className="text-2xl" /> },
  ];

  const currentTabInfo = navItems.find((item) => item.id === activeTab);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-white shadow-2xl sm:h-[90vh] sm:rounded-[2rem]">
        {activeTab !== "home" && (
          <header className="flex h-14 shrink-0 items-center justify-center border-b border-gray-100 bg-white px-4 transition-all">
            <h1 className="font-gowun text-lg font-extrabold text-gray-800">
              {currentTabInfo?.label}
            </h1>
          </header>
        )}

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 pb-24">
          {children}
        </main>

        {/* 앱 하단 네비게이션 바 */}
        <nav className="absolute bottom-0 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? "text-pinky font-bold"
                    : "text-gray-400 hover:text-pinky"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
