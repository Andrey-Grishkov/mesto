export class Popup {
    constructor(popupSelector) {
        this._popup=document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add('popup_is-opened');
        this.setEventListeners();
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove('popup_is-opened');
    }

    _handleEscClose(evt) {

        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)});
    }
}