import BaseComponent from "../../ts/components/BaseComponent";
import { getDateWithStringMonth } from "../../ts/utils/dateHelper";
import { Article } from "../../ts/types";
import ITemplateElement from "../../ts/interfaces/ITemplateElement";

export default class Card extends BaseComponent implements ITemplateElement{
  constructor(template: HTMLElement){
    super(template);
  }

  create({ source, title, description, publishedAt, url, urlToImage }: Article) {
    const author = source.name;

    const newCard = <HTMLElement>this._element.cloneNode(true);

    const linkNode = <HTMLElement>newCard.querySelector('.ref');
    linkNode.setAttribute('href', url);

    const imageNode = <HTMLElement>newCard.querySelector('.card__image');
    imageNode.setAttribute('src', urlToImage);
    imageNode.onerror = (): void => {
      imageNode.setAttribute('src', require('../../images/cards/womanyellingcat.jpg'));
    };

    const dateNode = <HTMLElement>newCard.querySelector('.card__text-date');
    dateNode.textContent = getDateWithStringMonth(publishedAt);

    const titleNode = <HTMLElement>newCard.querySelector('.card__title');
    titleNode.textContent = title;

    const textNode = <HTMLElement>newCard.querySelector('.card__text');
    textNode.textContent = description;

    const sourceNode = <HTMLElement>newCard.querySelector('.card__source');
    sourceNode.textContent = author;

    return newCard;
  }
}
