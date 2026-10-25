import { Metadata } from "next";
import { GuildNotFoundView } from "./GuildNotFoundView";

export const NotFoundMetadata: Metadata = {
  title: "길드 정보를 찾을 수 없습니다",
  description: "요청하신 길드 정보를 찾을 수 없거나 삭제된 길드입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export function GuildNotFoundPage() {
  return <GuildNotFoundView />;
}
