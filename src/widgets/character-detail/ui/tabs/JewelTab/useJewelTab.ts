import { useState } from "react";
import type { CharacterJewelEquipment } from "@/entities/character/model/types";

export const useJewelTab = (data?: CharacterJewelEquipment) => {
  const [selectedPage, setSelectedPage] = useState<string>();
  const jewelEquipment = data?.jewel_equipment ?? [];
  const defaultPageNo = String(data?.use_jewel_page_no ?? "1");

  // 현재 활성화된 페이지 번호
  const activePageNo =
    selectedPage &&
    jewelEquipment.some((page) => String(page.jewel_page_no) === selectedPage)
      ? selectedPage
      : defaultPageNo;

  // 현재 활성화된 페이지 데이터
  const activePageData = jewelEquipment.find(
    (page) => String(page.jewel_page_no) === activePageNo,
  );

  // 세트 옵션 파싱
  const parsedSetOption = data?.use_jewel_set_option
    ?.split(",")
    .map((option) => option.trim())
    .filter(Boolean);

  return {
    selectedPage: activePageNo,
    setSelectedPage,
    activePageData,
    parsedSetOption,
  };
};
