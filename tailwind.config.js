/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // TypeScript 파일까지 감시하도록 설정
  ],
  theme: {
    extend: {
      colors: {
        pinky: "#FF8CA2",
        brand: "#5B21B6", // 온맘 서비스의 시그니처 보라색/파란색 등
        subText: "#6B7280", // 부가 설명용 회색
        appBg: "#F9FAFB", // 앱 내부 배경색
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        gowun: ['"Gowun Dodum"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
