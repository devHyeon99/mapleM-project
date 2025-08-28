"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacterDetails } from "../../api/get-detail";
import { characterQueryKeys } from "../queries/characterQueryKeys";

export const useCharacterDetails = (ocid: string | null) =>
  useQuery({
    queryKey: ocid
      ? characterQueryKeys.details(ocid)
      : ["character", "details", null],
    queryFn: () => getCharacterDetails(ocid!),
    enabled: !!ocid,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
