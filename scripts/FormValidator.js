export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__user-input',
  inputErrorClass: 'popup__user-input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_disabled'
}

export class FormValidator {
  _inputSelector;
  _inputErrorClass;
  _errorClass;
  _buttonSubmit;
  _inactiveButtonClass;
  _formElement;
  _inputError;
  _formInputs;

  constructor(config, formElement) {
    this._inputSelector=config.inputSelector;
    this._inputErrorClass=config.inputErrorClass;
    this._errorClass=config.errorClass;
    this._buttonSubmit=config.submitButtonSelector;
    this._inactiveButtonClass=config.inactiveButtonClass;
    this._formElement = formElement;
    this._inputError = Array.from(this._formElement.querySelectorAll('popup__error'));
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleActiveBtnSubmit();
  }

  _setEventListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener('input', (event) => this._handleFormInput(input));
    });
  }

  _handleFormInput(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      errorNode.textContent="";
      input.classList.remove(this._inputErrorClass);
      this._toggleActiveBtnSubmit();
    } else {
      errorNode.textContent=input.validationMessage;
      errorNode.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
      this._toggleActiveBtnSubmit();
    }
  }

  deleteErrorAndInputs() {
    this._formInputs.forEach((input) => {
      const errorNode = document.querySelector(`#${input.id}-error`);
      errorNode.textContent = '';
      input.classList.remove(this._inputErrorClass);
      input.value="";
    });
  }

  submitButtonDisabled() {
    const buttonSubmit = this._formElement.querySelector(this._buttonSubmit);
    buttonSubmit.disabled = !this._formElement.checkValidity();
    buttonSubmit.classList.add("popup__button-submit_type_disabled");
  }

  _toggleActiveBtnSubmit() {
    const buttonSubmit = this._formElement.querySelector(this._buttonSubmit);
    buttonSubmit.disabled = !this._formElement.checkValidity();
    buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
  }
}