import { SHOWED_NEWS_PACK_SIZE } from "../constants/news";
import { Article } from "../types";

export const getCountInTitle = (articles: Article[], word: string): number => {
  word = word.toLowerCase();
  const regex = new RegExp(`${word}`, 'is');
  return articles.reduce((sum, curr) =>
  {
    const title = curr.title.toLowerCase();
    return sum + title.split(regex).length - 1;
  },
  0);
}

export const getMatchesInArticle = (article: Article, word: string): number => {
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

export const getDisplayedCount = (arrayLength: number, count: number) => {
  return arrayLength - SHOWED_NEWS_PACK_SIZE >= count
    ? count + SHOWED_NEWS_PACK_SIZE
    : arrayLength;
}
