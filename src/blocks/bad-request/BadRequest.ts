import HidesComponent from "../../ts/components/HidesComponent";
import { BAD_NEWS_API_RESULT } from "../../ts/constants/newsApi";

export default class BadRequest extends HidesComponent{
  constructor(element: HTMLElement, hideSelector: string){
    super(element, hideSelector);
    this.addTitle();
  }

  private addTitle = (): void => {
    const title = <HTMLElement>this._element.querySelector('.title');
    title.textContent = BAD_NEWS_API_RESULT;
  }
}
