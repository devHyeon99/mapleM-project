import { Suspense } from "react";
import CharacterListClient from "./CharacterListClient";

export default function CharacterListPage() {
  return (
    <Suspense fallback={<div>캐릭터 목록 준비 중...</div>}>
      <CharacterListClient />
    </Suspense>
  );
}
