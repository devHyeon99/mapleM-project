import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function CharacterHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <CircleHelp className='size-6' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle className='font-bold'> 계정관리 페이지 안내</DialogTitle>
          <DialogDescription>
            계정관리 페이지에서는 캐릭터를 추가하고, 캐릭터별로 퀘스트 정보를
            효율적으로 관리할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-y-auto max-h-[60vh] space-y-4 leading-relaxed p-2'>
          <section>
            <h3 className='font-bold'>캐릭터 추가 및 관리</h3>
            <ul className='list-disc pl-4 font-light'>
              <li>
                캐릭터 추가 버튼을 통해 새로운 캐릭터를 등록할 수 있습니다.
              </li>
              <li>
                캐릭터 관리 슬라이드에서 캐릭터를 선택하면, 해당 캐릭터의 정보를
                확인할 수 있습니다.
              </li>
            </ul>
          </section>
          <section>
            <h3 className='font-bold'>기본정보</h3>
            <ul className='list-disc pl-4 font-light'>
              <li>선택한 캐릭터의 기본 정보를 확인할 수 있습니다.</li>
              <li>캐릭터 정보는 30분 주기로 자동 동기화됩니다.</li>
            </ul>
          </section>
          <section>
            <h3 className='font-bold'>퀘스트</h3>
            <ul className='list-disc pl-4 font-light'>
              <li>퀘스트는 일일, 주간, 월간 단위로 구분됩니다.</li>
              <li>
                사용자가 직접 퀘스트를 추가하거나 삭제할 수 있으며, 완료 상태도
                변경할 수 있습니다.
              </li>
              <li>
                초기화는 다음 기준에 따라 자동으로 진행됩니다.
                <br />
                일일 퀘스트: 매일 00시 / 주간 퀘스트: 매주 월요일 / 월간 퀘스트:
                매월 1일
              </li>
            </ul>
          </section>
          <section>
            <h3 className='font-bold'>보스</h3>
            <ul className='list-disc pl-4 font-light'>
              <li>보스는 일일, 주간, 월간 단위로 구분됩니다.</li>
              <li>
                사용자가 직접 보스를 추가하거나 삭제할 수 있으며, 완료 상태도
                변경할 수 있습니다.
              </li>
              <li>
                초기화는 다음 기준에 따라 자동으로 진행됩니다.
                <br />
                일일 퀘스트: 매일 00시 / 주간 퀘스트: 매주 목요일 / 월간 퀘스트:
                매월 1일
              </li>
            </ul>
          </section>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
