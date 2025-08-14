import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import {
  CharacterDetailData,
  CharacterEquipmentResponse,
  CharacterAndroidResponse,
  CharacterUnionResponse,
  CharacterBasicResponse,
  CharacterGuildResponse,
  CharacterEquipmentSetResponse,
  CharacterLevelRankingResponse,
} from "../model/types";

/**
 * 캐릭터 상세 정보 조회 (통합)
 * - 기본정보, 장비, 안드로이드, 세트효과, 유니온 등을 병렬로 조회
 */
export const getCharacterDetails = async (
  ocid: string,
): Promise<{ data: CharacterDetailData }> => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dateString = yesterday.toLocaleDateString("fr-CA", {
    timeZone: "Asia/Seoul",
  });

  try {
    // 병렬 요청 준비를 위한 객체 생성
    const requests = {
      basic: nexonFetch<CharacterBasicResponse>(
        `/character/basic?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      levelRanking: nexonFetch<CharacterLevelRankingResponse>(
        `/ranking/level?date=${dateString}&ocid=${ocid}`,
        {
          cache: "no-store",
        },
      ),
      guild: nexonFetch<CharacterGuildResponse>(
        `/character/guild?ocid=${ocid}`,
        {
          cache: "no-store",
        },
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

    // 병렬 실행
    // nexonFetch는 실패 시 throw하므로, 하나라도 실패하면 catch 블록으로 이동합니다.
    const responses = await Promise.all(Object.values(requests));

    // 결과 추출 (순서 중요: requests 객체의 value 순서와 동일)
    const [
      basicData,
      levelRankingData,
      guildData,
      equipData,
      androidData,
      equipSetEffectData,
      unionData,
    ] = responses as [
      CharacterBasicResponse,
      CharacterLevelRankingResponse,
      CharacterGuildResponse,
      CharacterEquipmentResponse,
      CharacterAndroidResponse,
      CharacterEquipmentSetResponse,
      CharacterUnionResponse,
    ];

    // 데이터 조합
    const { android_equipment, heart_equipment } = androidData ?? {};

    const combinedData: CharacterDetailData = {
      // --- 기본 정보 ---
      ...basicData,
      level_ranking: levelRankingData.ranking[0],
      guild_name: guildData.guild_name ?? null,
      union_data: unionData ?? null,

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
    // 공통 에러 처리 (점검, 500, 키 만료 등)
    handleCommonNexonError(error);

    // 상세 조회에서의 예외 처리
    // OCID로 조회했는데 데이터가 없다? -> 삭제된 캐릭터거나 로직 오류 -> 에러 처리
    // (nexonFetch가 이미 400 에러를 throw 했으므로 여기서는 그대로 상위로 전파하거나, 메시지를 다듬어서 throw)
    throw error;
  }
};
