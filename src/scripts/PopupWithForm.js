import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  _submitHandler;
  _form;
  _inputList;

  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__user-input');
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListenersPopupWithForm() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this.getInputValues());
      this.handleSubmitText('Сохранение...');
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}