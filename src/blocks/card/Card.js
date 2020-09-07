import TemplatedComponent from "../../js/components/TemplatedComponent";

export default class Card extends TemplatedComponent{
  constructor(template){
    super(template);
  }

  create(dtoCard) {
    const { source, title, description, publishedAt, url, urlToImage } = dtoCard;
    const author = source.name;

    const newCard = this._template.cloneNode(true);

    const linkNode = newCard.querySelector('.ref');
    linkNode.setAttribute('href', url);

    const imageNode = newCard.querySelector('.card__image');
    imageNode.setAttribute('src', urlToImage);
    imageNode.onerror = () => {
      imageNode.setAttribute('src', require('../../images/cards/womanyellingcat.jpg'));
    };

    const dateNode = newCard.querySelector('.card__text-date');
    dateNode.textContent = publishedAt;

    const titleNode = newCard.querySelector('.card__title');
    titleNode.textContent = title;

    const textNode = newCard.querySelector('.card__text');
    textNode.textContent = description;

    const sourceNode = newCard.querySelector('.card__source');
    sourceNode.textContent = author;

    return newCard;
  }
}
