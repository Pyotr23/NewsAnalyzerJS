import './about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import { SWIPER_CONFIG } from '../../js/constants/swiperConfig';

Swiper.use([Navigation, Pagination]);

function initSwiper() {
  new Swiper('.swiper__container', SWIPER_CONFIG);
}

initSwiper();
