# VANITAS.SHOP — 게임 감성 흑백 파스텔톤 종합 쇼핑몰 프론트엔드

종합 쇼핑몰(Amazon/Coupang류) 프론트엔드를 구축한다. 첨부한 `shopping_mall_game.html`이
디자인 레퍼런스다. 이 HTML의 비주얼/레이아웃/인터랙션을 React 19 앱으로 재현한다.

---

## 1. 기술 스택 (고정)

- **React 19** + **TypeScript** + **Vite**
- **React Router v7** (data router 모드, `createBrowserRouter` 기반) — React 19와 호환되는 최신 메이저
- **TanStack Query v5** — 서버 상태 (상품, 카테고리, 주문 등 모든 fetch)
- **Zustand v5** — 클라이언트 상태 (장바구니, 찜, 인증, UI 상태)
- **CSS** — vanilla CSS + CSS Variables (레퍼런스 HTML 그대로). Tailwind 도입 금지.
- **Axios** — HTTP 클라이언트
- **백엔드**: 별도 운영 중인 **Spring Boot 서버**. `VITE_API_BASE_URL` 환경변수로 baseURL 주입.

추가 라이브러리는 위 스택으로 안 되는 게 명확할 때만 사용하고, 사용 시 이유를 README에 기록.

### 1-1. React 19 활용 원칙 (중요)

다음 React 19 기능을 적극 활용한다. 구버전 React 패턴(예: `forwardRef`, 수동 폼 상태)으로
회귀하지 말 것:

- **`ref` as prop** — `forwardRef` 사용 금지. ref를 일반 prop으로 받는다.
```tsx
  // ✅ React 19
  function Input({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> } & InputProps) {
    return <input ref={ref} {...props} />;
  }
  // ❌ 사용 금지
  // const Input = forwardRef(...)
```
- **`useActionState`** — 폼 제출 상태(pending, error, data) 관리. 로그인, 뉴스레터 구독,
  수량 변경 같은 mutation UI에 사용.
- **`useFormStatus`** — 자식 버튼이 부모 `<form>`의 pending 상태를 읽을 때 사용. 제출 버튼의
  로딩 상태 표시에 활용.
- **`useOptimistic`** — 찜 토글, 장바구니 수량 변경 등 즉시 반영이 필요한 곳에 사용.
- **`use`** — 조건부 컨텍스트 읽기나 Promise 언래핑이 필요한 경우 사용 (남용 금지).
- **`<form action={fn}>`** — 폼 제출은 onSubmit 대신 action prop 우선 사용.
- **Document Metadata** — `<title>`, `<meta>`를 컴포넌트 안에 직접 두면 자동으로 head로
  hoist된다. react-helmet 류 라이브러리 도입 금지.
- **Stylesheet/Script** — `<link rel="stylesheet" precedence>`, `<script async>`도 컴포넌트
  내부에서 자연스럽게 사용 가능.

### 1-2. TanStack Query와 React 19의 역할 분담

겹치는 영역이 있으니 명확히 구분:

- **데이터 fetching/캐싱** → TanStack Query (`useQuery`)
- **서버 mutation 후 캐시 invalidate** → TanStack Query (`useMutation`)
- **폼 제출 UX (pending/error 표시, optimistic UI)** → React 19 (`useActionState`,
  `useOptimistic`, `useFormStatus`)
- **둘을 함께 쓰는 패턴**: action 함수 안에서 `queryClient.getMutationCache()`를 직접 쓰지
  말고, `useMutation`을 만들어두고 action 안에서 `mutateAsync()`를 호출한 뒤 결과를
  반환하는 식으로 결합한다.

```tsx
  // 예시
  const addToCartMutation = useAddToCartMutation();
  const [state, formAction, isPending] = useActionState(
    async (_prev, formData) => {
      try {
        await addToCartMutation.mutateAsync({ productId: ... });
        return { ok: true };
      } catch (e) {
        return { ok: false, error: '...' };
      }
    },
    { ok: false }
  );
```

---

## 2. 폴더 구조

```
src/
├── app/                  # 라우터, 프로바이더, 전역 셋업
│   ├── router.tsx        # createBrowserRouter
│   ├── providers.tsx     # QueryClient, ErrorBoundary 등
│   └── App.tsx
├── pages/                # 라우트 단위 페이지
│   └── home/HomePage.tsx
├── features/             # 도메인별 기능 (UI + hooks + store + actions)
│   ├── product/
│   ├── cart/
│   ├── wishlist/
│   ├── category/
│   └── auth/
├── shared/
│   ├── api/              # axios 인스턴스, 인터셉터, mock
│   ├── ui/               # 재사용 컴포넌트 (Button, Badge, RarityStars 등)
│   ├── lib/              # 유틸 함수
│   ├── styles/           # globals.css, tokens.css
│   └── types/            # 공통 타입
└── widgets/              # 페이지 구성 단위 (Header, Footer, HeroSection 등)
```

