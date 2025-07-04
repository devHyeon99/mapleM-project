"use client";

import { useScheduler } from "@/hooks/useScheduler";
import { AccountSelector } from "@/components/domain/scheduler/AccountSelector";
import { CharacterSelector } from "@/components/domain/scheduler/CharacterSelector";
import { ScheduleDetails } from "@/components/domain/scheduler/ScheduleDetails";
import { useAccounts } from "@/hooks/useAccounts";
import { useCharacters } from "@/hooks/useCharacters";

const SchedulerPage = () => {
  const {
    accounts,
    selectedAccountId,
    handleAccountChange,
    handleAddAccount,
    handleDeleteAccount,
    loading,
    isAddingAccount,
    isDeletingAccount,
    error,
  } = useAccounts();

  const {
    charactersForSelectedAccount,
    selectedCharacter,
    selectedCharacterId,
    isCharactersLoading,
    isAddingCharacter,
    isDeletingCharacter,
    handleCharacterChange,
    handleAddCharacter,
    handleDeleteCharacter,
  } = useCharacters(selectedAccountId);

  const {
    handleCheckChange: onCheckChange,
    handleBulkUpdate: onBulkUpdate,
    handleAddTask: onAddTask,
    handleAddBoss: onAddBoss,
    handleDeleteTask: onDeleteTask,
    handleDeleteBoss: onDeleteBoss,
    handleEditTask: onEditTask,
    handleEditBoss: onEditBoss,
    ...schedulerData // 나머지 모든 속성(tasks, bosses, counts 등)은 schedulerData 객체에
  } = useScheduler(selectedCharacterId);

  // 핸들러들을 별도의 객체로 묶어서 보내어 가독성 높임
  const schedulerHandlers = {
    onCheckChange,
    onBulkUpdate,
    onAddTask,
    onAddBoss,
    onDeleteTask,
    onDeleteBoss,
    onEditTask,
    onEditBoss,
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountSelector
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        onAccountChange={handleAccountChange}
        onAddAccount={handleAddAccount}
        onDeleteAccount={handleDeleteAccount}
        loading={loading}
        isAddingAccount={isAddingAccount}
        isDeletingAccount={isDeletingAccount}
        error={error}
      />

      {selectedAccountId && (
        <CharacterSelector
          characters={charactersForSelectedAccount}
          selectedCharacterId={selectedCharacterId}
          onCharacterChange={handleCharacterChange}
          onAddCharacter={handleAddCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          isAddingCharacter={isAddingCharacter}
          isDeletingCharacter={isDeletingCharacter}
          isCharactersLoading={isCharactersLoading}
        />
      )}

      {selectedCharacter && (
        <ScheduleDetails
          character={selectedCharacter}
          {...schedulerData}
          {...schedulerHandlers}
        />
      )}
    </div>
  );
};

export default SchedulerPage;
