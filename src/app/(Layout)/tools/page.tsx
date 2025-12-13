import type { Metadata } from "next";

import { SetEffectCalculatorPage } from "@/widgets/set-effect-calculator";

export default function ToolsPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 도구</h1>
        <p>
          메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수
          있습니다.
        </p>
      </header>

      <SetEffectCalculatorPage />
    </section>
  );
}

export const metadata: Metadata = {
  title: "메이플스토리M 도구",
  description:
    "메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수 있습니다.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "메이플스토리M 도구",
    description:
      "메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수 있습니다.",
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
      "메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수 있습니다.",
    images: ["/og-image.png"],
  },
};
