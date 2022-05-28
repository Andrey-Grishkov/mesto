import { config } from './index.js';

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
    this._buttonSubmitSelector=config.submitButtonSelector;
    this._inactiveButtonClass=config.inactiveButtonClass;
    this._formElement = formElement;
    this._inputError = Array.from(this._formElement.querySelectorAll('popup__error'));
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._buttonSubmitSelector);
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
    this._buttonSubmit.disabled = !this._formElement.checkValidity();
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  }

  _toggleActiveBtnSubmit() {
    this._buttonSubmit.disabled = !this._formElement.checkValidity();
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._formElement.checkValidity());
  }
}