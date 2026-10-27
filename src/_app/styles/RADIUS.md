# 모서리(radius) 가이드

토큰 정의는 `globals.css`의 `@theme` 안 `--radius-*`. 값 하나 수정하면 전체 반영됨.
`rounded`, `rounded-sm`~`rounded-4xl`, `rounded-[24px]` 같은 단계·임의 값은 쓰지 않음.
방향 지정도 같은 토큰 사용(`rounded-t-card`, `rounded-l-control`).

## 역할 토큰

| 클래스             | 값   | 용도                                                                 |
| ------------------ | ---- | -------------------------------------------------------------------- |
| `rounded-card`     | 20px | 카드, 다이얼로그, 페이지 섹션, 탭 묶음 배경, 빈 상태 패널            |
| `rounded-popover`  | 18px | 드롭다운·셀렉트 목록, 팝오버, 헤더 하위 메뉴, 검색 기록 목록         |
| `rounded-control`  | 18px | 버튼, 입력창, 셀렉트, 탭, 토글, 검색창 묶음                          |
| `rounded-item`     | 14px | 메뉴 항목, 툴팁, hover 배경이 생기는 목록 행·텍스트 링크             |
| `rounded-box`      | 10px | 카드 안의 박스(스펙 요약, 세트 효과 버튼, 페이지 박스), 스켈레톤 기본 |
| `rounded-icon`     | 4px  | 길드 마크, 스킬·심볼 아이콘 틀, 체크박스                             |
| `rounded-full`     | -    | 칩·배지·태그, 스위치, 진행 바, 원형 버튼·아바타·점                    |
| `rounded-none`     | -    | 둥근 섹션 안을 칸으로 나누는 카드(홈 공지, 길드 능력·스킬·건물)      |

- 겹친 요소는 바깥이 안쪽보다 같거나 크게(card ≥ popover·control ≥ item ≥ box ≥ icon)
- 칩·배지는 크기와 상관없이 `rounded-full`
- 스켈레톤은 대신하는 요소의 토큰을 그대로 사용(버튼 자리면 `rounded-control`)

## 예외

- 아이템 아이콘 틀·빈 슬롯(`ItemIconFrame`, `ItemEmptySlot`, `ItemEmptyRow`)과 모서리 배지: 게임 UI 느낌을 위해 `rounded-xs`(2px)
- `PhotoCard`, `SpecCard*`: 이미지로 내보내는 고정 레이아웃
- 툴팁 화살표 `rounded-[2px]`, 스크롤 영역 `rounded-[inherit]`: shadcn 내부 구현
- `--radius`와 `--radius-sm`~`--radius-4xl`: shadcn CLI로 추가하는 컴포넌트 호환용. 새로 추가하면 위 토큰으로 바꿔 쓸 것
