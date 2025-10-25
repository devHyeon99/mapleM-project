// 모든 검색 관련 name은 여기서 정규화
export function normalizeCharacterName(name: string) {
  return name.trim();
}

export function makeCharacterSearchKey(name: string) {
  const normalized = normalizeCharacterName(name);
  return `character-search-all:${normalized}`;
}
