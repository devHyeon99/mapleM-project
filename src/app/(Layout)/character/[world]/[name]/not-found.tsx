import { CharacterNotFoundView } from "@/widgets/character-detail/ui/CharacterNotFoundView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "캐릭터를 찾을 수 없음",
  description: "요청하신 캐릭터 정보를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <CharacterNotFoundView />;
}
