import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 잠재 모드별 원본 -> 정규화 결과 경로
// 인자 없이 실행하면 두 모드를 모두 생성한다. (예: node scripts/normalize-cube-data.mjs potential)
const MODES = ["potential", "additional"];
const sourceDirOf = (mode) => path.join(__dirname, "source", mode);
const outputDirOf = (mode) =>
  path.join(rootDir, "src/widgets/cube-simulator/model/data/generated", mode);

const tierMap = new Map([
  ["레어", "rare"],
  ["레어 등급", "rare"],
  ["에픽", "epic"],
  ["에픽 등급", "epic"],
  ["유니크", "unique"],
  ["유니크 등급", "unique"],
  ["레전더리", "legendary"],
  ["레전더리 등급", "legendary"],
]);

const statMap = new Map([
  ["명중률", "accuracy"],
  ["물리대미지", "physicalDamage"],
  ["마법대미지", "magicDamage"],
  ["치명타확률", "critRate"],
  ["치명타저항", "critResistance"],
  ["보스방어력", "bossDefense"],
  ["회피율", "evasion"],
  ["최대HP", "maxHp"],
  ["최대MP", "maxMp"],
  ["HP회복력", "hpRecovery"],
  ["MP회복력", "mpRecovery"],
]);

const equipmentAliases = new Map([
  ["무기", "weapon"],
  ["보조무기", "secondaryWeapon"],
  ["상의", "top"],
  ["하의", "bottom"],
  ["한벌옷", "overall"],
  ["모자", "hat"],
  ["망토", "cape"],
  ["신발", "shoes"],
  ["장갑", "gloves"],
  ["어깨", "shoulder"],
  ["벨트", "belt"],
  ["기계심장", "heart"],
  ["엠블렘", "emblem"],
  ["감시자의 눈(반지)", "watch"],
  ["방패", "shield"],
  ["하트", "heart"],
]);

function normalizeKey(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/giu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseNumber(value) {
  const parsed = Number(String(value).replace(/[%%,]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseEquipmentLabel(label) {
  const trimmed = String(label ?? "").trim();
  const match = trimmed.match(/^(.*?)(?:\s+(\d+))$/);
  if (!match) {
    return {
      equipmentType: normalizeKey(trimmed),
      label: trimmed,
      level: null,
    };
  }

  const equipmentLabel = match[1].trim();
  const level = Number(match[2]);
  return {
    equipmentType:
      equipmentAliases.get(equipmentLabel) ?? normalizeKey(equipmentLabel),
    label: equipmentLabel,
    level,
  };
}

function resolveEquipmentLabel(entry, fallbackLabel) {
  const fromEntry = parseEquipmentLabel(entry.equipLevelText);
  if (fromEntry.level != null) return fromEntry;

  const fromFallback = parseEquipmentLabel(fallbackLabel);
  if (fromFallback.level != null) return fromFallback;

  return fromEntry;
}

function parsePotentialRow(row) {
  if (!Array.isArray(row) || row.length < 3) return null;

  return {
    key: statMap.get(row[0]) ?? normalizeKey(row[0] ?? ""),
    label: row[0] ?? "",
    value: parseNumber(row[1]),
    valueType: String(row[1] ?? "").includes("%") ? "percent" : "flat",
    chance: parseNumber(row[2]),
  };
}

function isTierEntry(value) {
  return (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.rarityText === "string" &&
    typeof value.equipLevelText === "string" &&
    Array.isArray(value.firstRows) &&
    Array.isArray(value.secondaryRows)
  );
}

function isTierGroup(value) {
  return (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).some(isTierEntry)
  );
}

function isLegacyTableInput(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) => item && typeof item === "object" && Array.isArray(item.rows),
    )
  );
}

