import axios from "axios";

// 🚀 1. 백엔드 서버와 통신할 기본 인스턴스 생성
export const api = axios.create({
  // 백엔드 개발 팀이 로컬(컴퓨터)에서 띄운 Spring Boot 서버 주소
  baseURL: "http://127.0.0.1:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🚀 2. 무전기를 보낼 때마다 자동으로 '로그인 토큰'을 붙여주는 장치 (Interceptor)
// 백엔드 README 규칙: "Authorization: Bearer {accessToken} 헤더로 검증" 반영
api.interceptors.request.use(
  (config) => {
    // 카카오 로그인 성공 시 브라우저(LocalStorage)에 저장해둔 JWT 토큰을 꺼냅니다.
    const token = localStorage.getItem("accessToken");

    // 토큰이 존재한다면, 백엔드가 요구하는 Bearer 헤더 규격에 맞춰 자동으로 탑재합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🚀 3. 백엔드에서 에러 응답(ERROR)이 왔을 때 공통 처리하는 장치 (선택)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 토큰이 만료되었거나 권한이 없는 경우 (HTTP 401) 처리 예시
    if (error.response && error.response.status === 401) {
      console.error(
        "인증 토큰이 만료되었거나 유효하지 않습니다. 로그인이 필요합니다.",
      );
      // 필요시 런타임에서 로그인 페이지로 리다이렉트하는 로직을 팀원들과 추가할 수 있습니다.
    }
    return Promise.reject(error);
  },
);
