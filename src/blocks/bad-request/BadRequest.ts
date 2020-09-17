import BaseComponent from "../../ts/components/BaseComponent";
import { BAD_NEWS_API_RESULT } from "../../ts/constants/newsApi";

export default class BadRequest extends BaseComponent{
  constructor(element: HTMLElement){
    super(element);
    this.addTitle();
  }

  private addTitle = (): void => {
    const title = this._element.querySelector('.title');
    title.textContent = BAD_NEWS_API_RESULT;
  }
}
