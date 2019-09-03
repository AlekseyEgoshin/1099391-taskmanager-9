import {getTask} from './components/data';
import {getFilters} from './components/data';

import {createFilter} from './components/filter';
import {createSearchLine} from './components/search-line';
import {createMenu} from './components/menu';
import {createSortingLine} from './components/sorting-line';

import {createTaskCard} from './components/task-card';
import {createTaskEditCard} from './components/edit-task-card';

import {createBoard} from './components/board';
import {createButton} from './components/button';

function renderCard(cb, count) {
  const taskListElement = mainElement.querySelector(`.board__tasks`);

  let func;
  switch (count) {
    case 1:
      func = createTaskEditCard;
      break;
    default:
      func = createTaskCard;
      break;
  }

  for (let i = 0; i < count; i++) {
    const checkedCard = cb();
    const all = document.querySelector(`.filter__all-count`);
    // const overdue = document.querySelector(`.filter__overdue-count`);
    const today = document.querySelector(`.filter__today-count`);
    const favorites = document.querySelector(`.filter__favorites-count`);
    const repeating = document.querySelector(`.filter__repeating-count`);
    const tags = document.querySelector(`.filter__tags-count`);
    const archive = document.querySelector(`.filter__archive-count`);

    // Обновляем значение фильтра all
    all.textContent = parseFloat(all.textContent) + 1;

    // Обновляем значение фильтра repeating
    if (checkedCard.isRepeating) {
      repeating.textContent = parseFloat(repeating.textContent) + 1;
    }

    // Обновляем значение фильтра favorites
    if (checkedCard.isArchive) {
      favorites.textContent = parseFloat(favorites.textContent) + 1;
    }

    // Обновляем значение фильтра archive
    if (checkedCard.isFavorite) {
      archive.textContent = parseFloat(archive.textContent) + 1;
    }

    // Обновляем значение фильтра tags
    // const tagsList = checkedCard.tags;
    if (checkedCard.tags) {
      tags.textContent = parseFloat(tags.textContent) + checkedCard.tags.length;
    }

    // Обновляем значение фильтра today
    const date = new Date().toDateString();
    const dateCard = new Date(checkedCard.dueDate).toDateString();
    if (date === dateCard) {
      today.textContent = parseFloat(today.textContent) + 1;
    }

    renderTasks(taskListElement, checkedCard, func, i);
  }
}

const Card = {
  EDIT: 1,
  DEFAULT: 7,
  EXTRA: 8,
};

const mainElement = document.querySelector(`.main`);
const mainHeaderElement = mainElement.querySelector(`.main__control`);

const render = (container, template) => container.insertAdjacentHTML(`beforeend`, template);

const renderTasks = (container, data, func) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(() => data)
    .map(func)
    .join(``));
};

render(mainHeaderElement, createMenu());
render(mainElement, createSearchLine());
render(mainElement, createFilter(getFilters()));
render(mainElement, createBoard());

const boardElement = mainElement.querySelector(`.board`);

render(boardElement, createSortingLine());

renderCard(getTask, Card.EDIT);
renderCard(getTask, Card.DEFAULT);

render(boardElement, createButton());

const loadButton = document.querySelector(`.load-more`);
loadButton.addEventListener(`click`, function () {
  renderCard(getTask, Card.EXTRA);
  loadButton.classList.add(`visually-hidden`);
});
