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
import { Article, DayCountRow } from '../../ts/types';

const digitsNode = <HTMLElement>document.querySelector('.digits');
const dailyNode = <HTMLElement>document.querySelector('.daily');
const tableNode = <HTMLElement>document.querySelector('.table');
const tableRowTemplate = <HTMLElement>document.querySelector('#table-row-template').querySelector('.table-row');
const tableContainer = <HTMLElement>tableNode.querySelector('.table__container');

const digits = new Digits(digitsNode);
const dataStorage = new DataStorage();
const daily = new Daily(dailyNode);
const table = new Container(tableContainer, tableNode);

function init(): void {
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

function getRows(): DayCountRow[] {
  const rows = new Array<DayCountRow>();
  for (let i = DAYS_AGO_COUNT; i >= 0; i--){
    const dateTime = new Date();
    dateTime.setDate(dateTime.getDate() - i);
    const dayNumber = dateTime.getDate();
    const day = `${dayNumber}, ${RUSSIAN_DAY_OF_WEEK_NAMES[dateTime.getDay()]}`;
    rows.push({ dayNumber, day, count: 0, percent: 0 });
  }
  return rows;
}

function fillCount(articles: Article[], rows: DayCountRow[], word: string){
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

function fillPercent(rows: DayCountRow[]): void {
  const allMatchesCount = rows.reduce((sum, row) => sum + row.count, 0);
  rows.forEach(row => row.percent = 100 - 100 / allMatchesCount * row.count);
}

init();
