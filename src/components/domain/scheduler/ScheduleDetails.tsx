"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScheduleCard } from "./ScheduleCard";
import { ChecklistItem } from "./ChecklistItem";
import type { Character, Task } from "@/types/scheduler";

interface ScheduleDetailsProps {
  character: Character;
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
  onEditTask: (taskId: string) => void;
  onEditBoss: (bossId: string) => void;
}

export const ScheduleDetails = ({
  character,
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
          <Card>
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
              <CardDescription>
                Lv.{character.level} {character.job}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                넥슨 API를 통해 가져온 상세 캐릭터 정보가 여기에 표시됩니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 과제 관리 */}
        <TabsContent value="tasks" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 일일 과제 */}
            <ScheduleCard
              title="일일 과제"
              completedCount={dailyTasksCount}
              totalCount={tasks.daily.length}
              onSelectAll={() => onBulkUpdate(tasks.daily, true)}
              onReset={() => onBulkUpdate(tasks.daily, false)}
              onAddItem={(taskName) => onAddTask("daily", taskName)}
            >
              {(isEditMode) =>
                tasks.daily.map((task) => (
                  <ChecklistItem
                    key={task.id}
                    item={task}
                    isChecked={!!checkedItems[task.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(task.id, checked)
                    }
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={() => onEditTask(task.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>

            {/* 주간 과제 */}
            <ScheduleCard
              title="주간 과제"
              completedCount={weeklyTasksCount}
              totalCount={tasks.weekly.length}
              onSelectAll={() => onBulkUpdate(tasks.weekly, true)}
              onReset={() => onBulkUpdate(tasks.weekly, false)}
              onAddItem={(taskName) => onAddTask("weekly", taskName)}
            >
              {(isEditMode) =>
                tasks.weekly.map((task) => (
                  <ChecklistItem
                    key={task.id}
                    item={task}
                    isChecked={!!checkedItems[task.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(task.id, checked)
                    }
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={() => onEditTask(task.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>

            {/* 월간 과제 */}
            <ScheduleCard
              title="월간 과제"
              completedCount={monthlyTasksCount}
              totalCount={tasks.monthly.length}
              onSelectAll={() => onBulkUpdate(tasks.monthly, true)}
              onReset={() => onBulkUpdate(tasks.monthly, false)}
              onAddItem={(taskName) => onAddTask("monthly", taskName)}
            >
              {(isEditMode) =>
                tasks.monthly.map((task) => (
                  <ChecklistItem
                    key={task.id}
                    item={task}
                    isChecked={!!checkedItems[task.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(task.id, checked)
                    }
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={() => onEditTask(task.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>
          </div>
        </TabsContent>

        {/* 보스 관리 */}
        <TabsContent value="bosses" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 일일 보스 */}
            <ScheduleCard
              title="일일 보스"
              completedCount={dailyBossesCount}
              totalCount={bosses.daily.length}
              onSelectAll={() => onBulkUpdate(bosses.daily, true)}
              onReset={() => onBulkUpdate(bosses.daily, false)}
              onAddItem={(bossName) => onAddBoss("daily", bossName)}
            >
              {(isEditMode) =>
                bosses.daily.map((boss) => (
                  <ChecklistItem
                    key={boss.id}
                    item={boss}
                    isChecked={!!checkedItems[boss.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(boss.id, checked)
                    }
                    onDelete={() => onDeleteBoss(boss.id)}
                    onEdit={() => onEditBoss(boss.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>

            {/* 주간 보스 */}
            <ScheduleCard
              title="주간 보스"
              completedCount={weeklyBossesCount}
              totalCount={bosses.weekly.length}
              onSelectAll={() => onBulkUpdate(bosses.weekly, true)}
              onReset={() => onBulkUpdate(bosses.weekly, false)}
              onAddItem={(bossName) => onAddBoss("weekly", bossName)}
            >
              {(isEditMode) =>
                bosses.weekly.map((boss) => (
                  <ChecklistItem
                    key={boss.id}
                    item={boss}
                    isChecked={!!checkedItems[boss.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(boss.id, checked)
                    }
                    onDelete={() => onDeleteBoss(boss.id)}
                    onEdit={() => onEditBoss(boss.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>

            {/* 월간 보스 */}
            <ScheduleCard
              title="월간 보스"
              completedCount={monthlyBossesCount}
              totalCount={bosses.monthly.length}
              onSelectAll={() => onBulkUpdate(bosses.monthly, true)}
              onReset={() => onBulkUpdate(bosses.monthly, false)}
              onAddItem={(bossName) => onAddBoss("monthly", bossName)}
            >
              {(isEditMode) =>
                bosses.monthly.map((boss) => (
                  <ChecklistItem
                    key={boss.id}
                    item={boss}
                    isChecked={!!checkedItems[boss.id]}
                    onCheckedChange={(checked) =>
                      onCheckChange(boss.id, checked)
                    }
                    onDelete={() => onDeleteBoss(boss.id)}
                    onEdit={() => onEditBoss(boss.id)}
                    isEditMode={isEditMode}
                  />
                ))
              }
            </ScheduleCard>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
