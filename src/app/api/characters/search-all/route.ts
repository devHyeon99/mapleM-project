import { NextResponse } from "next/server";
import { WORLD_NAMES } from "@/constants/worlds";

export interface CharacterSummary {
  world_name: string;
  ocid: string;
  character_name: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const worlds = WORLD_NAMES.filter((w) => w !== "전체");

  const results = await Promise.allSettled(
    worlds.map(async (world) => {
      try {
        const res = await fetch(
          `https://open.api.nexon.com/maplestorym/v1/id?character_name=${encodeURIComponent(
            name,
          )}&world_name=${encodeURIComponent(world)}`,
          { headers: { "x-nxopen-api-key": process.env.NEXON_API_KEY! } },
        );

        const data = await res.json();

        if (data?.error?.name === "OPENAPI00004") return null;

        if (!res.ok) throw new Error(`Nexon API 실패 (${world})`);

        if (!data.ocid) return null;

        return {
          world_name: world,
          ocid: data.ocid,
          character_name: name,
        } as CharacterSummary;
      } catch (err) {
        console.error(`World: ${world}, Error:`, err);
        return null;
      }
    }),
  );

  const characters = results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => (r as PromiseFulfilledResult<CharacterSummary>).value!);

  return NextResponse.json({ characters }, { status: 200 });
}
