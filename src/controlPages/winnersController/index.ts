import { store } from '../../store';
import { updateStateWinners } from '../../controlPages/index';

const setSortCars = async () => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  await updateStateWinners();
};

export const listenSortCars = async () => {
  const winsButton = document.querySelector('.table-wins');
  const timeButton = document.querySelector('.table-time');
  if (!(winsButton instanceof HTMLElement)) {
    throw new Error('Error');
  }
  if (!(timeButton instanceof HTMLElement)) {
    throw new Error('Error');
  }
  winsButton.onclick = async () => {
    store.sortBy = 'wins';
    await setSortCars();
  };
  timeButton.onclick = async () => {
    store.sortBy = 'time';
    await setSortCars();
  };
};
