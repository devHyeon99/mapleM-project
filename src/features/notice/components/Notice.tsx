import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import { noticeSwiperConfig } from '@/config/swiperConfig';
import { useNoticeQuery } from '@/features/notice/queries';
import { NoticeCard } from './NoticeCard';

import 'swiper/css';
import 'swiper/css/pagination';

export const Notice = () => {
  const { data, isLoading, error } = useNoticeQuery();

  const slides = [
    { title: '공지사항', data: data?.notices },
    { title: '패치노트', data: data?.patchNotices },
    { title: '이벤트', data: data?.eventNotices },
  ];

  return (
    <div className='flex flex-col flex-1 w-full'>
      <div className='relative w-full'>
        <Swiper
          {...noticeSwiperConfig}
          modules={[Autoplay, Mousewheel, Pagination]}
        >
          {slides.map(({ title, data }, idx) => (
            <SwiperSlide key={idx}>
              <NoticeCard
                title={title}
                notices={data ?? []}
                loading={isLoading}
                error={error?.message}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 페이지네이션 위치 고정 */}
        <div className='custom-pagination absolute !bottom-4 z-10 flex justify-center'></div>
      </div>
    </div>
  );
};
