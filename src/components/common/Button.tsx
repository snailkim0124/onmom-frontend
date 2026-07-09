import React from "react";

// C++의 구조체(struct)나 함수의 매개변수 타입을 지정해주는 것과 같아.
interface ButtonProps {
  children: React.ReactNode; // 버튼 안에 들어갈 글자나 아이콘
  onClick?: () => void; // 버튼을 눌렀을 때 실행될 함수
  variant?: "primary" | "secondary" | "outline"; // 버튼의 색상/스타일 종류
  className?: string; // 나중에 여백 등을 추가로 조절하고 싶을 때 쓰는 용도
  disabled?: boolean; // 비활성화 여부
}

const Button = ({
  children,
  onClick,
  variant = "primary", // 기본값은 메인 색상(primary)
  className = "",
  disabled = false,
}: ButtonProps) => {
  // 모든 버튼이 공통으로 가지는 뼈대 스타일 (터치하기 편한 큰 크기)
  const baseStyle =
    "w-full rounded-full py-4 text-lg font-bold transition duration-200 flex justify-center items-center";

  // variant(종류)에 따라 달라지는 색상 옷
  const variants = {
    primary:
      "font-gowun bg-pinky text-white hover:bg-pinky/90 shadow-md active:bg-pinky/80",
    secondary:
      "font-gowun bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
    outline:
      "border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100",
  };

  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed"
    : "active:scale-[0.98]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
