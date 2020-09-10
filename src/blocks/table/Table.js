import BaseComponent from "../../js/components/BaseComponent";

export default class Table extends BaseComponent{
  #container

  constructor(...args){
    super(...args);
    this.#container = this._element.querySelector('.table__container');
  }

  render(rows){
    rows.forEach(row => {
      this.#container.appendChild(row);
    });
  }
}
