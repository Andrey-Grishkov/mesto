import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;

    }

    _getInputValues() {


    };

    setEventListeners() {
        super.setEventListeners();


    };

    close() {
        super.close();

    }

}