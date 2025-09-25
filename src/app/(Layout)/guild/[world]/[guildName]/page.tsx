import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { GuildDetailView } from "@/widgets/guild-detail/ui/GuildDetailView";
import { getGuildFullData } from "@/entities/guild/api/get-guild.server";
import { getQueryClient } from "@/shared/lib/getQueryClient";

interface PageProps {
  params: Promise<{ world: string; guildName: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { world, guildName } = await params;
  const decodedWorld = decodeURIComponent(world);
  const decodedGuildName = decodeURIComponent(guildName);

  try {
    const guild = await getGuildFullData({
      worldName: decodedWorld,
      guildName: decodedGuildName,
    });

    const title = `${decodedWorld} ${decodedGuildName} - 메이플스토리M 길드 정보`;
    const description = `길드마스터: ${guild.guild_master_name} | 길드원: ${guild.guild_member_count}명 ${decodedWorld} 월드 ${decodedGuildName} 길드의 상세 정보, 스킬, 어빌리티, 길드원 목록을 확인하세요.`;

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
    return {
      title: "길드 정보를 찾을 수 없습니다",
      description: "존재하지 않거나 삭제된 길드입니다.",
    };
  }
}

export default async function GuildDetailPage({ params }: PageProps) {
  const { world, guildName } = await params;
  const decodedWorld = decodeURIComponent(world);
  const decodedGuildName = decodeURIComponent(guildName);

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ["guild", decodedWorld, decodedGuildName],
      queryFn: () =>
        getGuildFullData({
          worldName: decodedWorld,
          guildName: decodedGuildName,
        }),
    });
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GuildDetailView worldName={decodedWorld} guildName={decodedGuildName} />
    </HydrationBoundary>
  );
}
