import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SquareCheckBig, Trash2 } from 'lucide-react';
import React from 'react';
import { useConditionalDialog } from '@/hooks/useConditionalDialog';
import { toast } from 'sonner';

interface TaskTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  head: string;
  onToggleSelectedRows?: (selected: TData[]) => void;
  onDeleteSelectedRows?: (selected: TData[]) => void;
  children?: React.ReactNode;
  emptyMessage?: string;
  confirmDeleteTitle?: string;
  confirmDeleteDescription?: string;
}

export function TaskTable<TData, TValue>({
  columns,
  data,
  head,
  onToggleSelectedRows,
  onDeleteSelectedRows,
  children,
  emptyMessage = '존재하는 일정이 없습니다.',
  confirmDeleteTitle = '정말 선택된 일정을 삭제하시겠습니까?',
  confirmDeleteDescription = '선택된 일정 정보를 삭제합니다.',
}: TaskTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { open, setOpen, openDialog } = useConditionalDialog({
    getSelectedItems: () => table.getFilteredSelectedRowModel().rows,
    onEmptySelection: () => toast.warning('선택된 일정이 없습니다.'),
  });

  if (table.getFilteredRowModel().rows.length === 0) {
    return (
      <div className='flex-1 flex flex-col h-full'>
        <div className='flex justify-end gap-2 py-2'>{children}</div>
        <p className='flex-1 flex flex-row justify-center items-center'>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className='flex-1'>
      <div className='flex justify-end gap-2 py-2'>
        <h2 className='flex-1 self-center font-semibold'>{head} 관리</h2>
        <Button
          variant='ghost'
          className='h-8 w-8 p-0 [&_svg]:!size-5'
          onClick={() => {
            const selectedRows = table.getFilteredSelectedRowModel().rows;
            if (selectedRows.length === 0) {
              toast.warning('선택된 일정이 없습니다.');
              return;
            }
            onToggleSelectedRows?.(selectedRows.map((r) => r.original));
            table.resetRowSelection();
          }}
        >
          <span className='sr-only'>일정 완료</span>
          <SquareCheckBig />
        </Button>
        {children}
        <Button
          variant='ghost'
          className='h-8 w-8 p-0 [&_svg]:!size-5'
          onClick={openDialog}
        >
          <span className='sr-only'>일정 삭제</span>
          <Trash2 />
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmDeleteTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmDeleteDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const selectedRows = table.getFilteredSelectedRowModel().rows;
                  onDeleteSelectedRows?.(selectedRows.map((r) => r.original));
                  table.resetRowSelection();
                }}
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 pt-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          전체 {table.getFilteredRowModel().rows.length}개 중{' '}
          {table.getFilteredSelectedRowModel().rows.length}개 선택됨
        </div>
      </div>
    </div>
  );
}
