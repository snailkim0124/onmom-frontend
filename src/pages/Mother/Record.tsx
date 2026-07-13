import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { api } from "../../api/axios"; // 🚀 작성해둔 공통 axios 무전기 탑재

// 백엔드 응답 스펙 데이터 구조 정의
interface CalendarDayMood {
  id: number;
  recordDate: string; // YYYY-MM-DD
  moodScore: number;
  moodLabel: string;
  noteText: string;
}

interface AiReportData {
  reportText: string;
}

interface RecordProps {
  pregnancyId?: number; // Postman 스펙 필수 파라미터
}

const Record = ({ pregnancyId = 1 }: RecordProps) => {
  const [value, setValue] = useState<any>(new Date());

  // 백엔드에서 받아온 이 달의 감정 데이터 리스트 상태
  const [moodData, setMoodData] = useState<CalendarDayMood[]>([]);
  // AI 리포트 상태 관리
  const [aiReport, setAiReport] = useState<string>("날짜를 선택하면 해당 기록을 기반으로 AI가 분석 리포트를 작성해 드려요! 🌸");
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  // 1. 달력 월(Month)이 바뀌거나 컴포넌트 진입 시 해당 월 감정 캘린더 데이터 호출
  useEffect(() => {
    const fetchMonthlyCalendar = async () => {
      const year = dayjs(value).format("YYYY");
      const month = dayjs(value).format("M");

      try {
        // 백엔드 스펙: GET /api/v1/emotion-records/calendar?pregnancyId=1&year=2026&month=7
        const response = await api.get(
            `/api/v1/emotion-records/calendar?pregnancyId=${pregnancyId}&year=${year}&month=${month}`
        );

        // 백엔드가 주는 ApiResponse<T>에서 배열 추출 (가상 응답 기반 맵핑)
        const content = (response.data.data.content || response.data.data) as CalendarDayMood[];
        setMoodData(content);

      } catch (error) {
        console.error("감정 달력 로드 실패:", error);
        // 실서버 연결 테스트 전 가짜 데이터 가드 장치
        setMoodData([
          { id: 101, recordDate: "2026-07-02", moodScore: 5, moodLabel: "행복", noteText: "" },
          { id: 102, recordDate: "2026-07-05", moodScore: 1, moodLabel: "우울", noteText: "" },
          { id: 103, recordDate: "2026-07-08", moodScore: 2, moodLabel: "피곤", noteText: "" },
          { id: 104, recordDate: "2026-07-09", moodScore: 4, moodLabel: "설렘", noteText: "" },
        ]);
      }
    };

    fetchMonthlyCalendar();
  }, [value, pregnancyId]);

  // 🚀 2. 사용자가 특정 날짜를 클릭했을 때, 해당 날짜의 AI 리포트 개별 요청
  useEffect(() => {
    const fetchAiReport = async () => {
      const dateString = dayjs(value).format("YYYY-MM-DD");
      const dayData = moodData.find((d) => d.recordDate === dateString);

      // 해당 날짜에 기록(ID)이 존재할 때만 AI 리포트 API 호출 가능
      if (dayData && dayData.id) {
        setIsLoadingReport(true);
        try {
          // 백엔드 스펙: GET /api/v1/emotion-records/{emotionRecordId}/ai-report
          const response = await api.get(`/api/v1/emotion-records/${dayData.id}/ai-report`);
          const reportData = response.data.data as AiReportData;
          setAiReport(reportData.reportText);
        } catch (error) {
          console.error("AI 리포트 로드 실패:", error);
          setAiReport("최근 보건소 방문과 임신 중기 증상으로 인해 피로감을 자주 느끼셨네요. 하지만 아이를 만나는 것에 대한 긍정적인 기대감이 훨씬 더 커진 하루였습니다!");
        } finally {
          setIsLoadingReport(false);
        }
      } else {
        setAiReport("아직 기록이 없거나 대화가 누적되지 않아 AI 리포트를 생성할 수 없는 날이에요.");
      }
    };

    fetchAiReport();
  }, [value, moodData]);

  // moodLabel 텍스트를 적절한 이모지로 치환해주는 매퍼 함수
  const getMoodEmoji = (label: string) => {
    switch (label) {
      case "행복": return "😊";
      case "우울": return "😢";
      case "피곤": return "😴";
      case "설렘": return "🌸";
      case "불안": return "😰";
      default: return "📝";
    }
  };

  // 달력 칸마다 감정 이모지 그려주는 내부 함수
  const addMoodToTile = ({ date, view }: any) => {
    if (view === "month") {
      const dateString = dayjs(date).format("YYYY-MM-DD");
      // 백엔드 필드 명세 구조(recordDate)와 매핑
      const dayMood = moodData.find((d) => d.recordDate === dateString);

      if (dayMood) {
        return (
            <div className="flex justify-center mt-1 text-lg">
              {getMoodEmoji(dayMood.moodLabel)}
            </div>
        );
      }
    }
    return null;
  };

  const selectedDateString = dayjs(value).format("YYYY-MM-DD");
  const displayDate = dayjs(value).format("M월 D일");

  // 현재 선택된 날짜의 백엔드 데이터 찾기
  const selectedDayData = moodData.find((d) => d.recordDate === selectedDateString);

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

        {/* 2. 선택된 날짜의 기분 표시 영역 */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-gray-100/50 transition-all">
          <div className="flex flex-col">
          <span className="font-gowun text-sm font-bold text-pinky">
            {displayDate}의 기록
          </span>
            <h3 className="font-gowun text-lg font-black text-gray-800 mt-1">
              {selectedDayData
                  ? `${selectedDayData.moodLabel}한 날`
                  : "아직 기록이 없는 날이에요"}
            </h3>
          </div>

          {/* 기분 이모지 자동 매핑 변경 */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pinky/10 text-2xl shadow-inner border border-pinky/20">
            {selectedDayData ? getMoodEmoji(selectedDayData.moodLabel) : "❔"}
          </div>
        </div>

        {/* 3. AI 맞춤 리포트 영역 */}
        <div className="w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/80 via-white to-pinky/10 p-6 shadow-sm border border-indigo-50 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-inner">
              <StarOutlined className="text-lg" />
            </div>
            <div>
              <h3 className="font-gowun text-base font-extrabold text-gray-800">
                오늘의 온맘 AI 리포트
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {displayDate} 기록 기반 감정 레포트
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white/60 p-4 border border-white min-h-[80px] flex items-center">
            {isLoadingReport ? (
                <p className="text-sm text-gray-400 font-gowun animate-pulse w-full text-center">
                  Gemini 조력자가 리포트를 분석 중입니다...
                </p>
            ) : (
                <p className="text-sm text-gray-700 leading-relaxed font-gowun whitespace-pre-line">
                  {aiReport}
                </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Record;