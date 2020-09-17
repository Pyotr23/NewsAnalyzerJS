import { VALIDATION_ERROR_MESSAGES } from '../constants/validation';

export default class FormValidator{
  private form: HTMLFormElement;
  private submitButton: HTMLFormElement;
  private elements: HTMLElement[];

  constructor(form: HTMLFormElement){
    this.form = form;
    [...this.elements] = this.getNotSubmitInputs();
    this.form.addEventListener('input', (event: InputEvent) => this.handleInput(event));
    this.submitButton = this.form.querySelector('[type="submit"]');
    this.setSubmitButtonState();
  }

  private getNotSubmitInputs = (): HTMLFormElement[] => {
    const inputs = <HTMLFormElement[]>Array.from(this.form.elements);
    return inputs.filter(input => input.type !== 'submit');
  }

  private setSubmitButtonState = () => {
    if (this.checkInputsValidity())
      this.submitButton.removeAttribute('disabled');
    else
      this.submitButton.setAttribute('disabled', '');
  }

  private checkInputsValidity = (): boolean => {
    return this.elements.every(this.isValidate);
  }

  private isValidate = (input: HTMLInputElement): boolean => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(VALIDATION_ERROR_MESSAGES.valueMissing);
      return false;
    }
    return input.checkValidity();
  }

  private handleInput = (event: InputEvent): void  => {
    this.setErrorContent(<HTMLInputElement>event.target);
    this.setSubmitButtonState();
  }

  private setErrorContent = (input: HTMLInputElement): void => {
    this.isValidate(input);
    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }
}
