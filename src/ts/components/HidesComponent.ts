import BaseComponent from "./BaseComponent";
import IHide from "../interfaces/IHide";

export default class HidesComponent extends BaseComponent implements IHide{
  private _hideSelector: string;

  constructor(element: HTMLElement){
    super(element);
  }

  setHideSelector(selector: string): void {
    this._hideSelector = selector;
  }

  show(): void {
    this.getElement().classList.remove(this._hideSelector);
  }

  hide(): void {
    this,this.getElement().classList.add(this._hideSelector);
  }
}
