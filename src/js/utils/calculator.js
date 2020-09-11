import { SHOWED_NEWS_PACK_SIZE } from "../constants/news";

export const getCountInTitle = (articles, word) => {
  word = word.toLowerCase();
  const regex = new RegExp(`${word}`, 'is');
  return articles.reduce((sum, curr) => {
    const title = curr.title.toLowerCase();
    return sum + title.split(regex).length - 1;
  }, 0);
}

export const getDisplayedCount = (array, count) => {
  return array.length - SHOWED_NEWS_PACK_SIZE >= count
    ? count + SHOWED_NEWS_PACK_SIZE
    : array.length
}
