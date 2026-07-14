import React, { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { api } from "../../api/axios";

// App.tsx에서 받을 onNext 함수 타입 지정 (성공 시 생성된 데이터 등을 넘겨줄 수 있도록 확장 가능)
interface MotherInfoProps {
  onNext: () => void;
}

const MotherInfo = ({ onNext }: MotherInfoProps) => {
  // 백엔드 스펙에 맞춰 상태 관리 (초기값 설정)
  const [formData, setFormData] = useState({
    name: "",
    babyName: "",
    weekRange: "1-4", // '1~4'에서 백엔드 파싱 편의를 위해 '-' 구분자로 변경
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.babyName) {
      alert("모든 정보를 입력해 주세요!");
      return;
    }

    // [데모 시연을 위한 Mocking 로직]
    console.log("시연 모드: 서버 통신 없이 성공 처리", formData);

    // 2. 사용자에게 성공 알림
    alert(`${formData.babyName} 엄마, 정보 등록이 완료되었습니다! 🎉`);

    // 3. 바로 다음 페이지로 이동
    onNext();

    /* // 나중에 서버가 고쳐지면 이 아래 코드로 다시 갈아끼우면 돼!
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post(`/api/v1/pregnancies?currentUserId=${userId}`, requestBody);
      onNext();
    } catch (error) {
      alert("정보 등록 중 오류가 발생했습니다.");
    }
    */
  };

  // 총 10개의 구간(10개월) 생성
  const weekOptions = Array.from({ length: 10 }, (_, i) => {
    const start = i * 4 + 1;
    const end = i * 4 + 4;

    return {
      value: `${start}-${end}`, // value 규격을 '시작-끝' 형태로 통일
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

        {/* 3. 주수 선택창 배치 */}
        <Select
          label="현재 임신 주수"
          name="weekRange"
          value={formData.weekRange}
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
