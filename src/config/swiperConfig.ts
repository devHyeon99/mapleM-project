import { SwiperProps } from 'swiper/react';

export const swiperConfig: SwiperProps = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  mousewheel: {
    invert: false,
    sensitivity: 0.5,
  },
};
