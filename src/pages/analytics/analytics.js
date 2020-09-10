import './analytics.css';
import Digits from '../../blocks/digits/Digits';
import DataStorage from '../../js/modules/DataStorage';
import { QUESTION, ARTICLES } from '../../js/constants/dataStorage';
import { getCountInTitle } from '../../js/utils/calculator';
import Daily from '../../blocks/daily/Daily';
import Table from '../../blocks/table/Table';
import TableRow from '../../blocks/table-row/TableRow';

const digitsNode = document.querySelector('.digits');
const dailyNode = document.querySelector('.daily');
const tableNode = document.querySelector('.table');
const tableRowTemplate = document
  .getElementById('table-row-template')
  .content
  .querySelector('.table-row');

const digits = new Digits(digitsNode);
const dataStorage = new DataStorage();
const daily = new Daily(dailyNode);
const table = new Table(tableNode);

function init(){
  const title = dataStorage.load(QUESTION);
  const articles = dataStorage.load(ARTICLES);

  const countInTitle = getCountInTitle (articles, title);
  digits.setData(title, articles.length, countInTitle);

  daily.setMonth(articles);

  table.render( [ new TableRow(tableRowTemplate).create('hy', 'wor', 50)]);
}

init();
