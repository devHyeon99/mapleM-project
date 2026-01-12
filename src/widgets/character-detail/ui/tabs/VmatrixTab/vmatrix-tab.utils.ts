import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";

export function format2(n: number) {
  return String(n).padStart(2, "0");
}

export function groupCoresByType(cores: VCoreEquipment[]) {
  return cores.reduce(
    (acc, core) => {
      if (core.vcore_type === "Skill") acc.skillCores.push(core);
      else if (core.vcore_type === "Enhancement") acc.enhancementCores.push(core);
      else acc.unknownCores.push(core);
      return acc;
    },
    {
      skillCores: [] as VCoreEquipment[],
      enhancementCores: [] as VCoreEquipment[],
      unknownCores: [] as VCoreEquipment[],
    },
  );
}

export function getEnhancementSkillNames(core: VCoreEquipment) {
  return [core.vcore_skill_name1, core.vcore_skill_name2, core.vcore_skill_name3].filter(Boolean);
}
