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
    isCharactersError,
    isAddingCharacter,
    isDeletingCharacter,
    handleCharacterChange,
    handleAddCharacter,
    handleDeleteCharacter,
  } = useCharacters(selectedAccountId);

  const {
    tasks,
    bosses,
    checkedItems,
    dailyTasksCount,
    weeklyTasksCount,
    monthlyTasksCount,
    dailyBossesCount,
    weeklyBossesCount,
    monthlyBossesCount,
    handleCheckChange,
    handleBulkUpdate,
    handleAddTask,
    handleAddBoss,
    handleDeleteTask,
    handleDeleteBoss,
    handleEditTask,
    handleEditBoss,
  } = useScheduler();

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
          tasks={tasks}
          bosses={bosses}
          checkedItems={checkedItems}
          dailyTasksCount={dailyTasksCount}
          weeklyTasksCount={weeklyTasksCount}
          monthlyTasksCount={monthlyTasksCount}
          dailyBossesCount={dailyBossesCount}
          weeklyBossesCount={weeklyBossesCount}
          monthlyBossesCount={monthlyBossesCount}
          onCheckChange={handleCheckChange}
          onBulkUpdate={handleBulkUpdate}
          onAddTask={handleAddTask}
          onAddBoss={handleAddBoss}
          onDeleteTask={handleDeleteTask}
          onDeleteBoss={handleDeleteBoss}
          onEditTask={handleEditTask}
          onEditBoss={handleEditBoss}
        />
      )}
    </div>
  );
};

export default SchedulerPage;
