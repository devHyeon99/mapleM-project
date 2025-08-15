import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import { fetchRankingWithFallback } from "./fetch-ranking";
import {
  CharacterDetailData,
  CharacterEquipmentResponse,
  CharacterAndroidResponse,
  CharacterUnionResponse,
  CharacterBasicResponse,
  CharacterGuildResponse,
  CharacterEquipmentSetResponse,
  CharacterLevelRankingResponse,
  CharacterUnionRankingResponse,
} from "../model/types";

// ==========================================================================
// 2. 메인 함수
// ==========================================================================
export const getCharacterDetails = async (
  ocid: string,
): Promise<{ data: CharacterDetailData }> => {
  try {
    // 랭킹을 제외한 [필수 데이터] 요청 (하나라도 실패하면 에러 -> catch로 이동)
    const essentialRequests = {
      basic: nexonFetch<CharacterBasicResponse>(
        `/character/basic?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      guild: nexonFetch<CharacterGuildResponse>(
        `/character/guild?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      equip: nexonFetch<CharacterEquipmentResponse>(
        `/character/item-equipment?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      android: nexonFetch<CharacterAndroidResponse>(
        `/character/android-equipment?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      setEffect: nexonFetch<CharacterEquipmentSetResponse>(
        `/character/set-effect?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      union: nexonFetch<CharacterUnionResponse>(`/user/union?ocid=${ocid}`, {
        cache: "no-store",
      }),
    };

    // 랭킹 데이터 요청 (독립적으로 실행, 실패해도 null 반환)
    // 여기서 await를 걸면 병렬 효율이 떨어질 것 같지만,
    // 아래 Promise.all로 필수 데이터와 함께 묶어서 실행하므로 병렬성은 유지
    const rankingPromises = {
      levelRanking: fetchRankingWithFallback<CharacterLevelRankingResponse>(
        "/ranking/level",
        ocid,
      ),
      unionRanking: fetchRankingWithFallback<CharacterUnionRankingResponse>(
        "/ranking/union",
        ocid,
      ),
    };

    // 전체 병렬 실행 (필수 + 랭킹)
    const [
      basicData,
      guildData,
      equipData,
      androidData,
      equipSetEffectData,
      unionData,
      levelRankingData, // 얘는 실패해도 null로 들어옴
      unionRankingData, // 얘도 실패해도 null로 들어옴
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

    // 데이터 조합
    const { android_equipment, heart_equipment } = androidData ?? {};

    const combinedData: CharacterDetailData = {
      // --- 기본 정보 ---
      ...basicData,
      guild_name: guildData.guild_name ?? null,
      union_data: unionData ?? null,

      // 안전하게 가져온 랭킹 데이터 할당
      // (fetchRankingWithFallback이 이미 데이터가 없으면 null을 반환함)
      // (데이터가 있어도 배열이 비어있으면 null 처리)
      level_ranking: levelRankingData?.ranking?.[0] ?? null,
      union_ranking: unionRankingData?.ranking?.[0] ?? null,

      // --- 장비 정보 ---
      use_preset_no: equipData.use_preset_no,
      soul_set_option: equipData.soul_set_option,
      item_equipment: equipData.item_equipment ?? [],
      equipment_preset: equipData.equipment_preset ?? [],
      set_effect: equipSetEffectData.set_info ?? [],

      // --- 안드로이드 정보 ---
      android_equipment: android_equipment ?? null,
      heart_equipment: heart_equipment ?? null,
    };

    return { data: combinedData };
  } catch (error: unknown) {
    handleCommonNexonError(error);
    throw error;
  }
};
