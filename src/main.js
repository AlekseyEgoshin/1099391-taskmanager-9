import {getTask} from './components/data';
import {getFilters} from './components/data';

import {Filter} from './components/filter';
import {SearchLine} from './components/search-line';
import {Menu} from './components/menu';
import {SortingLine} from './components/sorting-line';

import {TaskCard} from './components/task-card';
import {TaskEditCard} from './components/edit-task-card';

import {Board} from './components/board';
import {Button} from './components/button';

import {render} from './components/utils';

const onMouseClick = () => {
  const taskCards = document.querySelectorAll(`.card`);
  taskCards.forEach(function (singleCard) {
    if (singleCard.classList.contains(`visually-hidden`)) {
      singleCard.classList.remove(`visually-hidden`);
    }
  });
  loadButton.classList.add(`visually-hidden`);
};

const renderCard = (taskMock, count) => {
  const task = new TaskCard(taskMock);
  const taskEdit = new TaskEditCard(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      taskListElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskListElement = mainElement.querySelector(`.board__tasks`);

  const all = document.querySelector(`.filter__all-count`);
  const today = document.querySelector(`.filter__today-count`);
  const favorites = document.querySelector(`.filter__favorites-count`);
  const repeating = document.querySelector(`.filter__repeating-count`);
  const tags = document.querySelector(`.filter__tags-count`);
  const archive = document.querySelector(`.filter__archive-count`);

  // Обновляем значение фильтра all
  all.textContent = parseFloat(all.textContent) + 1;

  // Обновляем значение фильтра repeating
  if (taskMock.isRepeating) {
    repeating.textContent = parseFloat(repeating.textContent) + 1;
  }

  // Обновляем значение фильтра favorites
  if (taskMock.isArchive) {
    favorites.textContent = parseFloat(favorites.textContent) + 1;
  }

  // Обновляем значение фильтра archive
  if (taskMock.isFavorite) {
    archive.textContent = parseFloat(archive.textContent) + 1;
  }

  // Обновляем значение фильтра tags
  if (taskMock.tags) {
    tags.textContent = parseFloat(tags.textContent) + taskMock.tags.size;
  }

  // Обновляем значение фильтра today
  const date = new Date().toDateString();
  const dateCard = new Date(taskMock.dueDate).toDateString();
  if (date === dateCard) {
    today.textContent = parseFloat(today.textContent) + 1;
  }

  // Event listener to change card to edit-card
  task.getElement().
    querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      taskListElement.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      taskListElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(taskListElement, task.getElement(), Position.BEFOREEND);

  if (count >= (Card.DEFAULT - 1) / 2) {
    const lastAddedTaskCard = taskListElement.lastElementChild;
    lastAddedTaskCard.classList.add(`visually-hidden`);
  }
};

const Card = {
  DEFAULT: 16,
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const mainElement = document.querySelector(`.main`);
const mainHeaderElement = mainElement.querySelector(`.main__control`);

// Отрисовка меню
render(mainHeaderElement, new Menu().getElement(), Position.BEFOREEND);
render(mainElement, new SearchLine().getElement(), Position.BEFOREEND);
render(mainElement, new Filter(getFilters()).getElement(), Position.BEFOREEND);
render(mainElement, new Board().getElement(), Position.BEFOREEND);

const boardElement = mainElement.querySelector(`.board`);

render(boardElement, new SortingLine().getElement(), Position.AFTERBEGIN);

// Отрисовка карточек
const taskMocks = new Array(Card.DEFAULT)
  .fill(``)
  .map(getTask);
let i = 0;
taskMocks.forEach((taskMock) => renderCard(taskMock, i++));

render(boardElement, new Button().getElement(), Position.BEFOREEND);

const loadButton = document.querySelector(`.load-more`);
loadButton.addEventListener(`click`, onMouseClick);
