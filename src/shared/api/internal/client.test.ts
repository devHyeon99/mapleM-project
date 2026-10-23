import { describe, expect, it } from "vitest";
import { ApiRequestError, shouldRetryQuery } from "./client";

describe("shouldRetryQuery", () => {
  it("4xx 는 재시도하지 않음", () => {
    expect(shouldRetryQuery(0, new ApiRequestError("없음", 404))).toBe(false);
    expect(shouldRetryQuery(0, new ApiRequestError("잘못됨", 400))).toBe(false);
  });

  it("429 는 재시도", () => {
    expect(shouldRetryQuery(0, new ApiRequestError("과다", 429))).toBe(true);
  });

  it("5xx·네트워크 오류는 3회까지 재시도", () => {
    expect(shouldRetryQuery(0, new ApiRequestError("점검", 503))).toBe(true);
    expect(shouldRetryQuery(2, new Error("network"))).toBe(true);
    expect(shouldRetryQuery(3, new Error("network"))).toBe(false);
  });
});
