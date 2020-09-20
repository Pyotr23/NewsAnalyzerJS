import { VALIDATION_ERROR_MESSAGES } from '../constants/validation';

export default class FormValidator{
  private form: HTMLFormElement;
  private submitButton: HTMLFormElement;
  private elements: HTMLElement[];

  constructor(form: HTMLFormElement){
    this.form = form;
    [...this.elements] = this.getNotSubmitInputs();
    this.form.addEventListener('input', (event: Event) => this.handleInput(event));
    this.submitButton = <HTMLFormElement>this.form.querySelector('[type="submit"]');
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

  private isValidate = (inp: HTMLElement, index?: number, array?: HTMLElement[]) => {
    const input = <HTMLInputElement>inp;
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(VALIDATION_ERROR_MESSAGES.valueMissing);
      return false;
    }
    return input.checkValidity();
  }

  private handleInput = (event: Event): void  => {
    this.setErrorContent(<HTMLInputElement>event.target);
    this.setSubmitButtonState();
  }

  private setErrorContent = (input: HTMLInputElement): void => {
    this.isValidate(input);
    const errorElement = <HTMLDivElement>input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
  }
}
