import { describe, expect, it } from "vitest";
import { WORLD_NAMES, ALL_WORLD_NAME, worldSlug, worldFromSlug } from "./worlds";

describe("월드 슬러그", () => {
  const realWorlds = WORLD_NAMES.filter((w) => w !== ALL_WORLD_NAME);

  it("모든 월드가 URL 에 안전한 슬러그를 가진다", () => {
    for (const world of realWorlds) {
      expect(worldSlug(world)).toMatch(/^[a-z]+$/);
    }
  });

  it("슬러그를 넥슨 API 용 한글 월드명으로 되돌린다", () => {
    for (const world of realWorlds) {
      expect(worldFromSlug(worldSlug(world))).toBe(world);
    }
  });

  it("영문화 이전에 공유된 한글 URL 도 그대로 통과시킨다", () => {
    expect(worldFromSlug("스카니아")).toBe("스카니아");
  });

  it("모르는 월드는 링크가 끊기지 않게 입력을 유지한다", () => {
    expect(worldSlug("신월드")).toBe("신월드");
    expect(worldFromSlug("신월드")).toBe("신월드");
  });
});
