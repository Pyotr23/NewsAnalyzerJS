import './index.css';
import FormValidator from '../../ts/modules/FormValidator';
import NewsApi from '../../ts/modules/api/NewsApi';
import Form from '../../blocks/form/Form';
import Card from '../../blocks/card/Card';
import DataStorage from '../../ts/modules/DataStorage';
import { QUESTION, TOTAL_RESULTS, ARTICLES, DISPLAYED_COUNT } from '../../ts/constants/dataStorage';
import { getDisplayedCount } from '../../ts/utils/calculator';
import NoResult from '../../blocks/no-result/NoResult';
import Loading from '../../blocks/loading/Loading';
import BadRequest from '../../blocks/bad-request/BadRequest';
import { SHOWED_NEWS_PACK_SIZE } from '../../ts/constants/news';
import HidesButton from '../../blocks/button/HidesButton';
import HidesContainer from '../../ts/components/HidesContainer';
import { Article, NewsResponse } from '../../ts/types';

const searchForm = <HTMLFormElement>document.querySelector('.form');
const cardsNode = <HTMLElement>document.querySelector('.cards');
const cardsContainer = <HTMLElement>cardsNode.querySelector('.cards__list');

const cardTemplateElement = <HTMLTemplateElement>document.querySelector('#card-template');
const cardTemplate = <HTMLTemplateElement>cardTemplateElement.content.querySelector('.card');

const cardsButtonNode = <HTMLElement>document.querySelector('.button_place_cards');
const noResultNode = <HTMLElement>document.querySelector('.no-result');
const loadingNode = <HTMLElement>document.querySelector('.loading');
const badRequestNode = <HTMLElement>document.querySelector('.bad-request');

const newsApi = new NewsApi();
const dataStorage = new DataStorage();
const form = new Form(searchForm, showNews);
const cardsButton = new HidesButton(cardsButtonNode, showMoreNews, 'button_hide');
const cardList = new HidesContainer(cardsContainer, cardsNode, 'cards_hide');
const noResult = new NoResult(noResultNode, 'no-result_hide');
const loading = new Loading(loadingNode, 'loading_hide');
const badRequest = new BadRequest(badRequestNode, 'bad-request_hide');

function prepareDomBeforeResponse(): void {
  badRequest.hide();
  noResult.hide();
  cardList.hide();
  cardList.clear();
  loading.show();
  form.disableForm();
}

function saveInStorage(question: string, res: NewsResponse, count: number): void {
  const { totalResults, articles } = res;
  dataStorage.save(QUESTION, question);
  dataStorage.save(TOTAL_RESULTS, totalResults);
  dataStorage.save(ARTICLES, articles);
  dataStorage.save(DISPLAYED_COUNT, count);
}

function processGoodResponse (question: string, res: NewsResponse) {
  loading.hide();
  form.enableForm();
  const { articles } = res;
  if (articles.length === 0){
    noResult.show();
    return;
  }
  const displayedCount = getDisplayedCount(articles.length, 0);
  saveInStorage(question, res, displayedCount);

  if (displayedCount === articles.length)
    cardsButton.hide();
  else
    cardsButton.show();

  const firstCards = res
    .articles
    .slice(0, SHOWED_NEWS_PACK_SIZE)
    .map(ar => new Card(cardTemplate).create(ar));
  cardList.render(firstCards);
  cardList.show();
}

async function showNews(event: Event) {
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

function showMoreNews(): void {
  const currentCount: number = dataStorage.load(DISPLAYED_COUNT);
  const articles: Article[] = dataStorage.load(ARTICLES);
  const newCount = getDisplayedCount(articles.length, currentCount);
  const newCards = articles
    .slice(currentCount, newCount)
    .map(ar => new Card(cardTemplate).create(ar));
  cardList.render(newCards);
  dataStorage.save(DISPLAYED_COUNT, newCount);
}

function init(): void {
  const count = <number>dataStorage.load(DISPLAYED_COUNT);
  const news = <Article[]>dataStorage.load(ARTICLES);
  const showedNews = news.slice(0, count);
  const showedCards = showedNews
    .map(n => new Card(cardTemplate).create(n));
  cardList.render(showedCards);

  if (count === news.length)
    cardsButton.hide();
  else
    cardsButton.show();

  cardList.show();

  const savedQuestion = dataStorage.load(QUESTION);
  form.setQuestion(savedQuestion);
  const validator = new FormValidator(searchForm);
}

init();
