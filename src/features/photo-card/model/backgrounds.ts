import type { CSSProperties } from "react";
import {
  AUTUMN_IMAGE,
  BLOSSOM_IMAGE,
  OCEAN_IMAGE,
  SNOWFALL_IMAGE,
  STARFIELD_IMAGE,
} from "../lib/patterns";

/** 배경 위에 추가로 그리는 워터마크. 프리셋마다 다르다. */
export type PhotoCardMark = "world";

export interface PhotoCardBackground {
  id: string;
  label: string;
  /**
   * 카드 바탕. 포일이 color-dodge 로 합성되므로 가장 어두운 지점도 완전 검정은 피한다.
   * 검정 위에서는 dodge 결과가 그대로 검정이라 홀로그램이 보이지 않는다.
   */
  style: CSSProperties;
  mark?: PhotoCardMark;
  /** 밝은 배경이라 글씨와 합성 모드를 뒤집어야 하는 경우 */
  light?: boolean;
}

export const PHOTO_CARD_BACKGROUNDS: readonly PhotoCardBackground[] = [
  {
    id: "world",
    label: "월드",
    style: {
      background:
        "radial-gradient(120% 78% at 50% 6%, #2b3348 0%, #191d2b 56%, #11141d 100%)",
    },
    mark: "world",
  },
  {
    id: "blossom",
    label: "벚꽃",
    style: {
      background: [
        `${BLOSSOM_IMAGE} center / cover no-repeat`,
        "radial-gradient(80% 46% at 28% 10%, #FFFFFF 0%, rgba(255,255,255,0) 62%)",
        "linear-gradient(178deg, #FFF3F6 0%, #FCDFE8 52%, #F3C6D6 100%)",
      ].join(", "),
    },
    light: true,
  },
  {
    id: "ocean",
    label: "바다",
    style: {
      background: [
        `${OCEAN_IMAGE} center / cover no-repeat`,
        "radial-gradient(92% 48% at 50% -10%, #4FB8C9 0%, rgba(79,184,201,0) 58%)",
        "linear-gradient(180deg, #17698A 0%, #0E4767 42%, #082E4C 78%, #06223B 100%)",
      ].join(", "),
    },
  },
  {
    id: "autumn",
    label: "단풍",
    style: {
      background: [
        `${AUTUMN_IMAGE} center / cover no-repeat`,
        "radial-gradient(76% 38% at 50% 0%, #B25F22 0%, rgba(178,95,34,0) 60%)",
        "linear-gradient(180deg, #6B2F12 0%, #45190D 52%, #2C1109 100%)",
      ].join(", "),
    },
  },
  {
    id: "snow",
    label: "설원",
    style: {
      background: [
        `${SNOWFALL_IMAGE} center / cover no-repeat`,
        "linear-gradient(178deg, #F6F8FC 0%, #E2E8F3 52%, #C6D0E2 100%)",
      ].join(", "),
    },
    light: true,
  },
  {
    id: "constellation",
    label: "별자리",
    style: {
      background: [
        `${STARFIELD_IMAGE} center / cover no-repeat`,
        "radial-gradient(78% 52% at 36% 40%, #3B3D90 0%, rgba(59,61,144,0) 62%)",
        "radial-gradient(68% 48% at 80% 16%, #24316F 0%, rgba(36,49,111,0) 60%)",
        "linear-gradient(168deg, #141C55 0%, #0F1546 46%, #0B1038 100%)",
      ].join(", "),
    },
  },
];

export const DEFAULT_PHOTO_CARD_BACKGROUND = PHOTO_CARD_BACKGROUNDS[0];
