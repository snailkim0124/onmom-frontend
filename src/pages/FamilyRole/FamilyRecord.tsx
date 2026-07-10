import React, { useState } from "react";
import { HeartFilled, CheckCircleFilled } from "@ant-design/icons";

const FamilyRecord = () => {
  // 1. 선택된 날짜 상태 (임시로 오늘 날짜인 수요일(15일)을 기본값으로 설정!)
  const [selectedDate, setSelectedDate] = useState(15);

  // 2. 간단한 주간 달력 데이터 (일~토)
  const weekDays = [
    { day: "일", date: 12, emoji: "😌" },
    { day: "월", date: 13, emoji: "🤢" }, // 입덧이 심했던 날
    { day: "화", date: 14, emoji: "😴" }, // 피곤했던 날
    { day: "수", date: 15, emoji: "🌸", isToday: true }, // 오늘
    { day: "목", date: 16, emoji: null },
    { day: "금", date: 17, emoji: null },
    { day: "토", date: 18, emoji: null },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* 1. 상단 타이틀 */}
      <div className="flex flex-col gap-1 px-1">
        <h1 className="font-gowun text-2xl font-black text-gray-800">
          아내의 감정 기록 🌸
        </h1>
        <p className="font-gowun text-sm text-gray-500">
          아내가 남긴 소중한 하루를 확인해 보세요.
        </p>
      </div>

      {/* 2. 주간 달력 (일~토 간단한 버전) */}
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
          <span className="font-gowun text-lg font-bold text-gray-700">
            7월 3주차
          </span>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-50 px-2 py-1 rounded-full">
            임신 17주차
          </span>
        </div>

        <div className="flex justify-between items-center px-1">
          {weekDays.map((item) => {
            const isSelected = selectedDate === item.date;

            return (
              <button
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center gap-2 rounded-xl p-2 transition-all ${
                  isSelected
                    ? "bg-indigo-500 text-white shadow-md scale-105"
                    : "bg-transparent text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-[11px] font-bold">{item.day}</span>
                <span
                  className={`text-sm font-black ${isSelected ? "text-white" : "text-gray-800"}`}
                >
                  {item.date}
                </span>
                {/* 감정 이모지 (기록이 있을 때만 표시) */}
                <div className="h-6 w-6 text-base flex items-center justify-center">
                  {item.emoji ? (
                    item.emoji
                  ) : (
                    <span className="text-gray-200">-</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 선택된 날짜의 상세 기록 & AI 코멘트 분기 처리 */}
      {selectedDate === 15 ? (
        <div className="flex flex-col gap-4">
          {/* 🌸 아내의 상태 요약 카드 */}
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <HeartFilled className="text-pinky text-lg" />
              <h2 className="font-gowun text-lg font-bold text-gray-700">
                이날 아내는
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm font-bold text-gray-500">기분</span>
                <span className="font-gowun text-base font-black text-gray-800">
                  행복하고 설레요 🌸
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm font-bold text-gray-500">증상</span>
                <span className="font-gowun text-base font-black text-gray-800">
                  태동을 느꼈어요! 🦶
                </span>
              </div>

              {/* 아내의 한마디 (메모) */}
              <div className="flex flex-col gap-2 rounded-xl bg-pinky/5 p-4 mt-1 border border-pinky/10">
                <span className="text-xs font-bold text-pinky">
                  아내의 메모
                </span>
                <p className="font-gowun text-sm text-gray-700 leading-relaxed">
                  "오늘 점심 먹고 나른했는데 배에서 콕콕 하는 느낌이 났다!
                  튼튼이가 인사하는 것 같아 너무 신기해 ㅎㅎ 여보 얼른 와서 같이
                  느껴보자!"
                </p>
              </div>
            </div>
          </div>

          {/* 🤖 남편을 위한 맞춤형 AI 리포트 */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#F0F2FF] p-5 shadow-sm border border-indigo-100">
            <div className="flex items-center gap-2 border-b border-indigo-100/50 pb-3">
              <span className="text-xl">🤖</span>
              <h2 className="font-gowun text-lg font-black text-indigo-500">
                온맘 조력자 리포트
              </h2>
            </div>

            <p className="font-gowun text-sm text-gray-700 leading-relaxed">
              산모님이 오늘 처음으로 뚜렷한 태동을 느끼고 무척 기뻐하고
              계시네요! 임신 17주~20주 사이에는 태동이 시작되어 부부가 함께
              아이와 교감하기 좋은 시기입니다.
              <br />
              <br />
              퇴근 후 아내의 배에 손을 얹고 부드러운 목소리로 태담을 나누어
              보세요. 남편분의 낮은 목소리가 아이에게 큰 안정감을 줍니다.
            </p>

            {/* AI 추천 미션 */}
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-indigo-50">
              <CheckCircleFilled className="text-indigo-400 text-lg" />
              <span className="font-gowun text-sm font-bold text-gray-800">
                오늘의 추천 액션: 다정한 태담 들려주기
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* 기록이 없는 날짜(예: 목, 금, 토)를 선택했을 때 보여줄 화면 */
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white py-14 shadow-sm border border-gray-100 mt-2">
          <span className="text-4xl text-gray-300">🍃</span>
          <p className="font-gowun text-sm text-gray-400 font-bold">
            아직 작성된 기록이 없어요.
          </p>
        </div>
      )}
    </div>
  );
};

export default FamilyRecord;
