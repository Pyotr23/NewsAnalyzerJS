import IHide from "../../ts/interfaces/IHide";
import Button from "./Button";

export default class HidesButton extends Button implements IHide{
  private _hideSelector: string;

  constructor(element: HTMLElement, clickHandler: EventListener, hideSelector: string){
    super(element, clickHandler);
    this._hideSelector = hideSelector;
  }

  show(): void {
    this._element.classList.remove(this._hideSelector);
  }

  hide(): void {
    this._element.classList.add(this._hideSelector);
  }
}
