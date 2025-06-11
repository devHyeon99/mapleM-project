"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleContentGrid } from "./ScheduleDetails/ScheduleContentGrid";
import type { Character, Task } from "@/types/scheduler";
import { CharacterBasicInfo } from "./CharacterBasicInfo";

interface ScheduleDetailsProps {
  character: Character;
  isLoading: boolean;
  tasks: { daily: Task[]; weekly: Task[]; monthly: Task[] };
  bosses: { daily: Task[]; weekly: Task[]; monthly: Task[] };
  checkedItems: { [key: string]: boolean };
  dailyTasksCount: number;
  weeklyTasksCount: number;
  monthlyTasksCount: number;
  dailyBossesCount: number;
  weeklyBossesCount: number;
  monthlyBossesCount: number;
  onCheckChange: (itemId: string, isChecked: boolean) => void;
  onBulkUpdate: (items: Task[], isChecked: boolean) => void;
  onAddTask: (
    category: "daily" | "weekly" | "monthly",
    taskName: string,
  ) => void;
  onAddBoss: (
    category: "daily" | "weekly" | "monthly",
    bossName: string,
  ) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteBoss: (bossId: string) => void;
  onEditTask: (taskId: string, newLabel: string) => void;
  onEditBoss: (bossId: string, newLabel: string) => void;
}

export const ScheduleDetails = ({
  character,
  isLoading,
  tasks,
  bosses,
  checkedItems,
  dailyTasksCount,
  weeklyTasksCount,
  monthlyTasksCount,
  dailyBossesCount,
  weeklyBossesCount,
  monthlyBossesCount,
  onCheckChange,
  onBulkUpdate,
  onAddTask,
  onAddBoss,
  onDeleteTask,
  onDeleteBoss,
  onEditTask,
  onEditBoss,
}: ScheduleDetailsProps) => {
  const taskCounts = {
    daily: dailyTasksCount,
    weekly: weeklyTasksCount,
    monthly: monthlyTasksCount,
  };
  const bossCounts = {
    daily: dailyBossesCount,
    weekly: weeklyBossesCount,
    monthly: monthlyBossesCount,
  };

  return (
    <section>
      <Tabs defaultValue="tasks">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="mb-2 text-center text-lg font-semibold md:mb-0">
            {character.name}의 스케줄
          </h2>
          <TabsList>
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="tasks">과제 관리</TabsTrigger>
            <TabsTrigger value="bosses">보스 관리</TabsTrigger>
          </TabsList>
        </div>

        {/* 기본 정보 */}
        <TabsContent value="info" className="mt-4">
          <CharacterBasicInfo ocid={character.ocid} />
        </TabsContent>

        {/* 과제 관리 */}
        <TabsContent value="tasks" className="mt-4">
          <ScheduleContentGrid
            typeLabel="과제"
            data={tasks}
            counts={taskCounts}
            checkedItems={checkedItems}
            onCheckChange={onCheckChange}
            onBulkUpdate={onBulkUpdate}
            onAddItem={onAddTask}
            onDeleteItem={onDeleteTask}
            onEditItem={onEditTask}
            isLoading={isLoading}
          />
        </TabsContent>

        {/* 보스 관리 */}
        <TabsContent value="bosses" className="mt-4">
          <ScheduleContentGrid
            typeLabel="보스"
            data={bosses}
            counts={bossCounts}
            checkedItems={checkedItems}
            onCheckChange={onCheckChange}
            onBulkUpdate={onBulkUpdate}
            onAddItem={onAddBoss}
            onDeleteItem={onDeleteBoss}
            onEditItem={onEditBoss}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};