각 feature 폴더 내부:
```
features/cart/
├── api/         # TanStack Query 훅 (useCartQuery, useAddToCartMutation)
├── model/       # zustand store, 타입
├── actions/     # React 19 action 함수 (addToCartAction 등)
├── ui/          # CartButton, CartItemRow 등
└── index.ts     # public API
```

---

## 3. 디자인 시스템

레퍼런스 HTML의 `:root` CSS 변수를 그대로 `src/shared/styles/tokens.css`로 분리.

- 컬러: `--ink`, `--bg`, `--paper`, `--pastel-pink/mint/lilac/butter/sky/peach`
- 폰트: `Press Start 2P`(라벨/CTA), `VT323`(본문/숫자), `Fraunces`(헤드라인), `Space Grotesk`(보조)
- 핵심 비주얼 규칙:
  - **3px 검은 보더 + 박스 섀도우 오프셋** (`box-shadow: Npx Npx 0 var(--ink)`)
  - 호버 시 `translate(-3px, -3px)`로 들리고 섀도우 커짐
  - 클릭 시 `translate(+px, +px)`로 눌림 (active state)
  - 픽셀 도트 패턴 배경 (`radial-gradient` 16px grid)
  - 일러스트는 `shape-rendering="crispEdges"` SVG로 픽셀 느낌 유지

`src/shared/ui/`에 다음을 컴포넌트화 (모두 ref를 prop으로 받는 React 19 스타일):
- `<Button variant="primary|secondary|ghost" size="sm|md|lg">` — 모든 CTA의 베이스
- `<PixelCard>` — 박스 섀도우 + 보더 + 호버 동작 가진 카드 베이스
- `<Badge>` — BEST/NEW/EPIC/-42% 등
- `<RarityStars count={5} />`
- `<RatingBar value={4.8} />` — HP 바 스타일
- `<PixelInput>` — 검색창 스타일
- `<SubmitButton>` — `useFormStatus`로 부모 폼의 pending 상태를 읽어 자동 로딩 표시

같은 시각 패턴이 2번 이상 등장하면 무조건 컴포넌트로 뽑는다.

---

## 4. API 레이어

### 4-1. axios 인스턴스 (`src/shared/api/client.ts`)
- `baseURL: import.meta.env.VITE_API_BASE_URL`
- 요청 인터셉터: `Authorization: Bearer ${token}` 자동 첨부 (zustand auth store에서 읽기)
- 응답 인터셉터: 401 시 토큰 정리 후 로그인 페이지로 리다이렉트
- 타임아웃 10초

### 4-2. TanStack Query 셋업 (`src/app/providers.tsx`)
- `QueryClient` 기본 옵션: `staleTime: 60_000`, `retry: 1`, `refetchOnWindowFocus: false`
- `<ReactQueryDevtools />` 포함 (개발 환경만)

### 4-3. Query Key 컨벤션
```ts
// 계층형 key factory 패턴
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};
```

### 4-4. 백엔드 API 명세 — Spring Boot 서버 미정 (가정)

다음 엔드포인트가 있다고 **가정**하고, 응답 타입은 `src/shared/types/api.ts`에 정의.
실제 명세가 다르면 추후 수정 가능하도록 API 레이어를 격리:

```
GET  /api/products?category=&sort=&page=&size=    → Page<Product>
GET  /api/products/{id}                           → Product
GET  /api/products/best?limit=8                   → Product[]
GET  /api/categories                              → Category[]
GET  /api/deals/flash                             → FlashDeal
POST /api/auth/login                              → { token, user }
GET  /api/cart                                    → CartItem[]   (인증 필요)
POST /api/cart                                    → CartItem
POST /api/wishlist/{productId}                    → void
```

**중요**: 실제 API가 없으므로, `src/shared/api/mock/`에 MSW(Mock Service Worker)를 두고
환경변수 `VITE_USE_MOCK=true`일 때 mock을 사용. 지금은 mock으로 동작하게 만들고, 실제
서버 붙이는 건 나중 단계.

---

## 5. Zustand 스토어 (v5)

각 store는 `features/{domain}/model/store.ts`에 위치. `persist` 미들웨어로 localStorage 동기화.

- **`useCartStore`** — `items`, `add`, `remove`, `updateQty`, `clear`, `totalPrice`(selector)
- **`useWishlistStore`** — `productIds: number[]`, `toggle`, `has`
- **`useAuthStore`** — `token`, `user`, `login`, `logout` (persist 필수)
- **`useUIStore`** — 모달, 사이드바 등 UI 상태

규칙:
- 서버 데이터는 절대 zustand에 넣지 않는다 (그건 TanStack Query 담당).
- 셀렉터는 항상 좁게: `useCartStore(s => s.items.length)` 식으로 구독해서 불필요한
  리렌더 방지. `useShallow`가 필요한 케이스도 적극 사용.
- React 19 환경에서 `use(store)` 같은 패턴은 쓰지 말고, 표준 zustand 훅 그대로.

---

