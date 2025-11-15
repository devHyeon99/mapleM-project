import { CharacterItemEquipment } from "@/entities/item";
import {
  EquipmentSetDefinition,
  EquipmentSetItemMatcher,
  ItemNameNormalization,
} from "../model";

function normalizeItemName(
  itemName: string | null | undefined,
  strategy: ItemNameNormalization = "none",
) {
  const safeItemName = itemName ?? "";

  if (strategy === "stripBracketPrefix") {
    return safeItemName.replace(/^\[[^\]]+\]\s*/, "");
  }

  return safeItemName;
}

function isMatchingItemMatcher(
  item: CharacterItemEquipment,
  matcher: EquipmentSetItemMatcher,
  normalizedItemName: string,
) {
  const rawItemName = item.item_name ?? "";

  if (
    matcher.itemGrades?.length &&
    !matcher.itemGrades.includes(item.item_grade)
  ) {
    return false;
  }

  if (
    matcher.equipmentLevels?.length &&
    !matcher.equipmentLevels.includes(item.equipment_level ?? -1)
  ) {
    return false;
  }

  if (
    matcher.itemSlotName &&
    matcher.itemSlotName !== item.item_equipment_slot_name
  ) {
    return false;
  }

  if (
    matcher.itemPageName &&
    matcher.itemPageName !== item.item_equipment_page_name
  ) {
    return false;
  }

  if (
    matcher.itemName &&
    matcher.itemName !== rawItemName &&
    matcher.itemName !== normalizedItemName
  ) {
    return false;
  }

  if (
    matcher.itemNamePrefix &&
    !rawItemName.startsWith(matcher.itemNamePrefix) &&
    !normalizedItemName.startsWith(matcher.itemNamePrefix)
  ) {
    return false;
  }

  if (
    matcher.itemNameSuffix &&
    !rawItemName.endsWith(matcher.itemNameSuffix) &&
    !normalizedItemName.endsWith(matcher.itemNameSuffix)
  ) {
    return false;
  }

  return true;
}

// 장비 하나가 특정 세트 정의에 포함되는지 판별
export function isMatchingSetItem(
  item: CharacterItemEquipment,
  definition: EquipmentSetDefinition,
) {
  const rawItemName = item.item_name ?? "";
  const normalizedItemName = normalizeItemName(
    rawItemName,
    definition.nameNormalization,
  );

  if (
    definition.itemGrades?.length &&
    !definition.itemGrades.includes(item.item_grade)
  ) {
    return false;
  }

  const hasExactName =
    definition.itemNames?.includes(rawItemName) ||
    definition.itemNames?.includes(normalizedItemName) ||
    false;
  const hasPrefix =
    definition.itemNamePrefixes?.some(
      (prefix) =>
        rawItemName.startsWith(prefix) || normalizedItemName.startsWith(prefix),
    ) ?? false;
  const hasSuffix =
    definition.itemNameSuffixes?.some(
      (suffix) =>
        rawItemName.endsWith(suffix) || normalizedItemName.endsWith(suffix),
    ) ?? false;
  const hasMatcher =
    definition.itemMatchers?.some((matcher) =>
      isMatchingItemMatcher(item, matcher, normalizedItemName),
    ) ?? false;

  return hasExactName || hasPrefix || hasSuffix || hasMatcher;
}
