import type { Metadata } from "next";

import { StarforceSimulator } from "@/widgets/starforce-simulator";

export const metadata: Metadata = {
  title: "메이플스토리M 스타포스 강화 시뮬레이터",
  description:
    "메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할 수 있습니다.",
  alternates: {
    canonical: "/tools/starforce",
  },
  keywords: [
    "메이플스토리M",
    "메이플M",
    "스타포스",
    "스타포스 강화",
    "강화 시뮬레이터",
    "메이플M 스타포스",
  ],
  openGraph: {
    title: "메이플스토리M 스타포스 강화 시뮬레이터",
    description:
      "메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할 수 있습니다.",
    url: "/tools/starforce",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메엠지지 스타포스 강화 시뮬레이터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플스토리M 스타포스 강화 시뮬레이터",
    description:
      "메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할 수 있습니다.",
    images: ["/og-image.png"],
  },
};

export default function StarforcePage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 스타포스 강화 시뮬레이터</h1>
        <p>
          메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할
          수 있습니다.
        </p>
      </header>

      <StarforceSimulator />
    </section>
  );
}
