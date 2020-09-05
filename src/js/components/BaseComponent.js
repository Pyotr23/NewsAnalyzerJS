export default class BaseComponent {
    constructor(element, callbacks = {}, dependencies = {}){
    this.#element = element;
    this.#callbacks = callbacks;
    this.#dependencies = dependencies;
  }

  setHideModificator(value){
    this.#hideModificator = value;
  }

  addEventListener = (...args) => {
    this.#element.addEventListener(...args);
  }

  show = () => {
    this.#element.classList.remove(this.#hideModificator);
  };

  hide = () => {
    this.#element.classList.add(this.#hideModificator);
  };
}
