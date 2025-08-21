"use server";

import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import { CharacterStatContainer } from "../model/types/stat";
import { CharacterHyperStat } from "../model/types/hyper-stat";

export interface CharacterStatData {
  stat: CharacterStatContainer;
  hyperStat: CharacterHyperStat | null;
}

export async function getCharacterStat(
  ocid: string,
  level: number = 0,
): Promise<CharacterStatData> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    // 140레벨 이상일 때만 하이퍼 스탯 요청 Promise 생성
    const shouldFetchHyperStat = level >= 140;

    const [statData, hyperStatData] = await Promise.all([
      nexonFetch<CharacterStatContainer>(`/character/stat?ocid=${ocid}`, {
        cache: "no-store",
      }),
      // 조건부 요청: 140 미만이면 요청 안 함 (null 반환)
      shouldFetchHyperStat
        ? nexonFetch<CharacterHyperStat>(`/character/hyper-stat?ocid=${ocid}`, {
            cache: "no-store",
          })
        : Promise.resolve(null),
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
