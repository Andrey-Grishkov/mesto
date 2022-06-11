import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, imageBigSize, imageBigSizeTitle) {
        super(popupSelector);
        this._imageBigSize=imageBigSize;
        this._imageBigSizeTitle=imageBigSizeTitle;
    }

    openPopupWithImage (name, link) {
        this._imageBigSize.src = link;
        this._imageBigSize.alt = name;
        this._imageBigSizeTitle.textContent = name;
        super.open();
    }

}