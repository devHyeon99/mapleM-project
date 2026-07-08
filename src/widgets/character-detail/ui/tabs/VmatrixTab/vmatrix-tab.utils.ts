import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";

/** 코어 타입별 표시 순서 및 카드 제목 */
const CORE_TYPE_LABELS: Record<string, string> = {
  Skill: "스킬 코어",
  Enhancement: "강화 코어",
  JobList: "직업 코어",
  Common: "공용 코어",
  Special: "특수 코어",
};

const ETC_LABEL = "기타 코어";

function getCoreSkillNames(core: VCoreEquipment) {
  return [
    core.vcore_skill_name1,
    core.vcore_skill_name2,
    core.vcore_skill_name3,
    core.vcore_skill_name4,
  ].filter(Boolean);
}

/** V코어명 파라미터가 제거되어 연결된 스킬명으로 코어명을 대체 */
export function getCoreName(core: VCoreEquipment) {
  return getCoreSkillNames(core).join(" / ") || "-";
}

export function isEquipped(core: VCoreEquipment) {
  return core.vcore_equipment_flag !== "0";
}

/** 코어 타입별로 묶어 표시 순서대로 반환 */
export function groupCoresByType(cores: VCoreEquipment[]) {
  const groups = new Map<string, VCoreEquipment[]>();

  for (const core of cores) {
    const label = CORE_TYPE_LABELS[core.vcore_type] ?? ETC_LABEL;
    const group = groups.get(label);
    if (group) group.push(core);
    else groups.set(label, [core]);
  }

  const order = [...Object.values(CORE_TYPE_LABELS), ETC_LABEL];

  return order
    .filter((label) => groups.has(label))
    .map((label) => ({ label, cores: groups.get(label)! }));
}
