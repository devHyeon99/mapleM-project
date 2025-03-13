// Notice.tsx
import { swiperConfig } from '@/config/swiperConfig';
import { useNoticeQuery } from '@/queries/useNoticeQuery'; // React Query 훅 사용
import { NoticeCard } from './NoticeCard';
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export const Notice = () => {
  const { data, isLoading, error } = useNoticeQuery(); // React Query 훅 호출

  return (
    <Swiper {...swiperConfig} modules={[Autoplay, Mousewheel, Pagination]}>
      <SwiperSlide>
        <NoticeCard
          notices={data?.notices ?? []} // 캐시된 데이터 사용
          title='공지사항'
          loading={isLoading} // 로딩 상태
          error={error?.message} // 에러 상태
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoticeCard
          notices={data?.patchNotices ?? []} // 패치 노트 데이터
          title='패치노트'
          loading={isLoading}
          error={error?.message}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoticeCard
          notices={data?.eventNotices ?? []} // 이벤트 데이터
          title='이벤트'
          loading={isLoading}
          error={error?.message}
        />
      </SwiperSlide>
    </Swiper>
  );
};
