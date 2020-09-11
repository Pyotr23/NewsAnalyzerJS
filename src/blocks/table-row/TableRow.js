import BaseComponent from "../../js/components/BaseComponent";

export default class TableRow extends BaseComponent {
  constructor(...args){
    super(...args);
  }

  create(day, count, percent){
    const newRow = this._element.cloneNode(true);

    const dayNode = newRow.querySelector('.table-row__first-column');
    dayNode.textContent = day;

    const percentNode = newRow.querySelector('.table-row__shifter');
    percentNode.setAttribute('style', `width: ${percent}%`);

    const countNode = newRow.querySelector('#count');
    countNode.textContent = count;

    return newRow;
  }
}
