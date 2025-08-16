import { CharacterDetailData } from "@/entities/character";
import { CharacterSymbol } from "@/entities/character/model/types/symbol";
import { CharacterHexaMatrixStat } from "@/entities/character/model/types/hexa-stat";
import { CharacterHexaMatrix } from "@/entities/skill/model/types/HexaSkill";
import { CharacterStatResponse } from "@/entities/character";

export type MergedSpecData = CharacterDetailData & {
  symbol_data: CharacterSymbol | null;
  hexa_stat_data: CharacterHexaMatrixStat | null;
  hexa_skill_data: CharacterHexaMatrix | null;
  stat_data: CharacterStatResponse | null;
};
