import { SHOWED_NEWS_PACK_SIZE } from "../constants/news"

export const getDisplayedCount = (array, count) => {
  return array.length - SHOWED_NEWS_PACK_SIZE >= count
    ? count + SHOWED_NEWS_PACK_SIZE
    : array.length
}
