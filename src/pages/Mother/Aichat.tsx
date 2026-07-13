import React, { useState } from "react";
import { SendOutlined, AudioOutlined } from "@ant-design/icons";
import { api } from "../../api/axios"; // 🚀 앞서 만든 공통 axios 인스턴스 임포트

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

// 🚀 1. 백엔드 Postman 명세에 맞춘 AI 응답 데이터 타입 정의 (빨간 줄 해결 열쇠)
interface ChatApiResponse {
  chatSessionId: number;
  answer: string;
}

interface AiChatProps {
  pregnancyId?: number; // Postman 스펙상 필수 파라미터
}

const AiChat = ({ pregnancyId = 1 }: AiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 오늘 기분은 어떠신가요? 사소한 고민이라도 편하게 이야기해 주세요. 🌸",
      sender: "ai",
    },
    { id: 2, text: "오늘 보건소 다녀왔는데 쪼금 피곤하네.", sender: "user" },
    {
      id: 3,
      text: "보건소 다녀오시느라 정말 고생 많으셨어요! 따뜻한 물로 샤워하고 푹 쉬시는 건 어떨까요? 튼튼이도 엄마가 푹 쉬길 바랄 거예요. 💖",
      sender: "ai",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [chatSessionId, setChatSessionId] = useState<number | null>(null); // 🚀 세션 ID 추적
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 메시지 전송 및 백엔드 API 연동 함수
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    const userMessageId = Date.now();

    // 1. 유저 입력 메시지 화면에 즉시 반영
    const userMessage: Message = {
      id: userMessageId,
      text: userText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 🚀 백엔드 Postman '04 Chat / Create Chat Message' API 규격 세팅
      const requestBody = {
        pregnancyId: pregnancyId,
        chatSessionId: chatSessionId,
        message: userText,
      };

      console.log("백엔드 Chat API 요청 전송:", requestBody);


      const response = await api.post('/api/v1/chat-messages', requestBody); //

      // 'as ChatApiResponse'로 데이터 타입을 확실하게 단언
      const responseData = response.data.data as ChatApiResponse;

      // 백엔드가 새로 발급했거나 기존에 유지하던 세션 ID를 저장
      if (!chatSessionId && responseData.chatSessionId) {
        setChatSessionId(responseData.chatSessionId);
      }

      // 4. 백엔드(Gemini)가 응답한 진짜 답변을 채팅창에 반영
      const aiResponse: Message = {
        id: Date.now(),
        text: responseData.answer,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiResponse]);

    } catch (error) {
      console.error("Chat API 호출 실패:", error);
      alert("AI 에이전트와 통신하는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 엔터키를 눌렀을 때도 전송되도록 처리하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
      <div className="flex h-full flex-col">
        {/* 대화 내역 스크롤 영역 */}
        <div className="flex-1 flex-col gap-4 overflow-y-auto pb-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
                <div
                    key={msg.id}
                    className={`mb-4 flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                      <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pinky/20 text-xs shadow-sm">
                        🤖
                      </div>
                  )}

                  <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isUser
                              ? "rounded-br-sm bg-pinky text-white"
                              : "rounded-bl-sm bg-white text-gray-700 border border-gray-100"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
            );
          })}
          {/* AI가 생각 중일 때 임시 로딩 UI */}
          {isLoading && (
              <div className="mb-4 flex w-full justify-start animate-pulse">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-pinky/10 text-xs">
                  💬
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-xs text-gray-400">
                  AI가 온맘을 다해 답변을 작성하고 있어요...
                </div>
              </div>
          )}
        </div>

        {/* 하단 텍스트 입력창 고정 영역 */}
        <div className="sticky bottom-0 flex items-center gap-2 bg-gray-50 pt-2 pb-1">
          <div className="flex flex-1 items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors focus-within:border-pinky focus-within:ring-1 focus-within:ring-pinky">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={isLoading ? "답변을 기다리는 중입니다..." : "AI에게 무엇이든 물어보세요..."}
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none disabled:text-gray-400"
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-pinky text-white transition-transform active:scale-95 disabled:bg-gray-300"
            >
              <SendOutlined className="text-xs" />
            </button>
          </div>

          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:text-pinky active:scale-95">
            <AudioOutlined className="text-lg" />
          </button>
        </div>
      </div>
  );
};

export default AiChat;