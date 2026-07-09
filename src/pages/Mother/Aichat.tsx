import React, { useState } from "react";
import { SendOutlined, AudioOutlined } from "@ant-design/icons";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

const AiChat = () => {
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

  // 🚀 1. 메시지 전송 및 AI 가짜 응답 함수
  const handleSend = () => {
    if (!inputValue.trim()) return; // 빈 문자열 전송 방지

    // 유저가 입력한 대화 객체 생성 (C++의 push_back 개념!)
    const userMessage: Message = {
      id: Date.now(), // 고유한 타임스탬프 ID 생성
      text: inputValue,
      sender: "user",
    };

    // 기존 배열 뒤에 유저 대화 붙이기
    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // 입력창 비우기

    // 2. 오직 AI하고만 대화하므로, 전송 직후 AI 답장 트리거 (1초 뒤 시뮬레이션)
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "엄마의 마음을 누구보다 잘 이해하고 있어요. 오늘 있었던 일이나 기분을 더 이야기해 주시면 제가 더 꼼꼼히 챙겨드릴게요! 🌸",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
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
      </div>

      {/* 하단 텍스트 입력창 고정 영역 */}
      <div className="sticky bottom-0 flex items-center gap-2 bg-gray-50 pt-2 pb-1">
        <div className="flex flex-1 items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors focus-within:border-pinky focus-within:ring-1 focus-within:ring-pinky">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} // 🚀 엔터키 이벤트 감지!
            placeholder="AI에게 무엇이든 물어보세요..."
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
          />
          <button
            onClick={handleSend} // 🚀 전송 버튼 클릭 이벤트 연결!
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-pinky text-white transition-transform active:scale-95"
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
