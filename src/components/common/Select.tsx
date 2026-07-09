import React from "react";

// Select 컴포넌트가 받을 매개변수(Props) 정의
interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // select 태그용 이벤트 타입!
  options: { value: string; label: string }[]; // 주르륵 나올 선택지들 [{value: '1', label: '1주차'}]
}

const Select = ({ label, name, value, onChange, options }: SelectProps) => {
  return (
    <div className="w-full">
      {/* 라벨 */}
      <label className="mb-2 block font-gowun text-base font-bold text-gray-700">
        {label}
      </label>

      {/* 셀렉트 박스 */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white p-4 text-lg outline-none transition duration-200 focus:border-pinky focus:ring-2 focus:ring-pinky/20 text-gray-800"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
