import BaseComponent from "../../ts/components/BaseComponent";

export default class Button extends BaseComponent{
  constructor(element: HTMLElement, clickHandler: EventListener){
    super(element);
    this.setClickHandler(clickHandler);
  }

  private setClickHandler = (callback: EventListener): void => {
    this._element.addEventListener('click', callback);
  }
}
