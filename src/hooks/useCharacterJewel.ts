import { CharacterJewelEquipment } from "@/types/jewel";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterJewel = (ocid: string | null) =>
  useCharacterApi<CharacterJewelEquipment>({
    ocid,
    endpoint: "/api/characters/jewel",
  });
