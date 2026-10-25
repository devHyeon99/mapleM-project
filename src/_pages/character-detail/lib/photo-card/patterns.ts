const CARD_WIDTH = 320;
const CARD_HEIGHT = 448;

/** 고정 시드 선형 합동 난수. 무늬가 매번 같아야 해서 Math.random 을 쓰지 않는다. */
const createRandom = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

/**
 * 무늬를 흐리기 시작하는 높이. 네임플레이트는 300 부터지만, 첫 줄(월드명)이
 * 바로 그 자리라 조금 위에서부터 빼야 글씨에 무늬가 걸리지 않는다.
 */
const TEXT_BAND_TOP = 278;
/** 다 흐려지기까지의 거리. 네임플레이트 첫 줄 전에 끝난다. */
const TEXT_BAND_FADE = 40;
/** 글씨 자리에 남길 무늬 농도. 0 으로 끊으면 아래쪽이 텅 비어 보인다. */
const TEXT_BAND_OPACITY = 0.12;

/**
 * 장식 무늬는 SVG 한 장으로 구워 배경 이미지 한 겹으로 쓴다.
 *
 * - 요소마다 radial-gradient 를 겹치면 배경 레이어가 수십 겹이 돼 캡처가 무거워진다.
 * - 벡터라 pixelRatio 3 으로 캡처해도 또렷하다.
 * - 시드를 고정해 화면과 저장본, 서버와 클라이언트가 같은 그림을 그리게 한다.
 *
 * 카드 아래쪽은 캐릭터 정보가 앉는 자리라, 무늬를 흐리게 깔아 글씨를 가리지 않게 한다.
 * 그라디언트는 양 끝 바깥에서 첫/끝 stop 으로 고정되므로, 윗부분은 온전히 남는다.
 */
