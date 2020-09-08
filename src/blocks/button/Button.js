import BaseComponent from "../../js/components/BaseComponent";

export default class Button extends BaseComponent{
  constructor(...args){
    super(...args);
    console.log(this._element);
    this.#addClickHandler();
  }

  #addClickHandler = () => {
    this._element.addEventListener('click', this._callbacks.showMoreNews);
  }
}
