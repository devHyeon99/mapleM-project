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
    <div>
      <div className="mb-6 flex flex-col items-center">
        <CharacterSearch onSearch={handleSearch} />
      </div>
      <h1 className="sr-only">캐릭터 검색 결과</h1>
      <CharacterBasicInfo ocid={currentOcid} />
    </div>
  );
}
