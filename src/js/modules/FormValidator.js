import { VALIDATION_ERROR_MESSAGES } from '../constants/validation';

export default class FormValidator{
  #form;
  #submitButton;
  #errorMessages;
  #elements;

  constructor(form){
    this.#form = form;
    [...this.#elements] = this.#getNotSubmitInputs();
    this.#form.addEventListener('input', (event) => this.#handleInput(event));
    this.#submitButton = this.#form.querySelector('[type="submit"]');
    this.#errorMessages = VALIDATION_ERROR_MESSAGES;
    this.#setSubmitButtonState();
  }

  #getNotSubmitInputs = () => {
    const [...inputs] = this.#form.elements;
    return inputs.filter(input => input.type !== 'submit');
  }

  #setSubmitButtonState = () => {
    if (this.#checkInputsValidity())
      this.#submitButton.removeAttribute('disabled');
    else
      this.#submitButton.setAttribute('disabled', '');
  }

  #checkInputsValidity = () => {
    return this.#elements.every(this.#isValidate);
  }

  #isValidate = (input) => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.#errorMessages.valueMissing);
      return false;
    }
    return input.checkValidity();
  }

  #handleInput = (event) => {
    this.#setErrorContent(event.target);
    this.#setSubmitButtonState();
  }

  #setErrorContent = (input) => {
    this.#isValidate(input);
    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }
}
