import Api from "./Api";
import { NEWS_API_URL, NEWS_API_KEY, PAGE_SIZE, PUBLISHED_AT } from "../../constants/api";
import { getDaysAgoString } from "../../utils/dateHelper";

export default class NewsApi extends Api{
  getNews = (question) =>{
    const fromDateString = getDaysAgoString();
    return this._get(NEWS_API_URL, {
      q: question,
      apiKey: NEWS_API_KEY,
      from: fromDateString,
      pageSize: PAGE_SIZE,
      sortBy: PUBLISHED_AT
    })
  }
}
