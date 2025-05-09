import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DialogContentNoClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/80' />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] sm:w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContentNoClose.displayName = 'DialogContentNoClose';

interface NicknameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nickname: string;
  onNicknameChange: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const NicknameDialog = ({
  open,
  onOpenChange,
  nickname,
  onNicknameChange,
  isSubmitting,
  onSubmit,
}: NicknameDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContentNoClose
        className='sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>환영합니다!</DialogTitle>
          <DialogDescription>
            서비스 이용을 위해 사용할 닉네임을 설정해주세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>
            <Input
              id='nickname'
              placeholder='닉네임을 입력하세요'
              value={nickname}
              onChange={(e) => onNicknameChange(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContentNoClose>
    </Dialog>
  );
};
