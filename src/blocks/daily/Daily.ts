import BaseComponent from "../../ts/components/BaseComponent";
import { getFirstNewsMonth } from "../../ts/utils/dateHelper";
import { Article } from "../../ts/types";

export default class Daily extends BaseComponent{
  private monthNode: HTMLElement;

  constructor(element: HTMLElement){
    super(element);
    this.monthNode = this.getElement().querySelector('#month');
  }

  setMonth(articles: Article[]){
    this.monthNode.textContent = `Дата (${getFirstNewsMonth(articles)})`;
  }
}
