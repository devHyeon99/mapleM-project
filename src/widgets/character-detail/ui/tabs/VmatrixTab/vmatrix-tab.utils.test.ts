import { describe, it, expect } from "vitest";
import type { VCoreEquipment } from "@/entities/skill/model/types/vmatrix";
import { getCoreName, groupCoresByType, isEquipped } from "./vmatrix-tab.utils";

const core = (over: Partial<VCoreEquipment>): VCoreEquipment => ({
  vcore_type: "Skill",
  vcore_level: 30,
  vcore_skill_name1: "프로스트 아크",
  vcore_skill_name2: null,
  vcore_skill_name3: null,
  vcore_skill_name4: null,
  vcore_expire_flag: "0",
  vcore_expire_date: null,
  vcore_equipment_flag: "1",
  ...over,
});

describe("vmatrix-tab.utils", () => {
  it("코어명은 연결된 스킬명을 이어서 만든다", () => {
    expect(getCoreName(core({}))).toBe("프로스트 아크");
    expect(
      getCoreName(
        core({
          vcore_skill_name1: "프로즌 오브",
          vcore_skill_name2: "블리자드",
        }),
      ),
    ).toBe("프로즌 오브 / 블리자드");
  });

  it("미장착 코어를 걸러낸다", () => {
    expect(isEquipped(core({ vcore_equipment_flag: "0" }))).toBe(false);
  });

  it("코어 타입을 정해진 순서로 묶는다", () => {
    const groups = groupCoresByType([
      core({ vcore_type: "Common" }),
      core({ vcore_type: "Skill" }),
      core({ vcore_type: "Unknown" }),
      core({ vcore_type: "Enhancement" }),
      core({ vcore_type: "Common" }),
    ]);

    expect(groups.map((g) => g.label)).toEqual([
      "스킬 코어",
      "강화 코어",
      "공용 코어",
      "기타 코어",
    ]);
    expect(groups[2].cores).toHaveLength(2);
  });
});
