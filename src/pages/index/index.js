import './index.css';
import FormValidator from '../../js/modules/FormValidator';
import NewsApi from '../../js/modules/api/NewsApi';
import Form from '../../blocks/form/Form';
import Cards from '../../blocks/cards/Cards';
import Card from '../../blocks/card/Card';
import DataStorage from '../../js/modules/DataStorage';
import { QUESTION, TOTAL_RESULTS, ARTICLES, DISPLAYED_COUNT } from '../../js/constants/dataStorage';
import { getDisplayedCount } from '../../js/utils/countHelper';
import Button from '../../blocks/button/Button';
import NoResult from '../../blocks/no-result/NoResult';
import Loading from '../../blocks/loading/Loading';
import BadRequest from '../../blocks/bad-request/BadRequest';

const searchForm = document.querySelector('.form');
const cardsNode = document.querySelector('.cards');
const cardTemplate = document
  .getElementById('card-template')
  .content
  .querySelector('.card');
const cardsButtonNode = document.querySelector('.button_place_cards');
const noResultNode = document.querySelector('.no-result');
const loadingNode = document.querySelector('.loading');
const badRequestNode = document.querySelector('.bad-request');

const cards = new Cards(cardsNode, { showMoreNews });
cards.setHideModifitator('cards_hide');

const validator = new FormValidator(searchForm);
const newsApi = new NewsApi();
const dataStorage = new DataStorage();
const form = new Form(searchForm, { showNews });
const cardsButton = new Button(cardsButtonNode, { showMoreNews });

const noResult = new NoResult(noResultNode);
noResult.setHideModifitator('no-result_hide');

const loading = new Loading(loadingNode);
loading.setHideModifitator('loading_hide');

const badRequest = new BadRequest(badRequestNode);
badRequest.setHideModifitator('bad-request_hide');

async function showNews(event) {
  event.preventDefault();

  badRequest.hide();
  noResult.hide();
  cards.hide();
  cards.clear();
  loading.show();

  const question = form.getQuestion();
  await newsApi
    .getNews(question)
    .then(res => {
      loading.hide();
      console.log(res.articles.length);
      const { totalResults, articles } = res;
      dataStorage.save(QUESTION, question);
      dataStorage.save(TOTAL_RESULTS, totalResults);
      dataStorage.save(ARTICLES, articles);
      dataStorage.save(DISPLAYED_COUNT, getDisplayedCount(articles, 0));

      if (articles.length === 0){
        noResult.show();
        return;
      }

      const firstCards = res
        .articles
        .slice(0, 3)
        .map(ar => new Card(cardTemplate).create(ar));

      cards.render(firstCards);
      cards.show();
    })
    .catch(() => {
      loading.hide();
      badRequest.show();
    });
}

function showMoreNews() {
  console.log(dataStorage.load(DISPLAYED_COUNT));
  const currentCount = dataStorage.load(DISPLAYED_COUNT);
  const articles = dataStorage.load(ARTICLES);
  const newCount = getDisplayedCount(articles, currentCount);
  const newCards = articles
    .slice(currentCount, newCount)
    .map(ar => new Card(cardTemplate).create(ar));
  cards.render(newCards);
  dataStorage.save(DISPLAYED_COUNT, newCount);
  console.log(dataStorage.load(DISPLAYED_COUNT));
}
