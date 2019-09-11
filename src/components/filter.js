import {createElement} from './utils';

export class Filter {
  constructor(filters) {
    this._filters = filters;
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
    return `<section class="main__filter filter container">
        ${Array.from(this._filters).map((filter) => `
          <input
            type="radio"
            id="filter__${filter.title}"
            class="filter__input visually-hidden"
            name="filter"
            checked
          />
          <label for="filter__${filter.title}" class="filter__label">${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label>
        `).join(``)}
      </section>
    `;
  }
}
