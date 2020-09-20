import BaseComponent from "./BaseComponent";
import IContainer from "../interfaces/IContainer";

export default class Container extends BaseComponent implements IContainer{
  private _container: HTMLElement;

  constructor(container: HTMLElement, element: HTMLElement){
    super(element);
    this._container = container;
  }

  render(items: HTMLElement[]): void{
    items.forEach(item => this._container.appendChild(item));
  }

  clear(){
    this._container.innerHTML = '';
  }
}
