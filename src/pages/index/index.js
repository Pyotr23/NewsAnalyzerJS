import './index.css';
import FormValidator from '../../js/modules/FormValidator';
import NewsApi from '../../js/modules/api/NewsApi';
import Form from '../../blocks/form/Form';
import Cards from '../../blocks/cards/Cards';
import Card from '../../blocks/card/Card';

const searchForm = document.querySelector('.form');
const cardsNode = document.querySelector('.cards');
const cardTemplate = document
  .getElementById('card-template')
  .content
  .querySelector('.card');
const cards = new Cards(cardsNode, {}, 'cards_hide');
const validator = new FormValidator(searchForm);
const newsApi = new NewsApi();

const form = new Form(searchForm, { showNews });
form.addSubmitHandler();

async function showNews(event) {
  event.preventDefault();
  const res = await newsApi
    .getNews(form.getQuestion());
  const firstCards = res
    .articles
    .slice(0, 3)
    .map(ar => new Card(cardTemplate).create(ar));
  cards.render(firstCards);
  cards.show();
}

// <li class="card">
//       <!-- <a class="ref ref_place_card" href="www.yandex.ru" target="_blank"> -->
//       <a class="ref ref_place_card" target="_blank">
//         <div class="card__container">
//           <img class="card__image" src="<%=require('../../images/cards/womanyellingcat.jpg')%>" alt="заглавная картинка"/>
//           <div class="card__text-content">
//             <p class="card__text-date">2 августа, 2019</p>
//             <h3 class="card__title">Национальное достояние - парки</h3>
//             <p class="card__text">В 2016 году Америка отмечала важный юбилей:
//               сто лет назад здесь начала складываться система национальных парков...</p>
//           </div>
//         </div>
//         <p class="card__source">Медуза</p>
//       </a>
//     </li>

