import { VALIDATION_ERROR_MESSAGES } from '../constants/validation';

export default class FormValidator{
  #form;
  #submitButton;
  #errorMessages;

  constructor(form){
    this.#form = form;
    this.#form.addEventListener('input', (event) => this.#handleInput(event))
    this.#form.addEventListener('submit', (event) => this.#handleInput(event))
    this.#submitButton = this.#form.querySelector('[type="submit"]');
    this.#errorMessages = VALIDATION_ERROR_MESSAGES;
  }

  #setSubmitButtonState = () => {
    if (this.#checkInputsValidity())
      this.#submitButton.removeAttribute('disabled');
    else
      this.#submitButton.setAttribute('disabled', '');
  }

  #checkInputsValidity = () => {
    const [...inputs] = this.#form.elements;
    return inputs.every(this.#isValidate);
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
    debugger;
    this.#setErrorContent(event.target);
    this.#setSubmitButtonState();
  }

  #setErrorContent = (input) => {
    this.#isValidate(input);
    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }
}
