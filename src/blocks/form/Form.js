import BaseComponent from "../../js/components/BaseComponent";

export default class Form extends BaseComponent{
  constructor(...args){
    super(...args);
    this.#addSubmitHandler();
  }

  getQuestion(){
    return this._element.querySelector('.form__input').value;
  }

  #addSubmitHandler = () => {
    this._element.addEventListener('submit', this._callbacks.showNews);
  }
}
