import BaseComponent from "../../js/components/BaseComponent";
import { BAD_NEWS_API_RESULT } from "../../js/constants/api";

export default class BadRequest extends BaseComponent{
  constructor(...args){
    super(...args);
    this.#addTitle();
  }

  #addTitle = () => {
    const title = this._element.querySelector('.title');
    title.textContent = BAD_NEWS_API_RESULT;
  }
}
