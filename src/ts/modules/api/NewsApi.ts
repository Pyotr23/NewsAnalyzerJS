import Api from "./Api";
import { getDaysAgoString } from "../../utils/dateHelper";
import { NEWS_API_URL, NEWS_API_KEY, PAGE_SIZE, PUBLISHED_AT, NEWS_LANGUAGE } from "../../constants/newsApi";
import { NewsResponse } from "../../types";

export default class NewsApi extends Api{
  getNews = (question: string): Promise<NewsResponse> =>{
    const url = `${NEWS_API_URL}?q=${question}&apiKey=${NEWS_API_KEY}&from=${getDaysAgoString()}&pageSize=${PAGE_SIZE}`
      + `&sortBy=${PUBLISHED_AT}&language=${NEWS_LANGUAGE}`;
    return this.http<NewsResponse>(url, { method: 'GET' });
  }
}
