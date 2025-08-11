import type { CharacterCashEquipment } from "@/entities/cash-item";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterCashEquipment = (ocid: string | null) =>
  useCharacterApi<CharacterCashEquipment>({
    ocid,
    endpoint: "/api/character/cash",
  });
