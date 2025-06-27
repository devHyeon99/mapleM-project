"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CharacterSearch } from "@/components/home/CharacterSearch";
import { CharacterBasicInfo } from "@/components/domain/scheduler/CharacterBasicInfo";

interface CharacterPageProps {
  params: Promise<{ ocid: string }>;
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const resolvedParams = React.use(params);
  const { ocid } = resolvedParams;

  const [currentOcid, setCurrentOcid] = React.useState(ocid);
  const router = useRouter();

  React.useEffect(() => {
    setCurrentOcid(ocid);
  }, [ocid]);

  const handleSearch = (newOcid: string) => {
    setCurrentOcid(newOcid);
    router.replace(`/character/${newOcid}`);
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6">
      <CharacterSearch onSearch={handleSearch} />
      <h1 className="sr-only">캐릭터 검색 결과</h1>
      <CharacterBasicInfo ocid={currentOcid} />
    </div>
  );
}
