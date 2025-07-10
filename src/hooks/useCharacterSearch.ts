"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { WORLD_NAMES } from "@/constants/worlds";
import { saveSearchHistory } from "@/utils/localStorage";

export function useCharacterSearch(onSearch?: (ocid: string) => void) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchCharacter = async (
    name: string,
    world: (typeof WORLD_NAMES)[number],
  ) => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.warning("캐릭터 닉네임을 입력해주세요.");
      return;
    }

    const validName = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!validName.test(trimmed)) {
      toast.warning(
        "한글, 영문, 숫자로 이루어진 2~8자의 닉네임만 검색 가능합니다.",
      );
      return;
    }

    setLoading(true);
    try {
      if (world === "전체") {
        router.push(`/characters?name=${encodeURIComponent(trimmed)}`);

        saveSearchHistory(trimmed, world);
        return;
      }

      const res = await fetch(
        `/api/characters/ocid?character_name=${encodeURIComponent(trimmed)}&world_name=${encodeURIComponent(world)}`,
      );

      if (!res.ok) throw new Error("OCID 요청 실패");
      const resJson = await res.json();
      const ocid = resJson.data?.ocid ?? resJson.ocid;
      if (!ocid) throw new Error("OCID를 찾을 수 없습니다.");

      saveSearchHistory(trimmed, world);

      if (onSearch) onSearch(ocid);
      else router.push(`/character/${ocid}`);
    } catch (error) {
      toast.warning(
        "캐릭터 정보를 불러오는데 실패했습니다. (존재하지 않는 캐릭터이거나 2022년 1월 1일 이후 접속하지 않은 캐릭터입니다.)",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, searchCharacter };
}
