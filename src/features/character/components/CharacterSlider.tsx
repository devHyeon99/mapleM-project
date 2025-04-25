import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  CharacterDetail,
  CharacterCard,
  CharacterAddDialog,
  CharacterDeleteDialog,
} from '@/features/character/components';
import { CharacterData } from '@/types/character';
import { useCharacterSlider } from '@/hooks/useCharacterSlider';
import { useCurrentAccountData } from '@/hooks/useCurrentAccountData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';

export function CharacterSlider() {
  const { currentAccount, allCharacters } = useCurrentAccountData();

  const { activeIndex, swiperKey, handleSlideChange } =
    useCharacterSlider(allCharacters);

  const { getCharacter } = useCharacterStore.getState();

  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterData | null>(null);

  if (currentAccount === null) return;

  const updateSelectedCharacter = async (char: CharacterData) => {
    try {
      const updatedChar = await getCharacter(currentAccount.id, char.id);

      setSelectedCharacter(updatedChar);
    } catch (err) {
      console.error('캐릭터 갱신 실패:', err);
    }
  };

  const swiperConfig = {
    initialSlide: activeIndex,
    className: 'w-full px-0.5!',
    wrapperClass: 'py-2',
    modules: [Navigation, Pagination],
    spaceBetween: 10,
    slidesPerView: 3,
    slidesPerGroup: 3,
    loop: allCharacters.length > 2,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      bulletClass: 'custom-bullet w-2 h-2 mx-1 rounded-full',
      bulletActiveClass: 'custom-bullet-active',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 7,
        slidesPerGroup: 7,
        loop: allCharacters.length > 6,
      },
    },
    onSlideChange: handleSlideChange,
  };

  return (
    <div className='flex flex-col flex-1 gap-2'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>캐릭터 관리</h2>
        <div className='flex items-center gap-2'>
          <Button className='swiper-button-prev' size='icon' aria-label='이전'>
            <ChevronLeft className='size-5' aria-hidden />
          </Button>
          <Button className='swiper-button-next' size='icon' aria-label='다음'>
            <ChevronRight className='size-5' aria-hidden />
          </Button>
        </div>
      </div>
      <Swiper key={swiperKey} {...swiperConfig}>
        {allCharacters.map((char) => (
          <SwiperSlide key={char.id}>
            <CharacterCard
              characterBasicData={char.basic}
              onClick={() => updateSelectedCharacter(char)}
              selected={selectedCharacter?.id === char.id}
            />
            <CharacterDeleteDialog
              account={currentAccount.id}
              character={char.id}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <CharacterAddDialog />
        </SwiperSlide>
      </Swiper>
      <div className='custom-pagination flex justify-center'></div>
      <CharacterDetail character={selectedCharacter} />
    </div>
  );
}
