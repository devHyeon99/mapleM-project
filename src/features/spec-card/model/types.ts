import type {
  CharacterDetailData,
  CharacterSymbol,
  CharacterHexaMatrixStat,
  HyperStatInfo,
} from "@/entities/character";
import type { CharacterHexaMatrixSkill } from "@/entities/skill/model/types/hexamatrix-skill";

export type MergedSpecData = CharacterDetailData & {
  symbol_data: CharacterSymbol | null;
  hexa_stat_data: CharacterHexaMatrixStat | null;
  hexa_skill_data: CharacterHexaMatrixSkill | null;
  /** 선택한 프리셋에서 실제로 투자한 하이퍼 스탯만 */
  hyper_stat_info: HyperStatInfo[];
};
