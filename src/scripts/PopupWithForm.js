import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  _submitHandler;
  _form;
  _inputList;

  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__user-input'));
  }

  _getInputValues() {
    console.log(this._inputList);
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}