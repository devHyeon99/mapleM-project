import { CharacterCashEquipment } from "@/types/cashItem";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterCashEquipment = (ocid: string | null) =>
  useCharacterApi<CharacterCashEquipment>({
    ocid,
    endpoint: "/api/characters/cash",
  });
