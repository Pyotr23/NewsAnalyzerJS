export default class BaseComponent {
  constructor(element, callbacks){
    this._element = element;
    this._callbacks = callbacks;
  }
  // constructor(callbacks = {}, template, modificator){
  //   super(callbacks);
  //   this.#element = element;
  //   this._setHandlers()
  // }

  // setHideModificator(value){
  //   this.#hideModificator = value;
  // }

  // _setHandlers = (...args) => {
  //   this.#element.addEventListener(...args);
  // }

  // show = () => {
  //   this.#element.classList.remove(this.#hideModificator);
  // };

  // hide = () => {
  //   this.#element.classList.add(this.#hideModificator);
  // }
}
