"use client";

import dynamic from "next/dynamic";

import { LoadingCard } from "@/shared/ui/LoadingCard";

const CubeSimulator = dynamic(
  () => import("./CubeSimulator").then((mod) => mod.CubeSimulator),
  {
    ssr: false,
    loading: () => <LoadingCard message="큐브 시뮬레이터를 불러오는 중..." />,
  },
);

export function CubeSimulatorClient() {
  return <CubeSimulator />;
}
