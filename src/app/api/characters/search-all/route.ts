import { NextResponse } from "next/server";
import { WORLD_NAMES } from "@/constants/worlds";

export interface CharacterSummary {
  world_name: string;
  ocid: string;
  character_name: string;
}

// 배열을 chunk 단위로 나누는 유틸
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const worlds = WORLD_NAMES.filter((w) => w !== "전체");

  const chunkSize = 2; // 한 번에 병렬 처리할 월드 수
  const delayMs = 400; // chunk 사이 대기 시간(ms)

  const characters: CharacterSummary[] = [];

  const chunks = chunkArray(worlds, chunkSize);

  for (const chunk of chunks) {
    const results = await Promise.allSettled(
      chunk.map(async (world) => {
        try {
          const res = await fetch(
            `https://open.api.nexon.com/maplestorym/v1/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
            { headers: { "x-nxopen-api-key": process.env.NEXON_API_KEY! } },
          );

          const data = await res.json();

          // ✅ OPENAPI00004 처리: 데이터 자체 없음 → null
          if (data?.error?.name === "OPENAPI00004") return null;

          // 기타 실패
          if (!res.ok) throw new Error(`Nexon API 실패 (${world})`);

          if (!data.ocid) return null;

          return {
            world_name: world,
            ocid: data.ocid,
            character_name: name,
          } as CharacterSummary;
        } catch (err) {
          console.error(`World: ${world}, Error:`, err);
          return null; // 실패한 월드는 무시
        }
      }),
    );

    // 성공한 데이터만 수집
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value) characters.push(r.value);
    });

    // 다음 chunk 전 잠시 대기
    if (chunk !== chunks[chunks.length - 1])
      await new Promise((r) => setTimeout(r, delayMs));
  }

  // ✅ 모든 요청 완료 후 한 번만 렌더링
  return NextResponse.json({ characters }, { status: 200 });
}
