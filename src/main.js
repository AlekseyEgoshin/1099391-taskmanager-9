const CARD_COUNT = 3;

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

import {createFilter} from './components/filter';
import {createSearchLine} from './components/search-line';
import {createMenu} from './components/menu';
import {createSortingLine} from './components/sorting-line';

import {createTaskCard} from './components/task-card';
import {createTaskEditCard} from './components/edit-task-card';

import {createBoard} from './components/board';
import {createButton} from './components/button';

const mainElement = document.querySelector(`.main`);
const mainHeaderElement = mainElement.querySelector(`.main__control`);

render(mainHeaderElement, createMenu(), `beforeend`);
render(mainElement, createSearchLine(), `beforeend`);
render(mainElement, createFilter(), `beforeend`);
render(mainElement, createBoard(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = mainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingLine(), `afterbegin`);
render(taskListElement, createTaskEditCard(), `beforeend`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(taskListElement, createTaskCard(), `beforeend`);
}

render(boardElement, createButton(), `beforeend`);
