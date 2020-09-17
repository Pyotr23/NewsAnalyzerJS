import BaseComponent from "../../ts/components/BaseComponent";
import ITemplateElement from "../../ts/interfaces/ITemplateElement";
import { DayCountRow } from "../../ts/types";

export default class TableRow extends BaseComponent implements ITemplateElement {
  constructor(element: HTMLElement){
    super(element);
  }

  create({ day, count, percent }: DayCountRow){
    const newRow = <HTMLElement>this._element.cloneNode(true);

    const dayNode = newRow.querySelector('.table-row__first-column');
    dayNode.textContent = day;

    const percentNode = newRow.querySelector('.table-row__shifter');
    percentNode.setAttribute('style', `width: ${percent}%`);

    const countNode = newRow.querySelector('#count');
    countNode.textContent = count.toString();

    this._element = newRow;
    return newRow;
  }

  setLastRowModificator(){
    this._element.classList.add('table-row_margin-bottom_last');
    this._element.classList.remove('table-row_margin-bottom');
  }
}
