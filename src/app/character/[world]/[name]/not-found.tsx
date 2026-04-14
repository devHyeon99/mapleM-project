import { CharacterNotFoundView } from "./_components/CharacterNotFoundView";
import { Metadata } from "next";

export const NotFoundMetadata: Metadata = {
  title: "캐릭터를 찾을 수 없음",
  description: "요청하신 캐릭터 정보를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export const metadata: Metadata = NotFoundMetadata;

export default function NotFound() {
  return <CharacterNotFoundView />;
}
