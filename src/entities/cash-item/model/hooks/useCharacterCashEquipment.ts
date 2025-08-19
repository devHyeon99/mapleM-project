import type { CharacterCashEquipmentData } from "@/entities/cash-item";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterCashEquipment = (ocid: string | null) =>
  useCharacterApi<CharacterCashEquipmentData>({
    ocid,
    endpoint: "/api/character/cash",
  });
