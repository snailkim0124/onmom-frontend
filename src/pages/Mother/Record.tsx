import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const Record = () => {
  const [value, setValue] = useState<any>(new Date());

  const moodData = [
    { date: "2026-07-02", mood: "😊", label: "행복" },
    { date: "2026-07-05", mood: "😢", label: "우울" },
    { date: "2026-07-08", mood: "😴", label: "피곤" },
    { date: "2026-07-09", mood: "🌸", label: "설렘" },
  ];

  const addMoodToTile = ({ date, view }: any) => {
    if (view === "month") {
      const dateString = dayjs(date).format("YYYY-MM-DD");
      const dayMood = moodData.find((d) => d.date === dateString);

      if (dayMood) {
        return (
          <div className="flex justify-center mt-1 text-lg">{dayMood.mood}</div>
        );
      }
    }
    return null;
  };

  // 🚀 1. 현재 달력에서 선택된 날짜의 데이터를 포맷팅해서 뽑아오기!
  const selectedDateString = dayjs(value).format("YYYY-MM-DD"); // 예: "2026-07-09"
  const displayDate = dayjs(value).format("M월 D일"); // 예: "7월 9일"

  // 🚀 2. 선택된 날짜와 일치하는 기분 데이터 찾기
  const selectedDayData = moodData.find((d) => d.date === selectedDateString);

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* 1. 달력 영역 */}
      <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50">
        <Calendar
          onChange={setValue}
          value={value}
          formatDay={(locale, date) => dayjs(date).format("D")}
          tileContent={addMoodToTile}
          className="w-full border-none font-gowun"
        />
      </div>

      {/* 🌟 3. 선택된 날짜의 기분 표시 영역 (새로 추가됨!) */}
      <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50 transition-all">
        <div className="flex flex-col">
          <span className="font-gowun text-sm font-bold text-pinky">
            {displayDate}의 기록
          </span>

          {/* 🚀 여기가 핵심! 뭉뚱그린 문구 대신 정확한 감정(label)을 출력해줘 */}
          <h3 className="font-gowun text-lg font-black text-gray-800 mt-1">
            {selectedDayData
              ? selectedDayData.label
              : "아직 기록이 없는 날이에요"}
          </h3>
        </div>

        {/* 기분 이모지 */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pinky/10 text-2xl shadow-inner border border-pinky/20">
          {selectedDayData ? selectedDayData.mood : "❔"}
        </div>
      </div>

      {/* 4. AI 주간 분석 리포트 영역 */}
      <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/80 via-white to-pinky/10 p-6 shadow-sm border border-indigo-50 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-inner">
            <StarOutlined className="text-lg" />
          </div>
          <div>
            <h3 className="font-gowun text-base font-extrabold text-gray-800">
              이번 주 온맘 AI 리포트
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              최근 7일간의 대화 기반 분석
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white/60 p-4 border border-white">
          <p className="text-sm text-gray-700 leading-relaxed font-gowun">
            "최근 보건소 방문과 임신 중기 증상으로 인해 <strong>피로감</strong>
            을 자주 느끼셨네요. 하지만 아이를 만나는 것에 대한{" "}
            <strong>긍정적인 기대감</strong>이 훨씬 더 커진 한 주였어요!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Record;
