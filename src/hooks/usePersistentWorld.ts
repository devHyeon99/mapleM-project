"use client";

import { useState, useEffect } from "react";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";

// sessionStorage에 월드 이름을 저장하기 위한 고유 키
const SELECTED_WORLD_KEY = "maple_selected_world";

type WorldName = (typeof WORLD_NAMES)[number];

/**
 * sessionStorage에서 저장된 월드 값을 가져오는 초기화 함수.
 */
const getInitialWorld = (): WorldName => {
  // 서버 사이드 렌더링(SSR) 시 window 객체가 없으므로 확인
  if (typeof window === "undefined") {
    return "전체";
  }

  const storedWorld = sessionStorage.getItem(SELECTED_WORLD_KEY);

  // 저장된 값이 있고, WORLD_NAMES 목록에 포함된 유효한 값인지 확인
  if (storedWorld && (WORLD_NAMES as readonly string[]).includes(storedWorld)) {
    return storedWorld as WorldName;
  }

  // 기본값 "전체" 반환
  return "전체";
};

/**
 * '월드' 선택 값을 sessionStorage에 지속시키고 상태를 관리하는 커스텀 훅.
 * useState와 동일한 [value, setValue] 튜플을 반환
 */
export const usePersistentWorld = () => {
  // 1. useState의 지연 초기화(lazy initialization)를 사용해
  //    컴포넌트 마운트 시 *한 번만* sessionStorage에서 값을 읽어옵니다.
  const [world, setWorld] = useState<WorldName>(getInitialWorld);

  // 2. 'world' 상태가 변경될 때마다(의존성 배열 [world] 참고)
  //    sessionStorage에 새 값을 저장하는 사이드 이펙트를 실행
  useEffect(() => {
    // SSR 환경이 아닌 클라이언트 환경인지 확인
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SELECTED_WORLD_KEY, world);
    }
  }, [world]); // 'world' 값이 변경될 때만 이 effect가 실행됩니다.

  // 3. React의 useState와 동일한 인터페이스를 반환
  return [world, setWorld] as const;
};
