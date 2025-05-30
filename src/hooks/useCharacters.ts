"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCharacters,
  addCharacter,
  deleteCharacter,
} from "@/api/characters";
import { Character } from "@/types/scheduler";

export const useCharacters = (selectedAccountId: string | null) => {
  const queryClient = useQueryClient();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setSelectedCharacterId(null);
  }, [selectedAccountId]);

  const {
    data: charactersForSelectedAccount = [],
    isLoading: isCharactersLoading,
    isError: isCharactersError,
  } = useQuery({
    queryKey: ["characters", selectedAccountId],
    queryFn: () => fetchCharacters(selectedAccountId!),
    enabled:
      !!selectedAccountId &&
      !String(selectedAccountId).startsWith("optimistic-"),
  });

  const { mutate: handleAddCharacter, isPending: isAddingCharacter } =
    useMutation({
      mutationFn: addCharacter,

      onMutate: async (newCharacterData: {
        name: string;
        world_name: string;
      }) => {
        const queryKey = ["characters", selectedAccountId];

        await queryClient.cancelQueries({ queryKey });

        const previousCharacters =
          queryClient.getQueryData<Character[]>(queryKey);

        // ✨ 여기가 핵심! 임시 캐릭터 객체 생성
        const tempCharacter: Character = {
          // 1. 서버에서 생성될 필드는 임시 값으로 채우기
          id: String(Date.now()), // 임시 고유 ID (React key로 사용)
          ocid: "temp_ocid", // 임시 OCID
          level: 0, // 기본 레벨
          job: "iel", // 기본 직업

          // 2. 사용 가능한 데이터는 채워넣기
          name: newCharacterData.name,
          account_id: selectedAccountId!, // 컨텍스트나 props 등에서 가져온 현재 계정 ID
        };

        // 새 임시 캐릭터를 포함하여 캐시 업데이트
        queryClient.setQueryData<Character[]>(queryKey, (oldData = []) => [
          ...oldData,
          tempCharacter, // 생성한 임시 캐릭터를 배열 마지막에 추가
        ]);

        return { previousCharacters };
      },

      onError: (err, newCharacter, context) => {
        // 에러 발생 시 이전 데이터로 롤백
        if (context?.previousCharacters) {
          queryClient.setQueryData(
            ["characters", selectedAccountId],
            context.previousCharacters,
          );
        }
      },

      onSettled: () => {
        // 성공/실패와 관계없이 항상 서버 데이터와 동기화
        queryClient.invalidateQueries({
          queryKey: ["characters", selectedAccountId],
        });
      },
    });

  const { mutate: handleDeleteCharacter, isPending: isDeletingCharacter } =
    useMutation({
      mutationFn: deleteCharacter,

      // 1. Mutation이 실행되기 직전에 호출됩니다.
      onMutate: async (characterIdToDelete) => {
        // 진행 중인 refetch를 취소하여 덮어쓰기 방지
        await queryClient.cancelQueries({
          queryKey: ["characters", selectedAccountId],
        });

        // 2. 롤백을 위한 이전 데이터 스냅샷 생성
        const previousCharacters = queryClient.getQueryData<Character[]>([
          "characters",
          selectedAccountId,
        ]);

        // 3. UI를 낙관적으로 업데이트 (캐시 직접 수정)
        queryClient.setQueryData<Character[]>(
          ["characters", selectedAccountId],
          (oldData = []) =>
            oldData.filter((char) => char.id !== characterIdToDelete),
        );

        // 4. 스냅샷 데이터를 context 객체에 담아 반환
        return { previousCharacters };
      },

      // 5. Mutation 실패 시 호출 (네트워크 에러, 서버 에러 등)
      onError: (
        err, // 에러 객체
        _variables, // mutate에 전달된 변수
        context, // onMutate에서 반환된 context 객체
      ) => {
        // 6. onMutate에서 반환한 스냅샷 데이터로 롤백
        if (context?.previousCharacters) {
          queryClient.setQueryData(
            ["characters", selectedAccountId],
            context.previousCharacters,
          );
        }
      },

      // 7. Mutation이 성공하든 실패하든, 항상 마지막에 호출
      onSettled: () => {
        // 8. 최신 서버 상태와 데이터를 확실하게 동기화
        queryClient.invalidateQueries({
          queryKey: ["characters", selectedAccountId],
        });
      },
    });

  const selectedCharacter = useMemo(
    () =>
      charactersForSelectedAccount.find(
        (char) => char.id === selectedCharacterId,
      ),
    [charactersForSelectedAccount, selectedCharacterId],
  );

  const handleCharacterChange = (characterId: string | null) => {
    setSelectedCharacterId(characterId);
  };

  return {
    charactersForSelectedAccount,
    selectedCharacter,
    selectedCharacterId,
    isCharactersLoading,
    isCharactersError,
    isAddingCharacter,
    isDeletingCharacter,
    handleCharacterChange,
    handleAddCharacter,
    handleDeleteCharacter,
  };
};
