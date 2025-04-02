import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TaskCategory } from '@/types/enums';
import { Task } from '@/types/task';
import { TaskTable, TaskTableColumns } from '@/features/task/components';
import { useTaskManager } from '@/features/task/hooks/useTaskManager';
import { CATEGORY_KR_MAP } from '@/constants/taskCategoryLabels';
import { toast } from 'sonner';

interface TaskManagerProps {
  characterId: string;
  type: 'quest' | 'boss';
  category: TaskCategory;
}

export const TaskManager = React.memo(
  ({ characterId, type, category }: TaskManagerProps) => {
    const {
      tasks,
      newTaskName,
      setNewTaskName,
      open,
      setOpen,
      toggleTask,
      handleSubmit,
      deleteTask,
    } = useTaskManager(characterId, category, type);

    if (!tasks) return null;

    const columns = TaskTableColumns<Task>(type);

    return (
      <TaskTable
        columns={columns}
        data={tasks}
        head={CATEGORY_KR_MAP[type][category]}
        onToggleSelectedRows={(selected) => {
          selected.forEach((task) => toggleTask(task.name));
        }}
        onDeleteSelectedRows={(selected) => {
          const results = selected.map((task) => deleteTask(task.name));
          const successCount = results.filter((r) => r.success).length;
          const failed = results.filter((r) => !r.success);

          if (successCount > 0) {
            toast.success(`${successCount}개의 작업이 삭제되었습니다.`);
          }

          if (failed.length > 0) {
            toast.error(
              `${failed.length}개의 작업 삭제에 실패했습니다: ${failed
                .map((f) => f.message)
                .join(', ')}`
            );
          }
        }}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 p-0 [&_svg]:!size-6'
              tooltip='할 일 추가'
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{CATEGORY_KR_MAP[type][category]} 추가</DialogTitle>
              <DialogDescription>
                추가하실 {CATEGORY_KR_MAP[type][category]}를 입력해주세요.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='name'
                  className='text-base text-left font-normal'
                >
                  {type === 'quest' ? '퀘스트' : '보스'} 이름
                </Label>
                <Input
                  id='name'
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className='col-span-3'
                />
              </div>
              <DialogFooter className='mt-4'>
                <Button type='submit' className='text-base font-medium'>
                  저장
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </TaskTable>
    );
  }
);
