import BaseComponent from "../../js/components/BaseComponent";

export default class Form extends BaseComponent{
  #searchInput;

  constructor(...args){
    super(...args);
    this.#searchInput = this._element.querySelector('.form__input');
  }

  getQuestion(){
    return this.#searchInput.value;
  }

  setQuestion(question){
    this.#searchInput.value = question;
  }

  addSubmitHandler = (callback) => {
    this._element.addEventListener('submit', callback);
  }

  disableForm = () => {
    this._element.style.pointerEvents = 'none';
  };

  enableForm = () => {
    this._element.style.pointerEvents = 'initial';
  };
}
