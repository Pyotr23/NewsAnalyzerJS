import BaseComponent from "../../ts/components/BaseComponent";

export default class Digits extends BaseComponent{
  private _titleNode: HTMLElement;
  private _countNode: HTMLElement;
  private _countInTitleNode: HTMLElement;

  constructor(element: HTMLElement){
    super(element);
    this._titleNode = this._element.querySelector('.title');
    this._countNode = this._element.querySelector('.digits__count');
    this._countInTitleNode = this._element.querySelector('.digits__title-count');
  }

  setData(title: string, count: number, countInTitle: number){
    this._titleNode.textContent = `Вы спросили: «${title}»`;
    this._countNode.textContent = count.toString();
    this._countInTitleNode.textContent = countInTitle.toString();
  }
}
