import type { Metadata } from "next";

import { SetEffectCalculatorPage } from "@/widgets/set-effect-calculator";

export default function ToolsPage() {
  return <SetEffectCalculatorPage />;
}

export const metadata: Metadata = {
  title: "메이플스토리M 도구",
  description:
    "메이플스토리M 세트 옵션 계산기와 각종 시뮬레이션 도구를 한곳에서 사용할 수 있습니다.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "메이플스토리M 도구",
    description:
      "메엠지지에서 메이플스토리M 세트 옵션 계산기와 각종 시뮬레이션 도구를 사용할 수 있습니다.",
    url: "/tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메엠지지 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플스토리M 도구",
    description:
      "메엠지지에서 메이플스토리M 세트 옵션 계산기와 각종 시뮬레이션 도구를 사용할 수 있습니다.",
    images: ["/og-image.png"],
  },
};
