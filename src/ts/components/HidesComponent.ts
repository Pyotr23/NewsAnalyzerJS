import BaseComponent from "./BaseComponent";
import IHide from "../interfaces/IHide";

export default class HidesComponent extends BaseComponent implements IHide{
  private _hideSelector: string;

  constructor(element: HTMLElement, hideSelector: string){
    super(element);
    this._hideSelector = hideSelector;
  }

  show(): void {
    this._element.classList.remove(this._hideSelector);
  }

  hide(): void {
    this._element.classList.add(this._hideSelector);
  }
}
