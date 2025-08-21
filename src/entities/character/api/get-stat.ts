"use server";

import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import { CharacterStatContainer } from "../model/types/stat";
import { CharacterHyperStat } from "../model/types/hyper-stat";

// 반환 데이터 타입
export interface CharacterStatData {
  stat: CharacterStatContainer;
  hyperStat: CharacterHyperStat;
}

export async function getCharacterStat(
  ocid: string,
): Promise<CharacterStatData> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    const [statData, hyperStatData] = await Promise.all([
      nexonFetch<CharacterStatContainer>(`/character/stat?ocid=${ocid}`, {
        cache: "no-store",
      }),
      nexonFetch<CharacterHyperStat>(`/character/hyper-stat?ocid=${ocid}`, {
        cache: "no-store",
      }),
    ]);

    return {
      stat: statData,
      hyperStat: hyperStatData,
    };
  } catch (error: unknown) {
    handleCommonNexonError(error);
    throw error;
  }
}
