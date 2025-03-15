import axios from 'axios';

// 기본 설정
const BASE_URL = 'https://open.api.nexon.com/maplestorym/v1';
const apiKey = import.meta.env.VITE_NEXON_KEY;
const defaultHeaders = {
  accept: 'application/json',
  'x-nxopen-api-key': apiKey,
};

// 공통 axios 인스턴스 (선택적)
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

// 1. OCID 조회
export const fetchCharacterOcid = async (character: string, server: string) => {
  try {
    const response = await apiClient.get('/id', {
      params: {
        character_name: character,
        world_name: server,
      },
    });
    return response.data.ocid; // ocid만 반환
  } catch (error) {
    console.error('OCID 조회 실패:', error);
    throw error;
  }
};

// 2. 캐릭터 기본정보 조회
export const fetchCharacterBasic = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/basic`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('기본 정보 조회 실패:', error);
    throw error;
  }
};

// 3. 캐릭터 아이템 정보 조회
export const fetchCharacterItem = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/item-equipment`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('아이템 정보 조회 실패:', error);
    throw error;
  }
};

// 4. 캐릭터 스탯정보 조회
export const fetchCharacterStat = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/stat`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('스탯 조회 실패:', error);
    throw error;
  }
};

// 5. 캐릭터 길드 조회
export const fetchCharacterGuild = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/guild`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('길드 조회 실패:', error);
    throw error;
  }
};

// 6. 캐릭터 헤어, 성형, 피부 정보 조회
export const fetchCharacterBeauty = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/beauty-equipment`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('헤어, 성형, 피부 조회 실패:', error);
    throw error;
  }
};

// 7. 캐릭터 스킬 조회
export const fetchCharacterSkill = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/skill-equipment`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('스킬 조회 실패:', error);
    throw error;
  }
};

// 8. 캐릭터 V매트릭스 조회
export const fetchCharacterVmatrix = async (ocid: string) => {
  try {
    const response = await apiClient.get(`/character/vmatrix`, {
      params: { ocid },
    });
    return response.data;
  } catch (error) {
    console.error('V매트릭스 조회 실패:', error);
    throw error;
  }
};

// 모든 데이터를 한 번에 가져오는 함수
export const fetchAllCharacterData = async (
  character: string,
  server: string
) => {
  const ocid = await fetchCharacterOcid(character, server);
  const [basic, item, stat, guild, beauty, skill, vmatrix] = await Promise.all([
    fetchCharacterBasic(ocid),
    fetchCharacterItem(ocid),
    fetchCharacterStat(ocid),
    fetchCharacterGuild(ocid),
    fetchCharacterBeauty(ocid),
    fetchCharacterSkill(ocid),
    fetchCharacterVmatrix(ocid),
  ]);

  return {
    ocid,
    basic,
    item,
    stat,
    guild,
    beauty,
    skill,
    vmatrix,
  };
};
