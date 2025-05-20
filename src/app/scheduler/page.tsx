"use client";

import { useScheduler } from "@/hooks/useScheduler";
import { AccountSelector } from "@/components/domain/scheduler/AccountSelector";
import { CharacterSelector } from "@/components/domain/scheduler/CharacterSelector";
import { ScheduleDetails } from "@/components/domain/scheduler/ScheduleDetails";

const SchedulerPage = () => {
  const {
    accounts,
    selectedAccountId,
    selectedCharacterId,
    charactersForSelectedAccount,
    selectedCharacter,
    handleAccountChange,
    handleCharacterChange,
    handleAddAccount,
    handleDeleteAccount,
    handleAddCharacter,
    handleDeleteCharacter,
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
        onAccountChange={handleAccountChange}
        onAddAccount={handleAddAccount}
        onDeleteAccount={handleDeleteAccount}
      />

      {selectedAccountId && (
        <CharacterSelector
          characters={charactersForSelectedAccount}
          selectedCharacterId={selectedCharacterId}
          onCharacterChange={handleCharacterChange}
          onAddCharacter={handleAddCharacter}
          onDeleteCharacter={handleDeleteCharacter}
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
