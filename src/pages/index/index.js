import './index.css';
import FormValidator from '../../js/modules/FormValidator';

const form = document.querySelector('.form');
console.log(document.forms[0].elements);
const validator = new FormValidator(form);

