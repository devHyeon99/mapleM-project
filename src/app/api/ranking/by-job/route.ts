import { NextResponse } from "next/server";
import {
  isJobFilterable,
  isRankingType,
  readRankingJob,
  type JobRankingPage,
} from "@/entities/ranking";
import {
  fetchRankingPageByJob,
  resolveRankingDate,
} from "@/entities/ranking/server";
import { handleCommonNexonError } from "@/shared/api/nexon";
import { isRealWorldName } from "@/shared/config/constants/worlds";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";

const badRequest = (message: string) =>
  NextResponse.json<ApiResponse<null>>(
    { error: { name: "BadRequest", message } },
    { status: 400 },
  );

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  if (!isRankingType(type) || !isJobFilterable(type)) {
    return badRequest("직업으로 거를 수 있는 랭킹 종류가 아닙니다.");
  }

  const jobName = readRankingJob(searchParams);
  if (!jobName) return badRequest("직업이 필요합니다.");

  // 월드는 선택. 값이 있으면 실제 월드여야 함
  const world = searchParams.get("world")?.trim();
  if (world && !isRealWorldName(world)) return badRequest("없는 월드입니다.");

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  if (!Number.isInteger(page) || page < 1) {
    return badRequest("잘못된 페이지입니다.");
  }

  try {
    const date = await resolveRankingDate();

    return NextResponse.json<ApiResponse<JobRankingPage>>(
      {
        data: await fetchRankingPageByJob({
          type,
          date,
          worldName: world || undefined,
          jobName,
          page,
        }),
      },
      { status: 200 },
    );
  } catch (error) {
    // 점검 중·호출량 초과 등을 사람이 읽을 문구로 바꿔 다시 던짐
    handleCommonNexonError(error);
    throw error;
  }
}
