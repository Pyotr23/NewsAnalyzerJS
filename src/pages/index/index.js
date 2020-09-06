import './index.css';
import FormValidator from '../../js/modules/FormValidator';
import NewsApi from '../../js/modules/api/NewsApi';
import Form from '../../blocks/form/Form';

const searchForm = document.querySelector('.form');
const validator = new FormValidator(searchForm);
const newsApi = new NewsApi();

const form = new Form(searchForm, { showNews });
form.addSubmitHandler();

function showNews(event) {
  event.preventDefault();
  return newsApi
    .getNews(form.getQuestion())
    .then(res => console.log(res));
}

