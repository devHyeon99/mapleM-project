"use client";

import { CharacterSearch } from "@/features/character-search";
import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";

export default function CharacterNotFound() {
  const params = useParams();

  const decodedWorld = params.world
    ? decodeURIComponent(params.world as string)
    : "알 수 없는 월드";
  const decodedName = params.name
    ? decodeURIComponent(params.name as string)
    : "알 수 없는 캐릭터";

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6">
      <CharacterSearch />

      <div className="bg-card flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-lg border p-4 text-center shadow-md">
        <AlertTriangle className="text-destructive size-12" />
        <h2 className="text-xl font-bold">
          {decodedWorld} &quot;{decodedName}&quot;
        </h2>
        <p className="text-lg font-medium">캐릭터를 찾을 수 없습니다.</p>
        <p className="text-muted-foreground">
          월드와 캐릭터 이름을 다시 확인하거나,
          <br />위 검색창을 통해 다른 캐릭터를 검색해 보세요.
        </p>
      </div>
    </div>
  );
}
