const images = import.meta.glob('@/assets/images/jobs/*.png', { eager: true });

const jobNameToFileName: Record<string, string> = {
  아델: 'adel',
  엔젤릭버스터: 'angelicburster',
  아란: 'aran',
  아크: 'ark',
  배틀메이지: 'battlemage',
  비숍: 'bishop',
  블래스터: 'blaster',
  보우마스터: 'bowmaster',
  '아크메이지(불,독)': 'bulldog',
  캐논슈터: 'canon',
  캡틴: 'captin',
  데몬어벤져: 'daemonavenger',
  다크나이트: 'darkknight',
  데몬슬레이어: 'demonslayer',
  듀얼블레이드: 'dualblade',
  에릴: 'erel',
  에반: 'evan',
  플레임위자드: 'flamewizard',
  히어로: 'hero',
  호영: 'hoyoung',
  카데나: 'kadena',
  카인: 'kain',
  카이저: 'kaiser',
  키네시스: 'kinesis',
  나이트워커: 'knightwalker',
  라라: 'lara',
  루미너스: 'luminous',
  메카닉: 'mechanic',
  메르세데스: 'mercedes',
  미하일: 'mihile',
  나이트로드: 'nightroad',
  팔라딘: 'paladin',
  패스파인더: 'pathfinder',
  팬텀: 'phantom',
  섀도어: 'shadow',
  신궁: 'shrine',
  시아: 'sia',
  은월: 'silverwall',
  소울마스터: 'soulmaster',
  스트라이커: 'striker',
  '아크메이지(썬,콜)': 'suncall',
  바이퍼: 'viper',
  와일드헌터: 'wildhunter',
  윈드브레이커: 'windbreaker',
  제논: 'xenon',
  아이엘: 'iel',
};

export const characterImageMap: Record<string, string> = {};

for (const [jobName, fileName] of Object.entries(jobNameToFileName)) {
  const path = `/src/assets/images/jobs/${fileName}.png`;
  const imageModule = images[path] as { default: string } | undefined;
  if (imageModule) {
    characterImageMap[jobName] = imageModule.default;
  } else {
    console.warn(`이미지 파일이 없습니다: ${path}`);
  }
}
