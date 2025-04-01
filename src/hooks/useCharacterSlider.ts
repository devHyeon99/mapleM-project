import { useState, useRef, useEffect } from 'react';
import { CharacterData } from '@/types/character';
import type { Swiper as SwiperInstance } from 'swiper';

export function useCharacterSlider(characters: CharacterData[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperKey, setSwiperKey] = useState(characters.length);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const prevCountRef = useRef(characters.length);

  // 캐릭터가 추가될 때 activeIndex 보정 및 Swiper 재마운트를 위한 key 업데이트
  useEffect(() => {
    if (characters.length > prevCountRef.current) {
      setActiveIndex((prev) => prev + 1);
      setSwiperKey(characters.length);
    }
    prevCountRef.current = characters.length;
  }, [characters.length]);

  // 슬라이드 변경 시 페이지 상태 업데이트
  const handleSlideChange = (swiper: SwiperInstance) => {
    const slidesPerGroup = swiper.params.slidesPerGroup ?? 1;
    const totalSlides = characters.length + 1; // 캐릭터 슬라이드 + AddCharacterDialog
    const currentPage = Math.floor(swiper.realIndex / slidesPerGroup);
    const totalPages = Math.ceil(totalSlides / slidesPerGroup);

    setActiveIndex(swiper.realIndex);
    setIsBeginning(currentPage === 0);
    setIsEnd(currentPage === totalPages - 1);
  };

  return { activeIndex, swiperKey, isBeginning, isEnd, handleSlideChange };
}
