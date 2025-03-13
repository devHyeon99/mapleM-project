import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CharacterCard } from './CharacterCard';
import { AddCharacterDialog } from './AddCharacterDialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Character } from '@/types/account';
import { useCharacterSlider } from '@/hooks/useCharacterSlider';

export interface CharacterSliderProps {
  characters: Character[];
}

export function CharacterSlider({ characters }: CharacterSliderProps) {
  const { activeIndex, swiperKey, handleSlideChange } =
    useCharacterSlider(characters);

  const swiperConfig = {
    initialSlide: activeIndex,
    className: 'w-full',
    wrapperClass: 'py-2',
    modules: [Navigation, Pagination],
    spaceBetween: 10,
    slidesPerView: 3,
    slidesPerGroup: 3,
    loop: characters.length > 2 && true,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      bulletClass: 'w-2 h-2 mx-1 bg-muted rounded-full',
      bulletActiveClass: '!bg-accent',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 7,
        slidesPerGroup: 7,
        loop: characters.length > 6 && true,
      },
    },
    onSlideChange: handleSlideChange,
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <span>캐릭터 관리</span>
      </div>
      <div className='flex items-center gap-2 xl:gap-4'>
        <Button className='swiper-button-prev' size='icon'>
          <ChevronLeft />
        </Button>
        <Swiper key={swiperKey} {...swiperConfig}>
          {characters.map((char) => (
            <SwiperSlide key={char.id}>
              <CharacterCard name={char.name} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <AddCharacterDialog />
          </SwiperSlide>
        </Swiper>
        <Button className='swiper-button-next' size='icon'>
          <ChevronRight />
        </Button>
      </div>
      <div className='custom-pagination flex justify-center'></div>
    </div>
  );
}
