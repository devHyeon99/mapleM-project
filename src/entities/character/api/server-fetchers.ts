import {
  CharacterDetailData,
  CharacterEquipmentResponse,
} from "../model/types/character";

const NEXON_API_KEY = process.env.NEXON_API_KEY;
const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

// 이 함수들은 서버에서만 호출되어야 함

/** OCID 조회 */
export const getOcid = async (world: string, name: string) => {
  const res = await fetch(
    `${NEXON_API_BASE_URL}/id?character_name=${name}&world_name=${world}`,
    {
      headers: { "x-nxopen-api-key": NEXON_API_KEY! },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`${world} 월드 ${name} 캐릭터 OCID 조회 실패`);
  return res.json();
};

/** 캐릭터 기본 정보 조회 (간단버전) */
export const getCharacterBasicInfo = async (ocid: string) => {
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(
    `${NEXON_API_BASE_URL}/character/basic?ocid=${ocid}`,
    {
      headers: { "x-nxopen-api-key": NEXON_API_KEY },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      `Nexon API (basic) 실패: ${errorData?.error?.message || res.statusText}`,
    );
  }

  return res.json();
};

/** 캐릭터 기본 정보 조회 */
export const getCharacterDetails = async (
  ocid: string,
): Promise<{ data: CharacterDetailData }> => {
  const NEXON_API_KEY = process.env.NEXON_API_KEY;
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const headers = { "x-nxopen-api-key": NEXON_API_KEY };

  const fetchOptions: RequestInit = {
    headers: headers,
    cache: "no-store",
  };

  const requests = {
    basic: fetch(
      `${NEXON_API_BASE_URL}/character/basic?ocid=${ocid}`,
      fetchOptions,
    ),
    guild: fetch(
      `${NEXON_API_BASE_URL}/character/guild?ocid=${ocid}`,
      fetchOptions,
    ),
    equip: fetch(
      `${NEXON_API_BASE_URL}/character/item-equipment?ocid=${ocid}`,
      fetchOptions,
    ),
    android: fetch(
      `${NEXON_API_BASE_URL}/character/android-equipment?ocid=${ocid}`,
      fetchOptions,
    ),
    setEffect: fetch(
      `${NEXON_API_BASE_URL}/character/set-effect?ocid=${ocid}`,
      fetchOptions,
    ),
  };

  // 병렬 실행
  const responses = await Promise.all(Object.values(requests));

  if (responses.some((res) => !res.ok)) {
    throw new Error("Nexon API 요청 중 일부가 실패했습니다.");
  }

  // JSON 변환
  const [basicData, guildData, equipData, androidData, setEffectData] =
    await Promise.all(responses.map((res) => res.json()));

  // 장비 데이터를 정확한 타입으로 인식시킴
  const equipResponse = equipData as CharacterEquipmentResponse;

  // 데이터 조합
  const { android_equipment, heart_equipment } = androidData ?? {};

  // CharacterDetailData 타입에 맞춰 객체 구성
  const combinedData: CharacterDetailData = {
    // 1. 기본 정보 (Basic API 응답 그대로 사용: level, exp, gender 등 포함)
    ...basicData,

    // 2. 추가 정보
    guild_name: guildData.guild_name ?? null,

    // 3. 장비 정보 (프리셋 포함)
    use_preset_no: equipResponse.use_preset_no,
    soul_set_option: equipResponse.soul_set_option,
    item_equipment: equipResponse.item_equipment ?? [],
    equipment_preset: equipResponse.equipment_preset ?? [],

    // 4. 기타 장비
    android_equipment: android_equipment ?? null,
    heart_equipment: heart_equipment ?? null,

    // 5. 세트 효과 (구조 주의: set_info)
    set_effect: setEffectData?.set_info ?? [],
  };

  return {
    data: combinedData,
  };
};

/**
 * "전체 검색"용 OCID 조회 함수
 * (캐릭터가 없으면 에러 대신 null을 반환)
 */
export const getOcidForSearch = async (world: string, name: string) => {
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(
    `${NEXON_API_BASE_URL}/id?character_name=${encodeURIComponent(
      name,
    )}&world_name=${encodeURIComponent(world)}`,
    {
      headers: { "x-nxopen-api-key": NEXON_API_KEY },
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (data?.error?.name === "OPENAPI00004") {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Nexon API (id) 실패 (${world}): ${data?.error?.message}`);
  }

  if (!data.ocid) {
    return null;
  }

  return {
    world_name: world,
    ocid: data.ocid,
    character_name: name,
  };
};
