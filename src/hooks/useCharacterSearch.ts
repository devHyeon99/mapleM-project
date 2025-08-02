import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { usePersistentWorld } from "@/hooks/usePersistentWorld";
import { saveSearchHistory } from "@/utils/localStorage";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { toast } from "sonner";

type WorldName = (typeof WORLD_NAMES)[number];

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
const VALIDATION_ERROR_MESSAGE =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export const useCharacterSearch = () => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [world, setWorld] = usePersistentWorld();
  const [isPending, startTransition] = useTransition();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 외부 클릭 감지 로직
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }

    function handleFocusOutside(event: FocusEvent) {
      // 'focusin' 이벤트는 포커스가 들어올 때 발생
      // 포커스가 들어온 대상(event.target)이
      // 우리 검색 컨테이너(searchContainerRef.current)에 포함되어 있지 않다면, 포커스가 밖으로 나갔다고 간주

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("focusin", handleFocusOutside);
    };
  }, [searchContainerRef]); // ref는 변경되지 않으므로, 의존성 배열에 searchContainerRef만 있어도 됨.

  // 라우팅 및 히스토리 저장 로직
  const navigateToCharacter = (name: string, world: WorldName) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    saveSearchHistory(trimmedName, world);
    setShowHistory(false); // 검색 시 히스토리 패널 닫기

    const path =
      world === "전체"
        ? `/characters?name=${encodeURIComponent(trimmedName)}`
        : `/character/${encodeURIComponent(world)}/${encodeURIComponent(
            trimmedName,
          )}`;

    startTransition(() => {
      router.push(path);
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!VALIDATION_REGEX.test(trimmedQuery)) {
      toast.error("입력 오류", {
        description: VALIDATION_ERROR_MESSAGE,
      });
      return;
    }

    navigateToCharacter(trimmedQuery, world);
  };

  // 월드 변경 핸들러
  const handleWorldChange = (value: string) => {
    setWorld(value as WorldName);
  };

  // 검색 기록 클릭 핸들러
  const handleHistorySearch = (name: string, world: WorldName) => {
    setQuery(name);
    setWorld(world);
    navigateToCharacter(name, world);
  };

  // Input 포커스 핸들러
  const handleInputFocus = () => {
    setShowHistory(true);
  };

  // Input 변경 핸들러
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // 훅이 반환할 값들
  return {
    query,
    world,
    isPending,
    showHistory,
    searchContainerRef,
    handleSubmit,
    handleWorldChange,
    handleHistorySearch,
    handleInputFocus,
    handleQueryChange,
  };
};
