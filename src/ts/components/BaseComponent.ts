export default class BaseComponent {
  protected _element: HTMLElement;

  constructor(element: HTMLElement){
    this._element = element;
  }
}
