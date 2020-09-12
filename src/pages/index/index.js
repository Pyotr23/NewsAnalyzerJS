import './index.css';
import FormValidator from '../../js/modules/FormValidator';
import NewsApi from '../../js/modules/api/NewsApi';
import Form from '../../blocks/form/Form';
import Card from '../../blocks/card/Card';
import DataStorage from '../../js/modules/DataStorage';
import { QUESTION, TOTAL_RESULTS, ARTICLES, DISPLAYED_COUNT } from '../../js/constants/dataStorage';
import { getDisplayedCount } from '../../js/utils/calculator';
import Button from '../../blocks/button/Button';
import NoResult from '../../blocks/no-result/NoResult';
import Loading from '../../blocks/loading/Loading';
import BadRequest from '../../blocks/bad-request/BadRequest';
import { SHOWED_NEWS_PACK_SIZE } from '../../js/constants/news';
import Container from '../../js/components/Container';

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

const newsApi = new NewsApi();
const dataStorage = new DataStorage();
const form = new Form(searchForm);
form.addSubmitHandler(showNews);
const cardsButton = new Button(cardsButtonNode);
cardsButton.addClickHandler(showMoreNews);

const cardList = new Container('.cards__list', cardsNode, { showMoreNews });
cardList.setHideModifitator('cards_hide');

const noResult = new NoResult(noResultNode);
noResult.setHideModifitator('no-result_hide');

const loading = new Loading(loadingNode);
loading.setHideModifitator('loading_hide');

const badRequest = new BadRequest(badRequestNode);
badRequest.setHideModifitator('bad-request_hide');

function prepareDomBeforeResponse() {
  badRequest.hide();
  noResult.hide();
  cardList.hide();
  cardList.clear();
  loading.show();
  form.disableForm();
}

function saveInStorage(question, res) {
  const { totalResults, articles } = res;
  dataStorage.save(QUESTION, question);
  dataStorage.save(TOTAL_RESULTS, totalResults);
  dataStorage.save(ARTICLES, articles);
  dataStorage.save(DISPLAYED_COUNT, getDisplayedCount(articles, 0));
}

function processGoodResponse (question, res) {
  loading.hide();
  form.enableForm();
  const { articles } = res;
  if (articles.length === 0){
    noResult.show();
    return;
  }
  saveInStorage(question, res);
  const firstCards = res
    .articles
    .slice(0, SHOWED_NEWS_PACK_SIZE)
    .map(ar => new Card(cardTemplate).create(ar));
  cardList.render(firstCards);
  cardList.show();
}

async function showNews(event) {
  event.preventDefault();
  prepareDomBeforeResponse();
  const question = form.getQuestion();
  await newsApi
    .getNews(question)
    .then(res => processGoodResponse(question, res))
    .catch(() => {
      loading.hide();
      badRequest.show();
    });
}

function showMoreNews() {
  const currentCount = dataStorage.load(DISPLAYED_COUNT);
  const articles = dataStorage.load(ARTICLES);
  const newCount = getDisplayedCount(articles, currentCount);
  const newCards = articles
    .slice(currentCount, newCount)
    .map(ar => new Card(cardTemplate).create(ar));
  cardList.render(newCards);
  dataStorage.save(DISPLAYED_COUNT, newCount);
}

function init(){
  const count = dataStorage.load(DISPLAYED_COUNT);
  const showedNews = dataStorage.load(ARTICLES).slice(0, count);
  const showedCards = showedNews
    .map(n => new Card(cardTemplate).create(n));
  cardList.render(showedCards);
  cardList.show();

  const savedQuestion = dataStorage.load(QUESTION);
  form.setQuestion(savedQuestion);
  const validator = new FormValidator(searchForm);
}

init();
