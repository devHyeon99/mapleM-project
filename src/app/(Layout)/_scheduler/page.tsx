"use client";

import { useScheduler, useAccounts, useCharacters } from "@/entities/scheduler";
import { AccountSelector } from "@/widgets/scheduler-account";
import { CharacterSelector } from "@/widgets/scheduler-character";
import { ScheduleBoard } from "@/widgets/scheduler-board";
import { CharacterDetail } from "@/widgets/character-detail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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
        <Tabs defaultValue="tasks" className="w-full">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <h2 className="mb-2 text-center text-lg font-semibold md:mb-0">
              {selectedCharacter.name}의 스케줄
            </h2>
            <TabsList>
              <TabsTrigger value="info">캐릭터 정보</TabsTrigger>
              <TabsTrigger value="tasks">과제 관리</TabsTrigger>
              <TabsTrigger value="bosses">보스 관리</TabsTrigger>
            </TabsList>
          </div>

          {/* 캐릭터 정보 탭 */}
          <TabsContent value="info" className="mt-4">
            <CharacterDetail ocid={selectedCharacter.ocid} />
          </TabsContent>

          {/* 과제 관리 탭 */}
          <TabsContent value="tasks" className="mt-4">
            <ScheduleBoard
              typeLabel="과제"
              data={schedulerData.tasks}
              counts={{
                daily: schedulerData.dailyTasksCount,
                weekly: schedulerData.weeklyTasksCount,
                monthly: schedulerData.monthlyTasksCount,
              }}
              checkedItems={schedulerData.checkedItems}
              onCheckChange={schedulerHandlers.onCheckChange}
              onBulkUpdate={schedulerHandlers.onBulkUpdate}
              onAddItem={schedulerHandlers.onAddTask}
              onDeleteItem={schedulerHandlers.onDeleteTask}
              onEditItem={schedulerHandlers.onEditTask}
              isLoading={schedulerData.isLoading}
            />
          </TabsContent>

          {/* 보스 관리 탭 */}
          <TabsContent value="bosses" className="mt-4">
            <ScheduleBoard
              typeLabel="보스"
              data={schedulerData.bosses}
              counts={{
                daily: schedulerData.dailyBossesCount,
                weekly: schedulerData.weeklyBossesCount,
                monthly: schedulerData.monthlyBossesCount,
              }}
              checkedItems={schedulerData.checkedItems}
              onCheckChange={schedulerHandlers.onCheckChange}
              onBulkUpdate={schedulerHandlers.onBulkUpdate}
              onAddItem={schedulerHandlers.onAddBoss}
              onDeleteItem={schedulerHandlers.onDeleteBoss}
              onEditItem={schedulerHandlers.onEditBoss}
              isLoading={schedulerData.isLoading}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SchedulerPage;
