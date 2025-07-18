const NEXON_API_KEY = process.env.NEXON_API_KEY;
const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";
const REVALIDATE_TIME_IN_SECONDS = 300; // 5분

// 이 함수들은 서버에서만 호출되어야 함

/** OCID 조회 */
export const getOcid = async (world: string, name: string) => {
  const res = await fetch(
    `${NEXON_API_BASE_URL}/id?character_name=${name}&world_name=${world}`,
    {
      headers: { "x-nxopen-api-key": NEXON_API_KEY! },
      next: { revalidate: REVALIDATE_TIME_IN_SECONDS },
    },
  );
  if (!res.ok) throw new Error(`${world} 월드 ${name} 캐릭터 OCID 조회 실패`);
  return res.json();
};

/** 캐릭터 기본 정보 조회 */
export const getCharacterDetails = async (ocid: string) => {
  const NEXON_API_KEY = process.env.NEXON_API_KEY;
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const headers = { "x-nxopen-api-key": NEXON_API_KEY };

  const fetchOptions = {
    headers: headers,
    next: { revalidate: REVALIDATE_TIME_IN_SECONDS },
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
  };

  // 병렬 실행
  const responses = await Promise.all(Object.values(requests));

  // 3. 에러 응답 체크 (하나라도 실패하면 에러)
  if (responses.some((res) => !res.ok)) {
    // 실제 프로덕션에서 더 정교한 에러 처리가 필요
    throw new Error("Nexon API 요청 중 일부가 실패했습니다.");
  }

  // JSON 변환
  const [basicData, guildData, equipData, androidData] = await Promise.all(
    responses.map((res) => res.json()),
  );

  // 데이터 조합
  const { android_equipment, heart_equipment } = androidData ?? {};

  // NextResponse.json이 아닌, 순수 객체를 반환
  return {
    data: {
      ...basicData,
      guild_name: guildData.guild_name ?? null,
      item_equipment: equipData.item_equipment ?? [],
      android_equipment: android_equipment ?? null,
      heart_equipment: heart_equipment ?? null,
    },
  };
};
