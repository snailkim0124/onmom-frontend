import React, { useState } from "react";
import Button from "../../components/common/Button.tsx";
import Input from "../../components/common/Input.tsx";
import Select from "../../components/common/Select.tsx";

// App.tsx에서 받을 onNext 함수 타입 지정
interface MotherInfoProps {
  onNext: () => void;
}

const MotherInfo = ({ onNext }: MotherInfoProps) => {
  const [formData, setFormData] = useState({
    name: "",
    babyName: "",
    week: "1~4",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.babyName) {
      alert("모든 정보를 입력해 주세요!");
      return;
    }
    console.log("최종 저장 데이터:", formData);
    alert(`${formData.babyName} 엄마(${formData.week}주차), 환영합니다! 🎉`);

    onNext();
  };

  // 총 10개의 구간(10개월) 생성
  const weekOptions = Array.from({ length: 10 }, (_, i) => {
    const start = i * 4 + 1;
    const end = i * 4 + 4;

    return {
      value: `${start}-${end}`,
      label: `${start}~${end}주차`,
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-appBg p-6 pt-12">
      {/* 상단 타이틀 */}
      <div className="mb-10">
        <h1 className="font-gowun text-3xl font-extrabold leading-snug text-gray-800">
          소중한 아이와의 <br />
          만남을 준비해 볼까요?
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          맞춤형 케어를 위해 기본 정보를 입력해 주세요.
        </p>
      </div>

      {/* 정보 입력 폼 영역 */}
      <div className="flex flex-col gap-6">
        <Input
          label="산모 이름"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해 주세요"
        />

        <Input
          label="아이 태명"
          name="babyName"
          value={formData.babyName}
          onChange={handleChange}
          placeholder="예: 튼튼이, 사랑이"
        />

        {/* 3. 새로 만든 주수 선택창 배치! */}
        <Select
          label="현재 임신 주수"
          name="week"
          value={formData.week}
          onChange={handleChange}
          options={weekOptions}
        />
      </div>

      {/* 하단 고정 완료 버튼 */}
      <div className="pb-8 mt-12">
        <Button onClick={handleSubmit} className="shadow-lg">
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default MotherInfo;
