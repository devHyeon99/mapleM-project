import { Suspense } from "react";
import CharactersClientPage from "./CharactersClientPage";

export default function CharactersPage() {
  return (
    <Suspense>
      <CharactersClientPage />
    </Suspense>
  );
}
