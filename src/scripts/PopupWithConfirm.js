import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup {
  _button;

  constructor(popupSelector) {
    super(popupSelector);
      this._button = this._popup.querySelector('.popup__delete-card-submit');
  }

  setHandleSubmit(func) {
    this._handleSubmit = func;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.handleSubmitText('Удаление...');
      this._handleSubmit();
      this.close();
    });
  }

  open() {
    super.open();
    this.handleSubmitText('Да');
  }

  close() {
    super.close();
  }
}
