import { describe, expect, it } from "vitest";
import { NexonApiError, NEXON_ERROR_CODE } from "./errors";
import {
  handleCommonNexonError,
  isNexonNotFoundError,
  mapNexonError,
} from "./handler";

const nexonError = (code: string) => new NexonApiError(code, "원문");

describe("mapNexonError", () => {
  it.each([
    [NEXON_ERROR_CODE.GAME_MAINTENANCE, 503],
    [NEXON_ERROR_CODE.DATA_PREPARING, 503],
    [NEXON_ERROR_CODE.INTERNAL_SERVER_ERROR, 502],
    [NEXON_ERROR_CODE.TOO_MANY_REQUESTS, 429],
    [NEXON_ERROR_CODE.BAD_REQUEST_ID, 400],
  ])("%s → %i", (code, status) => {
    expect(mapNexonError(nexonError(code))?.status).toBe(status);
  });

  it("타임아웃은 504", () => {
    const timeout = new DOMException("timeout", "TimeoutError");
    expect(mapNexonError(timeout)?.status).toBe(504);
  });

  it("데이터 없음과 알 수 없는 에러는 null", () => {
    expect(
      mapNexonError(nexonError(NEXON_ERROR_CODE.BAD_REQUEST_PARAM)),
    ).toBeNull();
    expect(mapNexonError(new Error("x"))).toBeNull();
  });
});

describe("handleCommonNexonError", () => {
  it("알려진 에러는 원본을 cause 로 담아 throw", () => {
    const original = nexonError(NEXON_ERROR_CODE.API_MAINTENANCE);
    expect(() => handleCommonNexonError(original)).toThrow(
      expect.objectContaining({ cause: original }),
    );
  });

  it("알 수 없는 에러는 통과", () => {
    expect(() => handleCommonNexonError(new Error("x"))).not.toThrow();
  });
});

describe("isNexonNotFoundError", () => {
  it("00003·00004 는 없음, 그 외는 아님", () => {
    expect(
      isNexonNotFoundError(nexonError(NEXON_ERROR_CODE.BAD_REQUEST_ID)),
    ).toBe(true);
    expect(
      isNexonNotFoundError(nexonError(NEXON_ERROR_CODE.BAD_REQUEST_PARAM)),
    ).toBe(true);
    expect(
      isNexonNotFoundError(nexonError(NEXON_ERROR_CODE.DATA_PREPARING)),
    ).toBe(false);
  });
});
