import BaseComponent from "../../js/components/BaseComponent";

export default class Cards extends BaseComponent{
  #container;

  constructor(...args){
    super(...args);
    this.#container = this._element.querySelector('.cards__list');
  }

  render(cards){
    cards.forEach(card => {
      this.#container.appendChild(card);
    });
  }
}