const toBackgroundImage = (shapes: string[]): string => {
  // 주의: 아래 문자열들을 `+` 로 이어 붙이지 말 것.
  // 번들러 압축이 보간(${}) 뒤에 오는 조각을 통째로 날려 SVG 가 깨진다.
  // 개발 서버에서는 압축을 안 해서 멀쩡하고 프로덕션 빌드에서만 터진다.
  const fade = `<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="${TEXT_BAND_TOP}" x2="0" y2="${TEXT_BAND_TOP + TEXT_BAND_FADE}"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="${TEXT_BAND_OPACITY}"/></linearGradient><mask id="plate"><rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#fade)"/></mask>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}"><defs>${fade}</defs><g mask="url(#plate)">${shapes.join("")}</g></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

/** 6방향 결정 모양 눈송이. 중심을 지나는 축 3개 + 축마다 잔가지 2개 */
const snowflakePath = (cx: number, cy: number, radius: number): string => {
  const segments: string[] = [];

  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI) / 3;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    segments.push(
      `M${(cx - dx).toFixed(1)} ${(cy - dy).toFixed(1)}L${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}`,
    );
  }

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const bx = cx + Math.cos(angle) * radius * 0.58;
    const by = cy + Math.sin(angle) * radius * 0.58;

    for (const branch of [angle - 0.6, angle + 0.6]) {
      segments.push(
        `M${bx.toFixed(1)} ${by.toFixed(1)}L${(bx + Math.cos(branch) * radius * 0.34).toFixed(1)} ${(by + Math.sin(branch) * radius * 0.34).toFixed(1)}`,
      );
    }
  }

  return segments.join("");
};

/** 밤하늘: 잔별 + 크게 반짝이는 4각 글린트 */
const buildStarfield = (): string => {
  const random = createRandom(20260902);
  const shapes: string[] = [];

  for (let i = 0; i < 78; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const radius = (0.5 + random() * 1).toFixed(2);
    const opacity = (0.22 + random() * 0.6).toFixed(2);

    shapes.push(
      `<circle cx="${x}" cy="${y}" r="${radius}" fill="#DCE7FF" opacity="${opacity}"/>`,
    );
  }

  for (let i = 0; i < 7; i++) {
    const x = Number((random() * CARD_WIDTH).toFixed(1));
    const y = Number((random() * CARD_HEIGHT).toFixed(1));
    const size = Number((4 + random() * 3).toFixed(1));
    const opacity = (0.5 + random() * 0.35).toFixed(2);

    shapes.push(
      `<path d="M${x} ${y - size}Q${x} ${y} ${x + size} ${y}Q${x} ${y} ${x} ${y + size}Q${x} ${y} ${x - size} ${y}Q${x} ${y} ${x} ${y - size}Z" fill="#FFFFFF" opacity="${opacity}"/>`,
    );
  }

  return toBackgroundImage(shapes);
};

/**
 * 설원: 흩날리는 눈. 밝은 바탕이라 흰색은 묻히므로 푸른 회색으로 그린다.
 */
const buildSnowfall = (): string => {
  const random = createRandom(19970125);
  const shapes: string[] = [];

  // 멀리 흩날리는 잔눈
  for (let i = 0; i < 64; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const radius = (0.7 + random() * 1.5).toFixed(2);
    const opacity = (0.16 + random() * 0.3).toFixed(2);

    shapes.push(
      `<circle cx="${x}" cy="${y}" r="${radius}" fill="#8CA4CB" opacity="${opacity}"/>`,
    );
  }

  // 가까이 떨어지는 결정
  for (let i = 0; i < 8; i++) {
    const x = Number((random() * CARD_WIDTH).toFixed(1));
    const y = Number((random() * CARD_HEIGHT).toFixed(1));
    const radius = Number((5 + random() * 4).toFixed(1));
    const opacity = (0.2 + random() * 0.22).toFixed(2);

    shapes.push(
      `<path d="${snowflakePath(x, y, radius)}" fill="none" stroke="#7E97C4" stroke-width="0.9" stroke-linecap="round" opacity="${opacity}"/>`,
    );
  }

  return toBackgroundImage(shapes);
};

/**
 * 바닷속: 수면에서 내려오는 빛줄기 + 떠오르는 기포.
 * 수평선을 그리면 캐릭터를 가로지르는 선이 생겨서, 물속 시점으로 잡았다.
 */
const buildOcean = (): string => {
  const random = createRandom(20120714);
  const shapes: string[] = [
    // 빛줄기용 세로 페이드. id 는 이 SVG 문서 안에서만 유효해 페이지와 충돌하지 않는다.
    `<defs><linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFF3FF" stop-opacity="0.26"/><stop offset="1" stop-color="#CFF3FF" stop-opacity="0"/></linearGradient></defs>`,
  ];

  // 빛줄기: 아래로 갈수록 비스듬히 벌어지며 흐려진다
  for (let i = 0; i < 5; i++) {
    const top = random() * CARD_WIDTH;
    const width = 14 + random() * 26;
    const drift = 30 + random() * 70;

    shapes.push(
      `<path d="M${top.toFixed(1)} 0L${(top + width).toFixed(1)} 0L${(top + width + drift).toFixed(1)} ${CARD_HEIGHT}L${(top + drift).toFixed(1)} ${CARD_HEIGHT}Z" fill="url(#shaft)"/>`,
    );
  }

  // 기포: 큰 것은 테두리만 그려야 물방울로 읽힌다
  for (let i = 0; i < 46; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const radius = 0.8 + random() * 3.4;
    const opacity = (0.18 + random() * 0.34).toFixed(2);

    shapes.push(
      radius > 2.4
        ? `<circle cx="${x}" cy="${y}" r="${radius.toFixed(2)}" fill="none" stroke="#CFF3FF" stroke-width="0.7" opacity="${opacity}"/>`
        : `<circle cx="${x}" cy="${y}" r="${radius.toFixed(2)}" fill="#CFF3FF" opacity="${opacity}"/>`,
    );
  }

  return toBackgroundImage(shapes);
};

