import { SHOWED_NEWS_PACK_SIZE } from "../constants/news";

export const getCountInTitle = (articles, word) => {
  word = word.toLowerCase();
  const regex = new RegExp(`${word}`, 'is');
  return articles.reduce((sum, curr) => {
    const title = curr.title.toLowerCase();
    return sum + title.split(regex).length - 1;
  }, 0);
}

export const getMatchesInArticle = (article, word) => {
  word = word.toLowerCase();
  const regex = new RegExp(`${word}`, 'is');
  let count = article.title
    ? article.title.toLowerCase().split(regex).length - 1
    : 0;
  count += article.description
    ? article.description.toLowerCase().split(regex).length - 1
    : 0;
  return count;
}

export const getDisplayedCount = (array, count) => {
  return array.length - SHOWED_NEWS_PACK_SIZE >= count
    ? count + SHOWED_NEWS_PACK_SIZE
    : array.length
}
