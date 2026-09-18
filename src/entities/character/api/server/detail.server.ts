import "server-only";

import { nexonFetch } from "@/shared/api/nexon/server";
import { isNexonNotFoundError } from "@/shared/api/nexon/handler";
import { resolveRankingDate } from "@/entities/ranking/server";
import type {
  CharacterItemEquipmentResponse,
  CharacterAndroidEquipment,
} from "@/entities/item";
import type {
  CharacterDetailData,
  CharacterBasicResponse,
  CharacterGuildResponse,
  CharacterUnionResponse,
  CharacterLevelRankingResponse,
  CharacterUnionRankingResponse,
} from "../../model/types";

function getRequiredResult<T>(
  result: PromiseSettledResult<T>,
  label: string,
): T {
  if (result.status === "fulfilled") return result.value;

  throw result.reason instanceof Error
    ? result.reason
    : new Error(`${label} 정보를 불러오지 못했습니다.`);
}

function getOptionalResult<T>(
  result: PromiseSettledResult<T>,
  label: string,
): T | null {
  if (result.status === "fulfilled") return result.value;

  console.warn(`[캐릭터 상세] 선택 데이터 요청 실패: ${label}`, {
    reason: result.reason,
  });

  return null;
}

export async function fetchCharacterDetail(
  ocid: string,
): Promise<CharacterDetailData | null> {
  const trimmedOcid = ocid.trim();
  if (!trimmedOcid) throw new Error("ocid가 필요합니다.");

  const ocidQ = encodeURIComponent(trimmedOcid);

  // 기준일이 필요한 건 랭킹 두 건뿐이라, 여기서 await 하면 날짜와 무관한
  // 나머지 요청까지 판정이 끝날 때까지 묶이므로, 시작만 시키고 랭킹 쪽에서 기다리게함.
  const rankingDatePromise = resolveRankingDate();

  const fetchRanking = async <T>(path: string) => {
    const query = new URLSearchParams({
      date: await rankingDatePromise,
      ocid: trimmedOcid,
    }).toString();

    return nexonFetch<T>(`${path}?${query}`, { next: { revalidate: 86400 } });
  };

  const [
    basicResult,
    equipResult,
    guildResult,
    androidResult,
    unionResult,
    levelRankingResult,
    unionRankingResult,
  ] = await Promise.allSettled([
    nexonFetch<CharacterBasicResponse>(`/character/basic?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
    nexonFetch<CharacterItemEquipmentResponse>(
      `/character/item-equipment?ocid=${ocidQ}`,
      { cache: "no-store" },
    ),
    nexonFetch<CharacterGuildResponse>(`/character/guild?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
    nexonFetch<CharacterAndroidEquipment>(
      `/character/android-equipment?ocid=${ocidQ}`,
      { cache: "no-store" },
    ),
    nexonFetch<CharacterUnionResponse>(`/user/union?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
    fetchRanking<CharacterLevelRankingResponse>("/ranking/level"),
    fetchRanking<CharacterUnionRankingResponse>("/ranking/union"),
  ]);

  // ocid 캐시(24h)에 남아있지만 삭제/개명된 캐릭터는 기본 정보 조회가
  // 데이터 없음으로 실패한다. 에러 페이지 대신 not-found로 보내기 위해 null 반환.
  if (
    basicResult.status === "rejected" &&
    isNexonNotFoundError(basicResult.reason)
  ) {
    return null;
  }

  const basicData = getRequiredResult(basicResult, "캐릭터 기본");
  const equipData = getRequiredResult(equipResult, "장비");
  const guildData = getOptionalResult(guildResult, "guild");
  const androidData = getOptionalResult(androidResult, "android");
  const unionData = getOptionalResult(unionResult, "union");
  const levelRankingData = getOptionalResult(
    levelRankingResult,
    "level-ranking",
  );
  const unionRankingData = getOptionalResult(
    unionRankingResult,
    "union-ranking",
  );

  return {
    ocid: trimmedOcid,
    ...basicData,
    guild_name: guildData?.guild_name ?? null,
    union_data: unionData ?? null,
    level_ranking: levelRankingData?.ranking?.[0] ?? null,
    union_ranking: unionRankingData?.ranking?.[0] ?? null,
    use_preset_no: equipData.use_preset_no,
    android_use_preset_no: androidData?.use_preset_no,
    soul_set_option: equipData.soul_set_option,
    item_equipment: equipData.item_equipment ?? [],
    equipment_preset: equipData.equipment_preset ?? [],
    android_equipment: androidData?.android_equipment ?? null,
    heart_equipment: androidData?.heart_equipment ?? null,
    android_preset: androidData?.android_heart_equipment_preset ?? [],
  };
}
