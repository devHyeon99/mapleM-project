import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getGuildFullData } from "@/entities/guild/api/get-guild.server";
import { GuildDetailView } from "@/widgets/guild-detail/ui/GuildDetailView";
import { NotFoundMetadata } from "./not-found";

interface PageProps {
  params: Promise<{ world: string; guildName: string }>;
}

async function parseParams(params: PageProps["params"]) {
  const { world, guildName } = await params;
  return {
    worldName: decodeURIComponent(world),
    guildName: decodeURIComponent(guildName),
  };
}

const getCachedGuildFullData = cache(
  async (worldName: string, guildName: string) =>
    getGuildFullData({ worldName, guildName }),
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { worldName, guildName } = await parseParams(params);

  try {
    const guild = await getCachedGuildFullData(worldName, guildName);

    const title = `${worldName} ${guildName} - 메이플스토리M 길드 정보`;
    const description = `길드마스터: ${guild.guild_master_name} | 길드원: ${guild.guild_member_count}명. ${worldName} 월드 ${guildName} 길드의 상세 정보를 확인하세요.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: guild.guild_mark_icon ? [guild.guild_mark_icon] : [],
        type: "website",
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: guild.guild_mark_icon ? [guild.guild_mark_icon] : [],
      },
    };
  } catch {
    return NotFoundMetadata;
  }
}

export default async function GuildDetailPage({ params }: PageProps) {
  const { worldName, guildName } = await parseParams(params);
  let guildData: Awaited<ReturnType<typeof getGuildFullData>>;

  try {
    guildData = await getCachedGuildFullData(worldName, guildName);
  } catch {
    return notFound();
  }

  return <GuildDetailView guildData={guildData} />;
}
