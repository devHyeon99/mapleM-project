export interface Account {
  id: string;
  name: string;
  subtitle: string;
  content: string;
  characters: Character[];
}

export interface Character {
  id: string;
  server: string;
  name: string;
  // 필요 시 추가 속성 정의 가능 (예: 레벨, 직업 등)
}
