// ==========================================
// 하이퍼 스탯 (Hyper Stat) 관련 타입
// ==========================================

export interface HyperStatInfo {
  stat_type: string; // 스탯 종류
  stat_level: number; // 스탯 레벨
  stat_increase: string; // 스탯 상승량
}

export interface HyperStatPreset {
  preset_no: number; // 보유 프리셋 수
  hyper_stat_info: HyperStatInfo[]; // 하이퍼 스탯 정보
}

export interface CharacterHyperStat {
  preset_count: number; // 보유 프리셋 수
  use_preset_no: number; // 적용 중인 프리셋 번호
  use_preset_remain_hyper_stat: number; // 적용 중인 프리셋의 잔여 스탯
  hyper_stat: HyperStatPreset[]; // 하이퍼 스탯
}
