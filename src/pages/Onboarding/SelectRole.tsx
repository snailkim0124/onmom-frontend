import React from "react";
import Button from "../../components/common/Button.tsx";
import logoImg from "../../assets/images/logo.png";

interface SelectRoleProps {
  onNext: (role: "MOTHER" | "FAMILY") => void;
}

const SelectRole = ({ onNext }: SelectRoleProps) => {
  const logoBoxStyle =
    "flex h-36 w-36 items-center justify-center rounded-3xl bg-white";
  const titleStyle =
    "font-gowun text-4xl font-extrabold tracking-widest text-black";
  const logotitleStyle =
    "font-gowun text-xl font-extrabold tracking-widest text-black";

  const subtitlecontainer = "flex flex-col items-center gap-1 mt-4";
  const subtitleStyle = "font-gowun text-xl font-medium text-black";

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 bg-appBg">
      {/* 위에 로고 부분 */}
      <img src={logoImg} className={logoBoxStyle} alt="로고" />

      {/* 앱 이름과 서브 타이틀 */}
      <h1 className={titleStyle}>온 맘</h1>
      <h1 className={logotitleStyle}>
        O N M O <span className="text-pinky">M</span>
      </h1>

      <div className={subtitlecontainer}>
        <div className={subtitleStyle}>온 마음을,</div>
        <div className={subtitleStyle}>가장 가까운 사람에게.</div>
      </div>

      {/* 선택 버튼 영역 (버튼을 위아래로 아주 길고 큼직하게 배치) */}
      <div className="flex w-full flex-col gap-5 mt-12">
        {/* 🚀 2. 산모 버튼 클릭 시 "mother" 전달 */}
        <Button
          className="h-16 text-25 shadow-lg"
          onClick={() => onNext("MOTHER")}
        >
          산모에요.
        </Button>

        {/* 🚀 3. 가족 버튼 클릭 시 "family" 전달 */}
        <Button
          variant="secondary"
          className="h-75 text-2xl shadow-md"
          onClick={() => onNext("FAMILY")}
        >
          가족이에요.
        </Button>
      </div>
    </div>
  );
};

export default SelectRole;
