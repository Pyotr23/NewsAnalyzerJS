import BaseComponent from "../../js/components/BaseComponent";

export default class Button extends BaseComponent{
  constructor(...args){
    super(...args);
  }

  addClickHandler = (callback) => {
    this._element.addEventListener('click', callback);
  }
}
