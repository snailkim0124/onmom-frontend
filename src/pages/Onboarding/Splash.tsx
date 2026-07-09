import React from "react";
import logoImg from "../../assets/images/logo.png";

const Splash = () => {
  const containerStyle =
    "flex h-screen w-full flex-col items-center justify-center text-white bg-pinky";

  const logoBoxStyle =
    "flex h-36 w-36 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-xl mb-6 object-contain p-4"; // 이미지 비율 깨짐 방지용 팁 추가
  const titleStyle =
    "font-gowun text-4xl font-extrabold tracking-widest text-white";
  const logotitleStyle =
    "font-gowun text-xl font-extrabold tracking-widest text-white";

  const subtitlecontainer = "flex flex-col items-center gap-1 mt-4";
  const subtitleStyle = "font-gowun text-xl font-medium text-white";

  return (
    <div className={containerStyle}>
      <div className="flex flex-col items-center animate-pulse">
        {/* 앱 로고 아이콘 */}
        <img src={logoImg} className={logoBoxStyle} alt="로고" />

        {/* 앱 이름과 서브 타이틀 */}
        <h1 className={titleStyle}>온 맘</h1>
        <h1 className={logotitleStyle}>O N M O M</h1>

        <div className={subtitlecontainer}>
          <div className={subtitleStyle}>온 마음을,</div>
          <div className={subtitleStyle}>가장 가까운 사람에게.</div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
