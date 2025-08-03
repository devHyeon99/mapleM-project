import { CharacterCashEquipment } from "@/entities/cash-item/model";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterCashEquipment = (ocid: string | null) =>
  useCharacterApi<CharacterCashEquipment>({
    ocid,
    endpoint: "/api/characters/cash",
  });
