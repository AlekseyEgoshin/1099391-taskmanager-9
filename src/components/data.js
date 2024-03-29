export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: createTags(),
  repeatingDays: {
    'su': Boolean(Math.round(Math.random())),
    'mo': Boolean(Math.round(Math.random())),
    'tu': Boolean(Math.round(Math.random())),
    'we': Boolean(Math.round(Math.random())),
    'th': Boolean(Math.round(Math.random())),
    'fr': Boolean(Math.round(Math.random())),
    'sa': Boolean(Math.round(Math.random())),
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const getFilters = () => (
  [
    {
      title: `all`,
      count: 0,
    },
    {
      title: `overdue`,
      count: 0,
    },
    {
      title: `today`,
      count: 0,
    },
    {
      title: `favorites`,
      count: 0,
    },
    {
      title: `repeating`,
      count: 0,
    },
    {
      title: `tags`,
      count: 0,
    },
    {
      title: `archive`,
      count: 0,
    },
  ]
);

const String = {
  MAX: 3,
  MIN: 0,
};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const createTags = () => {
  const tags = [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ];

  const count = Math.floor(getRandomArbitrary(String.MIN, String.MAX));
  const currentTags = new Set();

  for (let i = 0; i < count; i++) {
    currentTags.add(tags[Math.floor(Math.random() * tags.length)]);
  }

  return currentTags;
};
