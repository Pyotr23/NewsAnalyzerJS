import { DAYS_AGO_COUNT } from "../constants/newsApi";
import { QUESTION_RUSSIAN_MONTH_NAMES, RUSSIAN_MONTH_NAMES } from "../constants/dateTime";
import { Article } from "../types";

export const getDaysAgoString = (): string => {
  const now = new Date();
  now.setDate(now.getDate() - DAYS_AGO_COUNT);
  return now.toISOString();
}

export const getDateWithStringMonth = (isoDate: Date): string => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = QUESTION_RUSSIAN_MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

// на входе - отсортированный по убыванию дат массив новостей
export const getFirstNewsMonth = (articles: Article[]): string => {
  const firstArticle = articles[articles.length - 1];
  const firstArticleMonth = new Date(firstArticle.publishedAt).getMonth();
  return RUSSIAN_MONTH_NAMES[firstArticleMonth];
}

const compareDates = (first: Article, second: Article): number => {
  const firstDate = first.publishedAt;
  const secondDate = second.publishedAt;
  if (firstDate > secondDate)
    return 1;
  else if (firstDate < secondDate)
    return -1;
  else
    return 0;
}

export const sortByDateDesc = (articles: Article[]): Article[] => {
  return articles.sort(compareDates);
}
