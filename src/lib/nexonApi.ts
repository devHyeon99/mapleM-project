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

/** 캐릭터 기본 정보 조회 (간단버전) */
export const getCharacterBasicInfo = async (ocid: string) => {
  if (!NEXON_API_KEY) {
    throw new Error("NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(
    `${NEXON_API_BASE_URL}/character/basic?ocid=${ocid}`,
    {
      headers: { "x-nxopen-api-key": NEXON_API_KEY },
      // 넥슨 API 데이터는 revalidate 타임을 설정하는 것이 좋습니다.
      next: { revalidate: 300 }, // 5분
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
      next: { revalidate: 60 }, // 1분
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
