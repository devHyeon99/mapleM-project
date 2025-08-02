"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { NoticeListTab } from "@/components/home/board/NoticeListTab";
import { PatchNotesTab } from "@/components/home/board/PatchNotesTab";
import { EventListTab } from "@/components/home/board/EventListTab";
import { Button } from "@/shared/ui/button";

export function NoticeTabs() {
  return (
    <div className="w-full max-w-3xl">
      <Tabs defaultValue="notice" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-sm">
          <TabsTrigger value="notice" className="rounded-sm">
            공지사항
          </TabsTrigger>
          <TabsTrigger value="patch" className="rounded-sm">
            패치노트
          </TabsTrigger>
          <TabsTrigger value="event" className="rounded-sm">
            이벤트
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notice">
          <div className="rounded-sm border p-4">
            <div className="mb-4 flex justify-between border-b">
              <h2 className="text-xl font-semibold">공지사항</h2>
              <Button variant="link" className="cursor-pointer p-0" asChild>
                <a
                  href="https://maplestorym.nexon.com/1198/board/1211/list"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  더보기
                </a>
              </Button>
            </div>
            <NoticeListTab />
          </div>
        </TabsContent>

        <TabsContent value="patch">
          <div className="rounded-sm border p-4">
            <div className="mb-4 flex justify-between border-b">
              <h2 className="text-xl font-semibold">패치노트</h2>
              <Button variant="link" className="cursor-pointer p-0" asChild>
                <a
                  href="https://maplestorym.nexon.com/1198/board/1215/list"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  더보기
                </a>
              </Button>
            </div>
            <PatchNotesTab />
          </div>
        </TabsContent>

        <TabsContent value="event">
          <div className="rounded-sm border p-4">
            <div className="mb-4 flex justify-between border-b">
              <h2 className="text-xl font-semibold">이벤트</h2>
              <Button variant="link" className="cursor-pointer p-0" asChild>
                <a
                  href="https://maplestorym.nexon.com/1198/board/1378/list"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  더보기
                </a>
              </Button>
            </div>
            <EventListTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
