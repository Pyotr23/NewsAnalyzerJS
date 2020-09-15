import './analytics.css';
import Digits from '../../blocks/digits/Digits';
import DataStorage from '../../ts/modules/DataStorage';
import { QUESTION, ARTICLES } from '../../ts/constants/dataStorage';
import { getCountInTitle, getMatchesInArticle } from '../../ts/utils/calculator';
import Daily from '../../blocks/daily/Daily';
import TableRow from '../../blocks/table-row/TableRow';
import Container from '../../ts/components/Container';
import { RUSSIAN_DAY_OF_WEEK_NAMES } from '../../ts/constants/dateTime';
import { DAYS_AGO_COUNT } from '../../ts/constants/newsApi';

const digitsNode = document.querySelector('.digits');
const dailyNode = document.querySelector('.daily');
const tableNode = document.querySelector('.table');
const tableRowTemplate = document
  .querySelector('#table-row-template')
  .content
  .querySelector('.table-row');

const digits = new Digits(digitsNode);
const dataStorage = new DataStorage();
const daily = new Daily(dailyNode);
const table = new Container('.table__container', tableNode);

function init(){
  const title = dataStorage.load(QUESTION);
  const articles = dataStorage.load(ARTICLES);
  const countInTitle = getCountInTitle (articles, title);
  digits.setData(title, articles.length, countInTitle);
  daily.setMonth(articles);
  const rows = getRows();
  fillCount(articles, rows, title);
  fillPercent(rows);
  table.render(rows.map((row, index) => {
    const tableRow = new TableRow(tableRowTemplate);
    if (index === DAYS_AGO_COUNT)
      tableRow.setLastRowModificator();
    return tableRow.create(row);
  } ));
}

function getRows() {
  const rows = [];
  for (let i = DAYS_AGO_COUNT; i >= 0; i--){
    const dateTime = new Date();
    dateTime.setDate(dateTime.getDate() - i);
    const dayNumber = dateTime.getDate();
    const day = `${dayNumber}, ${RUSSIAN_DAY_OF_WEEK_NAMES[dateTime.getDay()]}`;
    rows.push({ dayNumber, day, count: 0, percent: 0 });
  }
  return rows;
}

function fillCount(articles, rows, word){
  for (let i = 0, j = rows.length - 1; i < articles.length; ){
    const article = articles[i];
    if (new Date(article.publishedAt).getDate() === rows[j].dayNumber){
      rows[j].count += getMatchesInArticle(article, word)
      i++;
    }
    else
      j--;
  }
}

function fillPercent(rows) {
  const allMatchesCount = rows.reduce((sum, row) => sum + row.count, 0);
  rows.forEach(row => {
    const percent = 100 - 100 / allMatchesCount * row.count;
    row.percent = percent.toFixed(1);
  } );
}

init();
