import BaseComponent from "../../js/components/BaseComponent";
import { getFirstNewsMonth } from "../../js/utils/dateHelper";

export default class Daily extends BaseComponent{
  #monthNode;

  constructor(...args){
    super(...args);
    this.#monthNode = this._element.querySelector('#month');
  }

  setMonth(articles){
    this.#monthNode.textContent = `Дата (${getFirstNewsMonth(articles)})`;
  }
}