## 6. 라우팅 (React Router v7, data router)

`createBrowserRouter`로 셋업. loader는 일단 사용 안 함 (TanStack Query가 데이터 담당).
errorElement만 라우트별로 지정.

```
/                       — HomePage (이번 작업 범위)
/products               — ProductListPage (placeholder)
/products/:id           — ProductDetailPage (placeholder)
/category/:slug         — CategoryPage (placeholder)
/cart                   — CartPage (placeholder)
/wishlist               — WishlistPage (placeholder)
/login                  — LoginPage (placeholder)
```

placeholder 페이지는 "Coming Soon" + 헤더/푸터만 보이게.

각 페이지 컴포넌트 안에서 React 19 Document Metadata 사용:
```tsx
function HomePage() {
  return (
    <>
      <title>VANITAS.SHOP — 오늘의 발견</title>
      <meta name="description" content="..." />
      {/* ... */}
    </>
  );
}
```

---

## 7. 이번 작업 범위 — `/` (HomePage) 완성

레퍼런스 HTML의 모든 섹션을 React 컴포넌트로 옮긴다:

1. **TopBar** — 프로모 메시지 + 링크
2. **Header** — 로고, 검색, 알림/찜/장바구니 아이콘(뱃지는 zustand 카운트 연동), 로그인 버튼
   - 검색 폼은 `<form action={searchAction}>` + `useFormStatus` 사용한 `<SubmitButton>`
3. **HUDBar** — LV/COIN/HEART/EXP/DAY (현재는 더미, 추후 user API 연동 가능 구조로)
4. **HeroSection** — 메인 배너 + 사이드 카드 2개 (픽셀 캐릭터 SVG 포함)
5. **CategoriesSection** — `useCategoriesQuery` 사용. 로딩/에러 상태 처리
6. **DealBanner** — 자정까지 카운트다운 (`useCountdown` 훅 분리)
7. **BestProductsSection** — `useBestProductsQuery` 사용, `<ProductCard>` 8개
   - 찜 버튼: `useOptimistic`으로 즉시 토글 + `useWishlistStore` + 백엔드 mutation
   - ADD 버튼: `<form action={addToCartAction}>`로 구현. 성공 시 "✓ GOT IT" 표시는
     `useActionState`의 state로 제어. 카트 카운트는 `useOptimistic`으로 즉시 증가
8. **EditorialSection** — 퀘스트 카드 3개
9. **TrustBar** — 4개 신뢰 배지
10. **Footer** — 5컬럼 + 뉴스레터 폼 (`useActionState`로 제출 상태 관리) + 픽셀 띠

레퍼런스의 SVG 일러스트는 그대로 살린다 (인라인 SVG 컴포넌트로 분리). 반응형 동작도 그대로.

---

## 8. 코드 품질 규칙

- **TypeScript strict 모드**, `any` 금지
- 모든 컴포넌트는 함수형, props는 interface로 정의
- API 호출은 반드시 TanStack Query 훅으로 감싸서 컴포넌트에 노출
- `forwardRef` 사용 금지 (React 19 ref-as-prop 사용)
- `import` 순서: 외부 라이브러리 → 절대경로(`@/...`) → 상대경로
- `tsconfig.json`에 path alias 설정: `@/* → src/*`
- ESLint(react-hooks 플러그인 포함) + Prettier 셋업
- 주석은 "왜"를 설명할 때만, "뭐"는 코드로 충분

---

## 9. 진행 순서

각 단계 완료 시 빌드/타입체크가 깨지지 않는 상태를 유지할 것.

1. Vite + React 19 + TS 프로젝트 생성 → 의존성 설치
   - `react@19`, `react-dom@19`, `@types/react@19`, `@types/react-dom@19` 명시 설치
   - `react-router@7`, `@tanstack/react-query@5`, `zustand@5`, `axios`, `msw` 설치
2. 폴더 구조 + path alias + ESLint/Prettier 셋업
3. 디자인 토큰(`tokens.css`) + 글로벌 스타일 + 폰트 import
4. axios 인스턴스 + TanStack Query 프로바이더 + MSW mock 셋업
5. Zustand 스토어 4개 (cart/wishlist/auth/ui)
6. `shared/ui` 베이스 컴포넌트 (Button, PixelCard, Badge, RarityStars, RatingBar,
   PixelInput, SubmitButton)
7. 라우터 셋업 (createBrowserRouter) + placeholder 페이지
8. HomePage 섹션별 구현 (위 순서대로)
9. README 작성: 실행법, 환경변수, 폴더 구조 요약, React 19 활용 포인트 정리

---

## 10. 첨부

- `shopping_mall_game.html` — 디자인 레퍼런스 (이대로 보이게 만들기)

레퍼런스의 비주얼은 1:1로 재현하는 것을 목표로 하되, 컴포넌트 구조는 React 19 + 위 스택에
맞게 재구성한다 (섹션별 분리, 반복 요소 컴포넌트화, action/optimistic 패턴 적극 활용).