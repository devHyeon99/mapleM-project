import { SwiperProps } from 'swiper/react';

export const noticeSwiperConfig: SwiperProps = {
  className: 'w-full',
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.custom-pagination',
    clickable: true,
    bulletClass: 'custom-bullet w-2 h-2 mx-1 rounded-full',
    bulletActiveClass: 'custom-bullet-active',
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
