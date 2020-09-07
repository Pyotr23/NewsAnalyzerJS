export default class BaseComponent {
  constructor(element, callbacks, hideModificator){
    this._element = element;
    this._callbacks = callbacks;
    this._hideModificator = hideModificator;
  }

  show = () => {
    this._element.classList.remove(this._hideModificator);
  };

  hide = () => {
    this._element.classList.add(this._hideModificator);
  }
}
