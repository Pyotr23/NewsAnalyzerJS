export default class BaseComponent {
  constructor(element, callbacks){
    this._element = element;
    this._callbacks = callbacks;
  }

  setHideModifitator(cssClass){
    this._hideModificator = cssClass;
  }

  show = () => {
    this._element.classList.remove(this._hideModificator);
  };

  hide = () => {
    this._element.classList.add(this._hideModificator);
  }
}
