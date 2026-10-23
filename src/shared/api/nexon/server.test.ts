import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { NexonApiError, NEXON_ERROR_CODE } from "./errors";
import { nexonErrorResponse, nexonFetch } from "./server";

describe("nexonFetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("params 를 인코딩해 붙이고 undefined 는 생략, 키 헤더는 덮어쓰지 못함", async () => {
    vi.stubEnv("NEXON_API_KEY", "key");
    const fetchMock = vi.fn(async () => Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    await nexonFetch("/id", {
      params: {
        character_name: "메이플 &?",
        world_name: "스카니아",
        page: undefined,
      },
      headers: new Headers({ "x-nxopen-api-key": "evil", "x-extra": "1" }),
    });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    const parsed = new URL(url);
    expect(parsed.pathname).toBe("/maplestorym/v1/id");
    expect(parsed.searchParams.get("character_name")).toBe("메이플 &?");
    expect(parsed.searchParams.get("world_name")).toBe("스카니아");
    expect(parsed.searchParams.has("page")).toBe(false);

    const headers = init.headers as Headers;
    expect(headers.get("x-nxopen-api-key")).toBe("key");
    expect(headers.get("x-extra")).toBe("1");
  });
});

describe("nexonErrorResponse", () => {
  it("대상 없음(00004)은 404", () => {
    const res = nexonErrorResponse(
      new NexonApiError(NEXON_ERROR_CODE.BAD_REQUEST_PARAM, "원문"),
    );
    expect(res.status).toBe(404);
  });
});
