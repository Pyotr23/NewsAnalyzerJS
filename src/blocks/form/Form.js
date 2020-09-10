import BaseComponent from "../../js/components/BaseComponent";

export default class Form extends BaseComponent{
  #searchInput;

  constructor(...args){
    super(...args);
    this.#addSubmitHandler();
    this.#searchInput = this._element.querySelector('.form__input');
  }

  getQuestion(){
    return this.#searchInput.value;
  }

  setQuestion(question){
    this.#searchInput.value = question;
  }

  #addSubmitHandler = () => {
    this._element.addEventListener('submit', this._callbacks.showNews);
  }
}
