"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCharacterJewel } from "@/hooks/useCharacterJewel";
import { LoadingCard } from "@/components/common/LoadingCard";

interface JewelInfo {
  slot_no: number;
  jewel_icon: string;
  jewel_name: string;
  jewel_option: string;
}

const JewelDisplay = ({ jewel }: { jewel: JewelInfo }) => {
  const match = jewel.jewel_option.match(/^([^\d]+)([\d.,%+]+.*)$/);
  const label = match ? match[1].trim() : jewel.jewel_option;
  const value = match ? match[2].trim() : "";

  return (
    <div className="flex h-21.5 w-24 flex-col items-center py-1 text-center text-xs">
      <Image
        src={jewel.jewel_icon}
        alt={jewel.jewel_name}
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 object-contain"
      />
      <p className="mt-1">{label}</p>
      {value && <p>{value}</p>}
    </div>
  );
};

interface JewelTabProps {
  ocid: string;
}

export const JewelTab = ({ ocid }: JewelTabProps) => {
  const { data, isLoading, isError, error } = useCharacterJewel(ocid);

  if (isLoading) return <LoadingCard message="쥬얼 정보 불러오는중..." />;
  if (isError)
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  if (!data || data.jewel_equipment.length === 0)
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 쥬얼이
          없습니다.
        </p>
      </section>
    );

  const { use_jewel_page_no, use_jewel_set_option, jewel_equipment } = data;
  const parseSetOption = use_jewel_set_option?.split(",");

  const layout = [
    { className: "flex h-19 w-full justify-center", slots: [0] },
    { className: "flex h-19 w-full justify-between", slots: [1, 2] },
    { className: "mt-2 flex h-19 w-full justify-around", slots: [3, 4] },
  ];

  return (
    <div className="h-100 rounded-md border">
      <Tabs
        defaultValue={String(use_jewel_page_no)}
        className="flex h-full flex-col items-center"
      >
        <div className="flex w-full items-center justify-between p-4 pb-0">
          <div className="gpa-0.5 flex flex-col">
            <h3 className="font-bold">쥬얼 페이지</h3>
            <p className="text-muted-foreground text-sm">
              {use_jewel_page_no}페이지 장착중
            </p>
          </div>

          <TabsList className="self-start rounded-sm border">
            {jewel_equipment.map((page) => (
              <TabsTrigger
                key={page.jewel_page_no}
                value={String(page.jewel_page_no)}
              >
                {page.jewel_page_no}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {jewel_equipment.map((page) => (
          <TabsContent
            key={page.jewel_page_no}
            value={String(page.jewel_page_no)}
            className="relative flex h-full w-full flex-col gap-8 p-2"
          >
            {layout.map((row, i) => (
              <div key={i} className={row.className}>
                {row.slots.map(
                  (slot) =>
                    page.jewel_info[slot] && (
                      <JewelDisplay
                        key={page.jewel_info[slot].slot_no}
                        jewel={page.jewel_info[slot]}
                      />
                    ),
                )}
              </div>
            ))}

            {page.jewel_page_no === use_jewel_page_no && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center text-sm font-medium">
                  {parseSetOption?.map((item) => (
                    <p key={item + "-idx"}>{item}</p>
                  ))}
                  <p className="text-muted-foreground text-sm">현재 장착중</p>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