function parsePotentialTables(rows) {
  const equipmentPotentials = {};
  let index = 0;

  while (index < rows.length) {
    const row = rows[index];
    const isHeader =
      row[0] === "잠재옵션 등급" && row[2] === "장비 분류 / 레벨";

    if (!isHeader) {
      index += 1;
      continue;
    }

    const tier = tierMap.get(row[1]);
    const equipment = parseEquipmentLabel(row[3] ?? "");
    const nextRow = rows[index + 1] ?? [];

    if (!tier || equipment.level == null || nextRow[0] !== "첫번째 옵션") {
      index += 1;
      continue;
    }

    const first = [];
    const secondary = [];
    index += 3;

    while (index < rows.length) {
      const current = rows[index];
      const nextIsHeader =
        current[0] === "잠재옵션 등급" && current[2] === "장비 분류 / 레벨";

      if (nextIsHeader || current.length === 0) break;

      const left = parsePotentialRow(current);
      const right = parsePotentialRow(current.slice(3));

      if (left) first.push(left);
      if (right) secondary.push(right);

      index += 1;
    }

    equipmentPotentials[equipment.equipmentType] ??= {
      label: equipment.label,
      levels: {},
    };

    equipmentPotentials[equipment.equipmentType].levels[equipment.level] ??= {
      equipmentType: equipment.equipmentType,
      label: equipment.label,
      level: equipment.level,
      tiers: {
        rare: { first: [], secondary: [] },
        epic: { first: [], secondary: [] },
        unique: { first: [], secondary: [] },
        legendary: { first: [], secondary: [] },
      },
    };

    equipmentPotentials[equipment.equipmentType].levels[equipment.level].tiers[
      tier
    ] = {
      first,
      secondary,
    };
  }

  return equipmentPotentials;
}

function parseGroupedPotentialTable(groupRows, fallbackLabel = "") {
  const entries = Object.values(groupRows).filter(isTierEntry);
  if (entries.length === 0) return null;

  const firstEntry = entries[0];
  const equipment = resolveEquipmentLabel(firstEntry, fallbackLabel);

  if (equipment.level == null) return null;

  const tiers = {
    rare: { first: [], secondary: [] },
    epic: { first: [], secondary: [] },
    unique: { first: [], secondary: [] },
    legendary: { first: [], secondary: [] },
  };

  for (const entry of entries) {
    const tier = tierMap.get(entry.rarityText.trim());
    if (!tier) continue;

    tiers[tier] = {
      first: entry.firstRows
        .map(parsePotentialRow)
        .filter((option) => option != null),
      secondary: entry.secondaryRows
        .map(parsePotentialRow)
        .filter((option) => option != null),
    };
  }

  return {
    equipment,
    tiers,
  };
}

function collectGroupedPotentialTables(value, fallbackLabel = "") {
  if (isTierGroup(value)) {
    return [{ group: value, fallbackLabel }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      collectGroupedPotentialTables(item, fallbackLabel),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectGroupedPotentialTables(item, key),
    );
  }

  return [];
}

function buildPotentialDataset(input) {
  if (isLegacyTableInput(input)) {
    return {
      equipmentPotentials: parsePotentialTables(input[2].rows),
    };
  }

  const groups = collectGroupedPotentialTables(input)
    .map(({ group, fallbackLabel }) =>
      parseGroupedPotentialTable(group, fallbackLabel),
    )
    .filter((group) => group != null);

  if (groups.length === 0) {
    return null;
  }

  const equipmentPotentials = {};

  for (const group of groups) {
    const { equipment, tiers } = group;

    equipmentPotentials[equipment.equipmentType] ??= {
      label: equipment.label,
      levels: {},
    };

    equipmentPotentials[equipment.equipmentType].levels[equipment.level] ??= {
      equipmentType: equipment.equipmentType,
      label: equipment.label,
      level: equipment.level,
      tiers: {
        rare: { first: [], secondary: [] },
        epic: { first: [], secondary: [] },
        unique: { first: [], secondary: [] },
        legendary: { first: [], secondary: [] },
      },
    };

    equipmentPotentials[equipment.equipmentType].levels[equipment.level].tiers =
      tiers;
  }

  return {
    equipmentPotentials,
  };
}

function normalizeFile(filePath) {
  const raw = JSON.parse(readFileSync(filePath, "utf8"));
  return buildPotentialDataset(raw);
}

// 번들에 그대로 실리는 데이터라 들여쓰기 없이 저장한다. (약 7.4MB -> 3.0MB)
const PRETTY = process.argv.includes("--pretty");

const requestedModes = process.argv
  .slice(2)
  .filter((arg) => MODES.includes(arg));

for (const mode of requestedModes.length ? requestedModes : MODES) {
  const sourceDir = sourceDirOf(mode);
  const outputDir = outputDirOf(mode);

  const sourceFiles = readdirSync(sourceDir).filter((fileName) =>
    fileName.endsWith(".json"),
  );
  if (sourceFiles.length === 0) continue;

  mkdirSync(outputDir, { recursive: true });

  for (const fileName of sourceFiles) {
    const normalized = normalizeFile(path.join(sourceDir, fileName));
    if (!normalized) continue;
    const json = PRETTY
      ? `${JSON.stringify(normalized, null, 2)}\n`
      : JSON.stringify(normalized);
    writeFileSync(path.join(outputDir, fileName), json);
  }

  console.log(`${mode}: ${sourceFiles.length} files -> ${outputDir}`);
}
