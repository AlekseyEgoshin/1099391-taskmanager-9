import {createElement} from './utils';

export class Board {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
    return this._element;
  }

  getTemplate() {
    return `<section class="board container">
        <div class="board__tasks"></div>
      </section>
    `;
  }
}
