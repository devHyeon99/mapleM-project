"use client";

import { forwardRef } from "react";
import type { CharacterDetailData } from "@/entities/character";
import { worldIconSrc } from "@/shared/config/constants/worlds";
import { SITE_HOST } from "@/shared/config/site";
import { useInlinedImage } from "../lib/useInlinedImage";
import type { PhotoCardBackground } from "../model/backgrounds";

const NUMBER_FORMATTER = new Intl.NumberFormat("ko-KR");

/**
 * 기본 캐릭터 이미지는 96x96 라 상반신만 잘려 온다.
 * 캔버스를 키워 요청하면 같은 스프라이트가 전신(약 166x117)으로 들어온다.
 */
const fullBodyImageSrc = (src: string): string => {
  if (!src) return src;
  return `${src}${src.includes("?") ? "&" : "?"}width=280&height=280`;
};

/** 카드에 찍히는 발행일. 파일명도 같은 값을 쓴다(UTC 로 하루 밀리지 않게). */
export const formatCardDate = (date: Date): string =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

const CARD_STYLES = `
.mmpc-card {
  --mmpc-dim: rgba(233,236,244,.58);
  position: relative;
  width: 320px;
  aspect-ratio: 5 / 7;
  overflow: hidden;
  isolation: isolate;
  color: #E9ECF4;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 20px 44px -20px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.09);
}
.mmpc-card[data-light="true"] {
  --mmpc-dim: rgba(18,20,29,.74);
  color: #12141D;
  box-shadow: 0 20px 44px -20px rgba(0,0,0,.45), inset 0 0 0 1px rgba(18,20,29,.12);
}
.mmpc-layer { position: absolute; inset: 0; pointer-events: none; }

/* 홀로그램: 카드를 가로지르는 무지개 띠 + 인쇄 결 스트라이프 */
.mmpc-foil {
  inset: -12%;
  mix-blend-mode: color-dodge;
  opacity: .42;
  background-image:
    linear-gradient(115deg,
      rgba(0,0,0,0) 31%, #2FA8D8 38%, #6E52C4 43%,
      #C25E92 48%, #C9A24E 53%, #46B98E 58%, rgba(0,0,0,0) 65%),
    repeating-linear-gradient(115deg,
      rgba(255,255,255,.07) 0 1px, rgba(255,255,255,0) 1px 5px);
  background-size: 240% 240%, auto;
  background-position: 34% 28%, 0 0;
}
.mmpc-card[data-light="true"] .mmpc-foil { mix-blend-mode: overlay; opacity: .38; }

/* 검은 바탕에서도 하이라이트가 반드시 보이게 하는 광택 */
.mmpc-glare {
  mix-blend-mode: screen;
  opacity: .3;
  background: radial-gradient(24% 20% at 34% 28%,
    rgba(255,255,255,.5), rgba(255,255,255,0) 74%);
}
.mmpc-card[data-light="true"] .mmpc-glare { mix-blend-mode: soft-light; opacity: .7; }

.mmpc-sprite {
  image-rendering: pixelated;
  filter: drop-shadow(0 5px 0 rgba(0,0,0,.28));
  /*
    포일/광택 레이어보다 위에 그린다. 아래에 두면 color-dodge 와 screen 이
    캐릭터 색까지 물들여서 인게임 외형과 달라 보인다. 배경만 효과를 받게 한다.
  */
  position: relative;
  z-index: 2;
}
.mmpc-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .16em;
  color: var(--mmpc-dim);
}
.mmpc-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .16em;
  color: var(--mmpc-dim);
}
`;

interface PhotoCardProps {
  data: CharacterDetailData;
  background: PhotoCardBackground;
}

const CardMark = ({
  mark,
  data,
}: {
  mark: PhotoCardBackground["mark"];
  data: CharacterDetailData;
}) => {
  if (mark !== "world") return null;

  const icon = worldIconSrc(data.world_name);
  if (!icon) return null;

  // 월드 아이콘은 14px 원본이라 키우면 뭉갠다. 작게 반복해 인쇄 무늬처럼 쓴다.
  return (
    <div
      className="mmpc-layer opacity-[.05]"
      style={{
        backgroundImage: `url(${icon})`,
        backgroundSize: "26px 26px",
        backgroundRepeat: "repeat",
        imageRendering: "pixelated",
      }}
    />
  );
};

export const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(
  function PhotoCard({ data, background }, ref) {
    const worldIcon = worldIconSrc(data.world_name);
    const spriteSrc = useInlinedImage(fullBodyImageSrc(data.character_image));

    return (
      <>
        <style>{CARD_STYLES}</style>

        <div
          ref={ref}
          className="mmpc-card"
          data-light={background.light ? "true" : "false"}
        >
          <div className="mmpc-layer" style={background.style} />
          <CardMark mark={background.mark} data={data} />

          <div className="relative flex h-full flex-col">
            {/* 아트 윈도우 */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              {/*
                280x280 캔버스는 아래쪽이 대부분 투명 여백이라, 그대로 두면
                캐릭터와 아래 정보 사이가 벌어진다. 여백만큼 내려서 간격을 좁힌다.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spriteSrc}
                alt={`${data.character_name} 캐릭터 외형`}
                crossOrigin="anonymous"
                className="mmpc-sprite w-[440px] max-w-none shrink-0 translate-y-[66px] -scale-x-100"
              />
            </div>

            {/* 네임 플레이트: 월드 → 레벨 → 닉네임 → 직업 */}
            <div className="flex flex-col items-center justify-center px-4">
              <span className="mmpc-mono flex items-center gap-1.5 tracking-[.06em]">
                {worldIcon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={worldIcon}
                    alt=""
                    width={14}
                    height={14}
                    style={{ imageRendering: "pixelated" }}
                  />
                )}
                {data.world_name}
              </span>
              <span className="mmpc-mono mt-1">
                LV {NUMBER_FORMATTER.format(data.character_level)}
              </span>
              <h3 className="mt-1.5 truncate text-[30px] leading-none font-black tracking-[-.03em]">
                {data.character_name}
              </h3>
              <span className="mmpc-label mt-1.5">{data.character_class}</span>
            </div>

            <div className="mmpc-mono mt-4 flex items-center justify-between px-4 pb-3.5 text-[9px]">
              <span>{SITE_HOST}</span>
              <span>{formatCardDate(new Date())}</span>
            </div>
          </div>

          <div className="mmpc-layer mmpc-foil" />
          <div className="mmpc-layer mmpc-glare" />
        </div>
      </>
    );
  },
);
