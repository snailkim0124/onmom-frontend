import React from "react";

// Input 컴포넌트가 받을 매개변수(Props) 정의
interface InputProps {
  label: string; // 입력창 위에 뜰 이름 (예: '산모 이름')
  type?: string; // 타입 (text, date, password 등. 기본값은 text)
  name: string; // 상태 관리를 위한 고유 이름
  value: string; // 입력된 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값이 바뀔 때 실행될 함수
  placeholder?: string; // 입력창이 비어있을 때 보여줄 안내 문구
}

const Input = ({
  label,
  type = "text", // 아무것도 안 적으면 기본으로 'text' 타입이 됨
  name,
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <div className="w-full">
      {/* 라벨 (입력창 제목) */}
      <label className="mb-2 block font-gowun text-base font-bold text-gray-700">
        {label}
      </label>

      {/* 실제 입력창 */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white p-4 text-lg outline-none transition duration-200 focus:border-pinky focus:ring-2 focus:ring-pinky/20"
      />
    </div>
  );
};

export default Input;
