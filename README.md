# VANITAS_FE

MARU.SHOP 게임 감성 흑백 파스텔톤 종합 쇼핑몰 프론트엔드입니다. `docs/init.md`와
`docs/shopping_mall_game.html`을 기준으로 React 19 + TypeScript + Vite 앱을 구성했습니다.

## 실행

```bash
npm install
cp .env.example .env
npm run dev
```

현재 mock API로 바로 확인하려면:

```bash
VITE_USE_MOCK=true VITE_API_BASE_URL= npm run dev -- --host 127.0.0.1
```

로컬 개발 서버: `http://127.0.0.1:5173/`

## 환경변수

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK=true
```

`VITE_USE_MOCK=true`이면 MSW가 `/api/*` 요청을 가로채서 상품, 카테고리, 플래시 딜,
장바구니, 찜 API를 mock으로 응답합니다.

## 구조

- `src/app`: Router, Provider, 앱 셸
- `src/pages`: 라우트 단위 페이지
- `src/features`: product, category, cart, wishlist, auth, deal 도메인 코드
- `src/shared`: API client, 타입, 스타일 토큰, 공통 UI
- `src/widgets`: Header, Footer 같은 페이지 조립 단위

## React 19 활용

- `ref` as prop 방식의 공통 UI 컴포넌트 사용
- 검색, 상품 추가, 뉴스레터에 `<form action={fn}>`와 `useActionState` 적용
- 제출 버튼은 `useFormStatus` 기반 `SubmitButton`으로 pending 상태 표시
- 상품 찜과 장바구니 추가 UX에 `useOptimistic` 적용
- 페이지별 `<title>`, `<meta>`를 컴포넌트 안에서 직접 선언

## 추가 라이브러리

- `@tanstack/react-query-devtools`: `docs/init.md`의 개발 환경 Query Devtools 요구사항을 위해
  TanStack Query와 함께 사용합니다.

## 검증

```bash
npm run lint
npm run build
```
