import BaseComponent from "../../ts/components/BaseComponent";

export default class Form extends BaseComponent{
  private _searchInput: HTMLInputElement;

  constructor(element: HTMLElement, submitHandler: EventListener){
    super(element);
    this._searchInput = this.getElement().querySelector('.form__input');
    this.setSubmitHandler(submitHandler);
  }

  getQuestion(){
    return this._searchInput.value;
  }

  setQuestion(question: string){
    this._searchInput.value = question;
  }

  private setSubmitHandler = (callback: EventListener) => {
    this.getElement().addEventListener('submit', callback);
  }

  disableForm = (): void => {
    this.getElement().style.pointerEvents = 'none';
  };

  enableForm = (): void => {
    this.getElement().style.pointerEvents = 'initial';
  };
}
