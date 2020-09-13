import BaseComponent from "./BaseComponent";

export default class Container extends BaseComponent{
  #container;

  constructor(selector, ...args){
    super(...args);
    this.#container = this._element.querySelector(selector);
  }

  render(items){
    items.forEach(item => {
      this.#container.appendChild(item);
    });
  }

  clear(){
    this.#container.innerHTML = '';
  }
}
