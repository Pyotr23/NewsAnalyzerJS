import { DAYS_AGO_COUNT } from "../constants/api";
import { QUESTION_RUSSIAN_MONTH_NAMES, RUSSIAN_MONTH_NAMES } from "../constants/dateTime";

export const getDaysAgoString = () => {
  const now = new Date();
  now.setDate(now.getDate() - DAYS_AGO_COUNT);
  return now.toISOString();
}

export const getDateWithStringMonth = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = QUESTION_RUSSIAN_MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export const getFirstNewsMonth = (articles) => {
  const firstArticle = articles[articles.length - 1];
  const firstArticleMonth = new Date(firstArticle.publishedAt).getMonth();
  return RUSSIAN_MONTH_NAMES[firstArticleMonth];
}
