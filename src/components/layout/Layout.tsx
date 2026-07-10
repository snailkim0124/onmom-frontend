import React from "react";
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
  userRole?: "mother" | "family" | null;
}

// 🚀 2. userRole 프롭스 받기 (기본값은 "mother")
const Layout = ({
  children,
  activeTab,
  setActiveTab,
  userRole = "mother",
}: LayoutProps) => {
  // 🚀 3. 역할에 따라 메인 테마 색상 변수 설정
  const themeColor = userRole === "family" ? "text-indigo-500" : "text-pinky";
  const hoverColor =
    userRole === "family" ? "hover:text-indigo-500" : "hover:text-pinky";

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
                // 🚀 4. 조건부 렌더링에 테마 색상 변수 적용
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? `${themeColor} font-bold` // 활성화 시 핑크 or 인디고
                    : `text-gray-400 ${hoverColor}` // 비활성화 시 회색, 마우스 올리면 핑크 or 인디고
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
