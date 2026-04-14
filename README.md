# 메엠지지 (MapleM.gg)

> 메이플스토리M 캐릭터 검색 · 길드 조회 · 랭킹 · 장비 성장 시뮬레이션을 한곳에서 제공하는 웹 서비스

- **서비스 주소**: https://maplemgg.com
- **프로젝트 기간**: 2025.03 ~ 현재 (진행 중)
- **데이터**: Nexon Open API

---

## 프로젝트 소개

메엠지지는 넥슨 Open API 기반의 메이플스토리M 캐릭터/길드 데이터를 보기 좋게 정리해 보여주고, 플레이 중 반복적으로 계산해야 하는 정보(세트 효과, 강화 비용, 큐브/추가옵션 결과 등)를 도구 형태로 제공하는 웹 서비스입니다.

단순 데이터 조회를 넘어, 게임 내 복잡한 장비 옵션·잠재옵션·스타포스·세트 효과를 UI 친화적인 모델로 가공해 한눈에 파악할 수 있도록 하는 것을 목표로 합니다.

---

## 주요 기능

### 캐릭터 검색

- 월드와 캐릭터명 기준 캐릭터 상세 정보 조회
- 장비 · 외형 · 스탯 · 쥬얼 · 심볼 · 스킬 · 링크 스킬 정보 제공
- 유니온, V매트릭스, HEXA 스킬, HEXA 스탯 등 성장 현황 확인
- 장비 옵션 · 잠재옵션 · 추가옵션 · 스타포스 · 세트 효과를 UI 모델로 가공해 표시

### 길드 조회

- 월드별 길드 검색
- 길드 기본 정보, 길드원 목록, 길드 스킬/어빌리티/건물 정보 확인
- 길드 마크 및 관련 이미지를 활용한 상세 화면 제공

### 랭킹

- 타입별 랭킹 보드 제공
- 월드 · 직업 등 조건 기반 필터링
- 페이지네이션 및 모바일 전용 리스트 UI 지원

### 메이플스토리M 도구

- **세트옵션 계산기**: 장비 구성 기준 활성화 세트 효과 및 변경 전후 차이 계산
- **큐브 시뮬레이터**: 부위/등급/옵션 조건에 따른 큐브 결과 시뮬레이션
- **추가옵션 시뮬레이터**: 장비 부위별 추가옵션 결과 계산
- **스타포스 강화 시뮬레이터**: 강화 비용과 성공/실패 흐름 시뮬레이션

### 공지 및 소식

- 메이플스토리M 공지사항 및 이벤트/패치 소식 조회
- 사이트 자체 공지사항 표시

---

## 기술 스택

| 구분                  | 사용 기술                                                               |
| --------------------- | ----------------------------------------------------------------------- |
| **Framework**         | Next.js 16 (App Router, Turbopack)                                      |
| **Language**          | TypeScript 5                                                            |
| **UI**                | React 19, Tailwind CSS 4, Shadcn UI / Radix UI, Base UI, lucide-react   |
| **State / Data**      | TanStack Query (React Query)                                            |
| **Form / Validation** | React Hook Form, Zod                                                    |
| **Backend / DB**      | Supabase (@supabase/ssr, @supabase/supabase-js)                         |
| **External API**      | Nexon Open API                                                          |
| **Utilities**         | date-fns, clsx, tailwind-merge, class-variance-authority, html-to-image |
| **Test**              | Vitest                                                                  |
| **Lint / Format**     | ESLint 9, Prettier (prettier-plugin-tailwindcss)                        |

---

## 아키텍처

**Feature-Sliced Design (FSD)** 방법론을 기반으로 레이어를 분리해 관심사를 명확히 나누고 확장성과 유지보수성을 확보했습니다.

```
src/
├── app/        # Next.js App Router (라우팅, 레이아웃, API Route, Provider)
│   └── api/        # 서버 API Route (character, revalidate)
├── widgets/    # 독립적인 UI 블록 (character-detail, guild-detail,
│               #   ranking-board, cube-simulator, starforce-simulator 등)
├── features/   # 사용자 상호작용 단위 (character-search, guild-search,
│               #   item-popover, share-spec-card)
├── entities/   # 비즈니스 도메인 모델 (character, guild, item, ranking,
│               #   skill, set-effect, cash-item, notice 등)
└── shared/     # 공용 모듈 (api[nexon/supabase], lib, ui, model, config)
```

### 주요 설계 포인트

- **루트 레이아웃에 공통 셸(Header/Footer)** 을 두고, 세그먼트 `layout`으로 하위 공통 UI 를 추가
- **Nexon Open API 데이터 가공 레이어**를 entities에 두어, 원시 API 응답을 UI에 적합한 도메인 모델로 변환
- **이미지 최적화**: AVIF/WebP 우선 포맷, 넥슨 이미지 서버에 대한 장기 캐시(TTL 1년) 적용으로 외부 요청 최소화
- **보안 헤더 설정**: `X-Powered-By` 헤더 제거 등 기본 보안 강화
- **revalidate API Route**를 통한 캐시 재검증 처리

---

## 실행 방법

```bash
# 개발 서버 (Turbopack)
pnpm dev

# 프로덕션 빌드
pnpm build
pnpm start

# 번들 분석
pnpm build:analyze

# 테스트
pnpm test
pnpm test:watch

# 린트
pnpm lint
pnpm lint:fix
```

> 패키지 매니저는 **pnpm**을 사용합니다. (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)

### 환경 변수

`.env.local`에 Nexon Open API 키 및 Supabase 연결 정보가 필요합니다.
