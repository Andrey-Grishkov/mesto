
export class CardForm {
    _container;
    _submit;
    constructor(selector, submit) {
        this._container = document.querySelector(selector);
        this._submit = submit;
    }

    _submitHandler = (e) => {
        e.preventDefault();
        const input = this._container.querySelector('.popup__user-input_input_card-image');
        this._submit(input.value);
        input.value='';
    }
    init() {
        this._container.addEventListener('submit', this._submitHandler)
    }
}