import { Metadata } from "next";
import { buildRankingMetadata, renderRankingPage } from "./_lib/ranking-page";

interface RankingRootPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: RankingRootPageProps): Promise<Metadata> {
  const sParams = await searchParams;
  return buildRankingMetadata("level", sParams);
}

export default async function RankingRootPage({
  searchParams,
}: RankingRootPageProps) {
  const sParams = await searchParams;
  return renderRankingPage("level", sParams);
}
