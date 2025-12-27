import type { Metadata } from "next";

import { PotentialSimulator } from "@/widgets/potential-simulator";

export const metadata: Metadata = {
  title: "메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터",
  description:
    "메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을 진행할 수 있습니다.",
  alternates: {
    canonical: "/tools/potential",
  },
  keywords: [
    "메이플스토리M",
    "메이플M",
    "환생의 불꽃",
    "추가옵션",
    "추옵 시뮬레이션",
    "메이플M 환생의 불꽃",
  ],
  openGraph: {
    title: "메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터",
    description:
      "메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을 진행할 수 있습니다.",
    url: "/tools/potential",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메엠지지 환생의 불꽃 추가옵션 시뮬레이터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터",
    description:
      "메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을 진행할 수 있습니다.",
    images: ["/og-image.png"],
  },
};

export default function PotentialPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터</h1>
        <p>
          메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을
          진행할 수 있습니다.
        </p>
      </header>

      <PotentialSimulator />
    </section>
  );
}
