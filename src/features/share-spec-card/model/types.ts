import type {
  CharacterDetailData,
  CharacterSymbol,
  CharacterHexaMatrixStat,
} from "@/entities/character";
import type { CharacterHexaMatrixSkill } from "@/entities/skill/model/types/hexamatrix-skill";

export type MergedSpecData = CharacterDetailData & {
  symbol_data: CharacterSymbol | null;
  hexa_stat_data: CharacterHexaMatrixStat | null;
  hexa_skill_data: CharacterHexaMatrixSkill | null;
};
