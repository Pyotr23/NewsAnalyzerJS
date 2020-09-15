import BaseComponent from "../../ts/components/BaseComponent";

export default class TableRow extends BaseComponent {
  constructor(...args){
    super(...args);
  }

  create(rowData){
    const { day, count, percent } = rowData;
    const newRow = this._element.cloneNode(true);

    const dayNode = newRow.querySelector('.table-row__first-column');
    dayNode.textContent = day;

    const percentNode = newRow.querySelector('.table-row__shifter');
    percentNode.setAttribute('style', `width: ${percent}%`);

    const countNode = newRow.querySelector('#count');
    countNode.textContent = count;

    this._element = newRow;
    return newRow;
  }

  setLastRowModificator(){
    this._element.classList.add('table-row_margin-bottom_last');
    this._element.classList.remove('table-row_margin-bottom');
  }
}
