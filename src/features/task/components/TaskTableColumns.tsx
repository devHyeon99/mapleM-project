import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types/task';

export const TaskTableColumns = <T extends Task>(
  type: 'quest' | 'boss'
): ColumnDef<T>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='border-gray-400'
      />
    ),
    cell: ({ row }) => {
      const id = `select-${row.id}`;
      return (
        <Checkbox
          id={id}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='border-gray-400'
        />
      );
    },
  },
  {
    accessorKey: 'name',
    header: type === 'quest' ? '퀘스트' : '보스',
    cell: ({ row }) => {
      const id = `select-${row.id}`;
      return (
        <label htmlFor={id} className='cursor-pointer lowercase'>
          {row.getValue('name')}
        </label>
      );
    },
  },
  {
    accessorKey: 'do',
    header: '상태',
    cell: ({ row }) => {
      const done = row.getValue<boolean>('do');
      return (
        <div className='flex items-center gap-2'>
          <span className={done ? 'text-green-400' : 'text-red-400'}>
            {done ? '완료' : '미완료'}
          </span>
        </div>
      );
    },
  },
];
