import "server-only";

import { nexonFetch } from "@/shared/api/nexon/server";
import { fetchWithRankingFallback } from "@/shared/api/nexon/ranking-fallback";
import type {
  CharacterItemEquipmentResponse,
  CharacterEquipmentSetResponse,
  CharacterAndroidResponse,
} from "@/entities/item";
import type {
  CharacterDetailData,
  CharacterBasicResponse,
  CharacterGuildResponse,
  CharacterUnionResponse,
  CharacterLevelRankingResponse,
  CharacterUnionRankingResponse,
} from "@/entities/character";

export async function fetchCharacterDetail(ocid: string): Promise<CharacterDetailData> {
  const trimmedOcid = ocid.trim();
  if (!trimmedOcid) throw new Error("ocid가 필요합니다.");

  const ocidQ = encodeURIComponent(trimmedOcid);

  const essentialRequests = {
    basic: nexonFetch<CharacterBasicResponse>(`/character/basic?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
    guild: nexonFetch<CharacterGuildResponse>(`/character/guild?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
    equip: nexonFetch<CharacterItemEquipmentResponse>(
      `/character/item-equipment?ocid=${ocidQ}`,
      { cache: "no-store" },
    ),
    android: nexonFetch<CharacterAndroidResponse>(
      `/character/android-equipment?ocid=${ocidQ}`,
      { cache: "no-store" },
    ),
    setEffect: nexonFetch<CharacterEquipmentSetResponse>(
      `/character/set-effect?ocid=${ocidQ}`,
      { cache: "no-store" },
    ),
    union: nexonFetch<CharacterUnionResponse>(`/user/union?ocid=${ocidQ}`, {
      cache: "no-store",
    }),
  };

  const rankingPromises = {
    levelRanking: fetchWithRankingFallback<CharacterLevelRankingResponse>(
      "/ranking/level",
      { ocid: trimmedOcid },
    ),
    unionRanking: fetchWithRankingFallback<CharacterUnionRankingResponse>(
      "/ranking/union",
      { ocid: trimmedOcid },
    ),
  };

  const [
    basicData,
    guildData,
    equipData,
    androidData,
    equipSetEffectData,
    unionData,
    levelRankingData,
    unionRankingData,
  ] = await Promise.all([
    essentialRequests.basic,
    essentialRequests.guild,
    essentialRequests.equip,
    essentialRequests.android,
    essentialRequests.setEffect,
    essentialRequests.union,
    rankingPromises.levelRanking,
    rankingPromises.unionRanking,
  ]);

  return {
    ocid: trimmedOcid,
    ...basicData,
    guild_name: guildData.guild_name ?? null,
    union_data: unionData ?? null,
    level_ranking: levelRankingData?.ranking?.[0] ?? null,
    union_ranking: unionRankingData?.ranking?.[0] ?? null,
    use_preset_no: equipData.use_preset_no,
    soul_set_option: equipData.soul_set_option,
    item_equipment: equipData.item_equipment ?? [],
    equipment_preset: equipData.equipment_preset ?? [],
    set_effect: equipSetEffectData.set_info ?? [],
    android_equipment: androidData?.android_equipment ?? null,
    heart_equipment: androidData?.heart_equipment ?? null,
    android_preset: androidData?.android_heart_equipment_preset ?? [],
  };
}
