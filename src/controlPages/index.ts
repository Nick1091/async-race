import { getCars, getWinners } from '../api';
import { store } from '../store';
import { renderGaragePage } from '../view/garageView/index';
import { renderWinnersPage } from '../view/winnersView/index';
import { listenSortCars } from './winnersController/index';

export const updateStateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
  await renderGaragePage();
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  if (!(prevButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (!(nextButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (store.carsPage * 7 < store.carsCount) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
  if (store.carsPage > 1) {
    prevButton.disabled = false;
  } else {
    prevButton.disabled = true;
  }
  prevButton.addEventListener('click', async () => {
    store.carsPage -= 1;
    await updateStateGarage();
  });
  nextButton.addEventListener('click', async () => {
    store.carsPage += 1;
    await updateStateGarage();
  });
};

export const updateStateWinners = async () => {
  const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
  store.winners = items;
  store.winnersCount = count;
  await renderWinnersPage();
  await listenSortCars();
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  if (!(prevButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (!(nextButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (store.winnersPage * 10 < store.winnersCount) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
  if (store.winnersPage > 1) {
    prevButton.disabled = false;
  } else {
    prevButton.disabled = true;
  }
  prevButton.addEventListener('click', async () => {
    store.winnersPage -= 1;
    await updateStateWinners();
  });
  nextButton.addEventListener('click', async () => {
    store.winnersPage += 1;
    await updateStateWinners();
  });
};
