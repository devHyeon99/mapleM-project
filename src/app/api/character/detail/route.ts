import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { fetchRankingWithFallback } from "@/entities/character/api/fetch-ranking";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type {
  CharacterDetailData,
  CharacterEquipmentResponse,
  CharacterAndroidResponse,
  CharacterUnionResponse,
  CharacterBasicResponse,
  CharacterGuildResponse,
  CharacterEquipmentSetResponse,
  CharacterLevelRankingResponse,
  CharacterUnionRankingResponse,
} from "@/entities/character/model/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ocid = searchParams.get("ocid")?.trim();

  if (!ocid) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  try {
    const ocidQ = encodeURIComponent(ocid);

    const essentialRequests = {
      basic: nexonFetch<CharacterBasicResponse>(
        `/character/basic?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      guild: nexonFetch<CharacterGuildResponse>(
        `/character/guild?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      equip: nexonFetch<CharacterEquipmentResponse>(
        `/character/item-equipment?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      android: nexonFetch<CharacterAndroidResponse>(
        `/character/android-equipment?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      setEffect: nexonFetch<CharacterEquipmentSetResponse>(
        `/character/set-effect?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      union: nexonFetch<CharacterUnionResponse>(`/user/union?ocid=${ocidQ}`, {
        cache: "no-store",
      }),
    };

    const rankingPromises = {
      levelRanking: fetchRankingWithFallback<CharacterLevelRankingResponse>(
        "/ranking/level",
        ocid,
      ),
      unionRanking: fetchRankingWithFallback<CharacterUnionRankingResponse>(
        "/ranking/union",
        ocid,
      ),
    };

    const [
      basicData,
      guildData,
      equipData,
      androidData,
      equipSetEffectData,
      unionData,
      levelRankingData,
      unionRankingData,
    ] = await Promise.all([
      essentialRequests.basic,
      essentialRequests.guild,
      essentialRequests.equip,
      essentialRequests.android,
      essentialRequests.setEffect,
      essentialRequests.union,
      rankingPromises.levelRanking,
      rankingPromises.unionRanking,
    ]);

    const { android_equipment, heart_equipment } = androidData ?? {};

    const combinedData: CharacterDetailData = {
      ocid,
      ...basicData,
      guild_name: guildData.guild_name ?? null,
      union_data: unionData ?? null,

      level_ranking: levelRankingData?.ranking?.[0] ?? null,
      union_ranking: unionRankingData?.ranking?.[0] ?? null,

      use_preset_no: equipData.use_preset_no,
      soul_set_option: equipData.soul_set_option,
      item_equipment: equipData.item_equipment ?? [],
      equipment_preset: equipData.equipment_preset ?? [],
      set_effect: equipSetEffectData.set_info ?? [],

      android_equipment: android_equipment ?? null,
      heart_equipment: heart_equipment ?? null,
    };

    return NextResponse.json<ApiResponse<CharacterDetailData>>({
      data: combinedData,
    });
  } catch (e: unknown) {
    try {
      handleCommonNexonError(e);
    } catch (mapped) {
      return NextResponse.json<ApiResponse<null>>(
        {
          error: {
            name: "NexonCommonError",
            message: (mapped as Error).message,
          },
        },
        { status: 503 },
      );
    }

    return NextResponse.json<ApiResponse<null>>(
      {
        error: {
          name: "InternalError",
          message: e instanceof Error ? e.message : "오류 발생",
        },
      },
      { status: 500 },
    );
  }
}
