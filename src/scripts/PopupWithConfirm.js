import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        console.log(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setHandleSubmit(func) {
        this._handleSubmit = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
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
