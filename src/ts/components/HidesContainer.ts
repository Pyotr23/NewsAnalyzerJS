import Container from "./Container";
import IHide from "../interfaces/IHide";

export default class HidesContainer extends Container implements IHide{
  private _hideSelector: string;

  constructor(container: HTMLElement, element: HTMLElement, hideSelector: string){
    super(container, element);
    this._hideSelector = hideSelector;
  }

  show(): void {
    this._element.classList.remove(this._hideSelector);
  }

  hide(): void {
    this._element.classList.add(this._hideSelector);
  }
}
