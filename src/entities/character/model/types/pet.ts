/** 창작 펫 세트 정보 */
export interface PetSetOption {
  set_name: string;
  set_count: number;
  set_option: string;
}

/** 펫 장비 조회 API 응답 (/character/pet-equipment) */
export interface CharacterPetEquipmentResponse {
  pet_1_name: string | null;
  pet_1_pet_type: string | null;
  /** 마법의 시간 (UTC0) */
  pet_1_date_expire: string | null;
  pet_1_icon: string | null;
  pet_2_name: string | null;
  pet_2_pet_type: string | null;
  pet_2_date_expire: string | null;
  pet_2_icon: string | null;
  pet_3_name: string | null;
  pet_3_pet_type: string | null;
  pet_3_date_expire: string | null;
  pet_3_icon: string | null;
  pet_set_option: PetSetOption[] | null;
}

/** 화면용 펫 한 마리 (빈 슬롯은 null) */
export interface CharacterPet {
  name: string;
  pet_type: string | null;
  date_expire: string | null;
  icon: string | null;
}
