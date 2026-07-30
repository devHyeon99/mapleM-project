import { describe, it, expect } from "vitest";
import {
  canOtherWorldsHaveRanking,
  rankingEmptyMessage,
} from "./empty-message";

describe("rankingEmptyMessage", () => {
  it("샤레니안 랭킹은 종류 이름을 넣어 시작 전임을 알린다", () => {
    expect(rankingEmptyMessage("sharenian-waterway")).toBe(
      "지하수로 랭킹은 아직 시작 전이라 데이터가 존재하지 않습니다.",
    );
  });

  it("챌린저스는 샤레니안 랭킹이 열리지 않는 월드임을 알린다", () => {
    expect(rankingEmptyMessage("sharenian-battlefield", "챌린저스")).toBe(
      "챌린저스 월드는 샤레니안 전장 랭킹이 제공되지 않습니다.",
    );
  });

  it("그 밖의 랭킹은 전체 월드 10,000등 집계 컷을 이유로 든다", () => {
    expect(rankingEmptyMessage("level", "챌린저스")).toBe(
      "챌린저스 월드에는 전체 월드 레벨 랭킹 10,000등 안에 드는 캐릭터가 없습니다.",
    );
    expect(rankingEmptyMessage("dojang")).toBe(
      "전체 월드 무릉도장 랭킹 10,000등 안에 드는 캐릭터가 없습니다.",
    );
  });
});

describe("canOtherWorldsHaveRanking", () => {
  it("샤레니안이 기간 밖이면 전 월드가 같이 비므로 필터를 감춘다", () => {
    expect(canOtherWorldsHaveRanking("sharenian-battlefield")).toBe(false);
    expect(canOtherWorldsHaveRanking("sharenian-waterway", "스카니아")).toBe(
      false,
    );
  });

  it("챌린저스만 샤레니안 집계가 없는 동안에는 필터를 남긴다", () => {
    expect(canOtherWorldsHaveRanking("sharenian-battlefield", "챌린저스")).toBe(
      true,
    );
  });

  it("샤레니안이 아닌 랭킹은 월드마다 결과가 달라 필터를 남긴다", () => {
    expect(canOtherWorldsHaveRanking("level", "챌린저스")).toBe(true);
    expect(canOtherWorldsHaveRanking("dojang")).toBe(true);
  });
});
