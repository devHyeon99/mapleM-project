export interface CharacterStat {
  stat_name: string;
  stat_value: string;
}

export interface CharacterStatResponse {
  stat: CharacterStat[];
}

export interface CharacterSetInfo {
  set_name: string;
  set_count: number;
  set_option: string;
}

export interface CharacterSetEffect {
  set_info: CharacterSetInfo[];
}

export interface CharacterStatSetResponse {
  stat: CharacterStatResponse;
  set_effect: CharacterSetInfo[];
}
