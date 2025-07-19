import { NextResponse } from "next/server";
import { WORLD_NAMES } from "@/constants/worlds";
import { getOcidForSearch } from "@/lib/nexonApi";

export interface CharacterSummary {
  world_name: string;
  ocid: string;
  character_name: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: { name: "BadRequest", message: "name이 필요합니다." } },
      { status: 400 },
    );
  }

  const worlds = WORLD_NAMES.filter((w) => w !== "전체");

  const results = await Promise.allSettled(
    worlds.map((world) => getOcidForSearch(world, name)),
  );

  const characters = results
    .filter(
      (r): r is PromiseFulfilledResult<CharacterSummary | null> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value)
    .filter((char): char is CharacterSummary => char !== null);

  return NextResponse.json(characters, { status: 200 });
}
