import { internalFetch } from "@/shared/api/internal";
import type { CharacterJewelEquipment } from "../model/types/jewel";

export async function getCharacterJewel(
  ocid: string,
): Promise<CharacterJewelEquipment> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterJewelEquipment>(
    `/api/character/jewel?ocid=${encodeURIComponent(q)}`,
  );
}
