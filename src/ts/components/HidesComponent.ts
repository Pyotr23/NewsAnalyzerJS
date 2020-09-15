import BaseComponent from "./BaseComponent";
import IHide from "../interfaces/IHide";

export default class HidesComponent extends BaseComponent implements IHide{
  private _hideSelector: string;

  constructor(element: HTMLElement, hideSelector: string){
    super(element);
    this._hideSelector = hideSelector;
  }

  show(): void {
    this.getElement().classList.remove(this._hideSelector);
  }

  hide(): void {
    this,this.getElement().classList.add(this._hideSelector);
  }
}
