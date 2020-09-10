import BaseComponent from "../../js/components/BaseComponent";

export default class Digits extends BaseComponent{
  #titleNode;
  #countNode;
  #countInTitleNode;

  constructor(...args){
    super(...args);
    this.#titleNode = this._element.querySelector('.title');
    this.#countNode = this._element.querySelector('.digits__count');
    this.#countInTitleNode = this._element.querySelector('.digits__title-count');
  }

  setData(title, count, countInTitle){
    this.#titleNode.textContent = `Вы спросили «${title}»`;
    this.#countNode.textContent = count;
    this.#countInTitleNode.textContent = countInTitle;
  }
}