/** 5갈래 단풍잎. 잎자루가 아래(y+)로 오도록 원점 기준으로 잡았다. */
const MAPLE_LEAF_POINTS =
  "0,-10 2,-5.5 6.5,-7 5.2,-2.8 10,-1.5 7,1.2 6.2,5 2.6,3.8 1.3,10 -1.3,10 -2.6,3.8 -6.2,5 -7,1.2 -10,-1.5 -5.2,-2.8 -6.5,-7 -2,-5.5";

// 바탕이 같은 주황 계열이라, 잎은 한 단계 밝게 잡아야 형태가 보인다.
const MAPLE_COLORS = ["#FFC873", "#FBA13F", "#F2703A", "#D9452C"];

/** 벚꽃 잎 하나. 밑동이 원점, 끝(y-)이 벌어지며 가운데가 팬 모양 */
const PETAL_PATH =
  "M0 0C-3.8 -3 -5.4 -7 -3.6 -10.4C-2.8 -11.9 -1.6 -12.6 -1.2 -13.4L0 -11.6L1.2 -13.4C1.6 -12.6 2.8 -11.9 3.6 -10.4C5.4 -7 3.8 -3 0 0Z";

const PETAL_COLORS = ["#F0A0BE", "#E886AA", "#DC6E96", "#F7C3D5"];

/** 가을: 흩날리는 단풍잎 */
const buildAutumn = (): string => {
  const random = createRandom(20231018);
  const shapes: string[] = [];

  for (let i = 0; i < 26; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const scale = (0.3 + random() * 0.75).toFixed(2);
    const rotate = (random() * 360).toFixed(0);
    const color = MAPLE_COLORS[Math.floor(random() * MAPLE_COLORS.length)];
    const opacity = (0.45 + random() * 0.45).toFixed(2);

    shapes.push(
      `<polygon points="${MAPLE_LEAF_POINTS}" transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="${color}" opacity="${opacity}"/>`,
    );
  }

  return toBackgroundImage(shapes);
};

/** 봄: 흩날리는 벚꽃 잎 + 통째로 떨어진 꽃송이 */
const buildBlossom = (): string => {
  const random = createRandom(20240405);
  const shapes: string[] = [];

  for (let i = 0; i < 30; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const scale = (0.3 + random() * 0.6).toFixed(2);
    const rotate = (random() * 360).toFixed(0);
    const color = PETAL_COLORS[Math.floor(random() * PETAL_COLORS.length)];
    const opacity = (0.4 + random() * 0.45).toFixed(2);

    shapes.push(
      `<path d="${PETAL_PATH}" transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="${color}" opacity="${opacity}"/>`,
    );
  }

  // 꽃송이: 밑동이 원점이라 72도씩 돌리면 그대로 다섯 장 꽃이 된다
  for (let i = 0; i < 5; i++) {
    const x = (random() * CARD_WIDTH).toFixed(1);
    const y = (random() * CARD_HEIGHT).toFixed(1);
    const scale = (0.32 + random() * 0.3).toFixed(2);
    const rotate = (random() * 72).toFixed(0);
    const color = PETAL_COLORS[Math.floor(random() * PETAL_COLORS.length)];
    const opacity = (0.35 + random() * 0.3).toFixed(2);

    const petals = Array.from(
      { length: 5 },
      (_, index) =>
        `<path d="${PETAL_PATH}" transform="rotate(${index * 72})"/>`,
    ).join("");

    shapes.push(
      `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" fill="${color}" opacity="${opacity}">${petals}</g>`,
    );
  }

  return toBackgroundImage(shapes);
};

export const STARFIELD_IMAGE = buildStarfield();
export const SNOWFALL_IMAGE = buildSnowfall();
export const OCEAN_IMAGE = buildOcean();
export const AUTUMN_IMAGE = buildAutumn();
export const BLOSSOM_IMAGE = buildBlossom();
