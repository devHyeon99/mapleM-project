import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  RANKING_TYPES,
  type RankingType,
} from "@/entities/ranking/model/types/ranking";
import {
  buildQueryString,
  buildRankingMetadata,
  renderRankingPage,
} from "../_lib/ranking-page";

interface RankingPageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: RankingPageProps): Promise<Metadata> {
  const { type } = await params;
  const sParams = await searchParams;

  if (!RANKING_TYPES.includes(type as RankingType)) {
    notFound();
  }
  const safeType = type as RankingType;

  return buildRankingMetadata(safeType, sParams);
}

export default async function RankingPage({
  params,
  searchParams,
}: RankingPageProps) {
  const { type } = await params;
  const sParams = await searchParams;

  if (type === "level") {
    permanentRedirect(`/ranking${buildQueryString(sParams)}`);
  }

  if (!RANKING_TYPES.includes(type as RankingType)) {
    notFound();
  }
  const safeType = type as RankingType;

  return renderRankingPage(safeType, sParams);
}
