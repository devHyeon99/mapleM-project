import { useState, useEffect } from "react";
import { CharacterJewelEquipment } from "@/entities/character";

export const useJewelTab = (data?: CharacterJewelEquipment) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  // 데이터 로드 시 초기화
  useEffect(() => {
    if (data?.use_jewel_page_no && selectedPage === null) {
      setSelectedPage(String(data.use_jewel_page_no));
    }
  }, [data, selectedPage]);

  // 현재 활성화된 페이지 번호
  const activePageNo = selectedPage || String(data?.use_jewel_page_no || "1");

  // 현재 활성화된 페이지 데이터
  const activePageData = data?.jewel_equipment.find(
    (page) => String(page.jewel_page_no) === activePageNo,
  );

  // 세트 옵션 파싱
  const parseSetOption = data?.use_jewel_set_option?.split(",");

  return {
    selectedPage: activePageNo,
    setSelectedPage,
    activePageData,
    parseSetOption,
  };
};
