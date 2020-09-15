import Container from "./Container";
import IHide from "../interfaces/IHide";

export default class HidesContainer extends Container implements IHide{
  private _hideSelector: string;

  show(): void {
    this.getElement().classList.remove(this._hideSelector);
  }

  hide(): void {
    this,this.getElement().classList.add(this._hideSelector);
  }
}
