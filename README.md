## 폴더 구조

src/
├── assets/ # 이미지(로고, 캐릭터 등), 아이콘(SVG), 폰트 등 정적 자원
├── components/ # 여러 페이지에서 재사용되는 UI 컴포넌트 조각들
│ ├── common/ # Button, Input, Modal, Card 등 범용 컴포넌트
│ └── layout/ # Layout (역할별 동적 하단 네비게이션 적용) 등 화면 뼈대
├── pages/ # 피그마 디자인의 '화면' 단위 컴포넌트 (역할 기반 분리)
│ ├── Onboarding/ # 앱 진입 (Splash, 역할 선택, 로그인, 부부 연결)
│ ├── Mother/ # 산모 전용 메인 화면
│ └── FamilyRole/ # 남편 전용 메인 화면
├── hooks/ # 커스텀 훅 모음 (예: useAuth, 데이터 페칭 훅)
├── services/ # 백엔드 및 AI API 통신 관련 코드 (Axios 인스턴스 등)
├── store/ # 전역 상태 관리 (필요 시 추가 - Zustand, Recoil 등)
├── types/ # 전역에서 사용할 TypeScript 타입/인터페이스 정의 (.ts)
├── utils/ # 공통 유틸리티 함수 (주수 계산, 디데이 포맷팅 등)
├── App.tsx # 최상위 라우터 설정 및 역할(Role) 기반 화면 분기 처리
├── main.tsx # 애플리케이션의 시작점 (Root 렌더링)
└── index.css # Tailwind 지시어가 포함된 글로벌 스타일 파일

## 🚀 로컬 실행 방법 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 아래의 단계를 따라주세요.

### 1️⃣ 요구 사항 (Prerequisites)

- Node.js (v18.0.0 이상 권장)
- npm (또는 yarn)

### 2️⃣ 프로젝트 클론 및 설치 (Clone & Install)

```bash
# 1. 레포지토리 클론
git clone [https://github.com/2026-AI-Agent-digital-competition/onmom-frontend.git](https://github.com/2026-AI-Agent-digital-competition/onmom-frontend.git)

# 2. 프로젝트 폴더로 이동
cd onmom-frontend

# 3. 의존성 패키지 설치
npm install
```
