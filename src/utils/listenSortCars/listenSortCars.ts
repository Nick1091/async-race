import { getWinners } from '../../view/winnersView';
import { apdWinners, store } from '../../components';

const setSortCars = () => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
};

export const listenSortCars = async () => {
  const winsButton = document.querySelector('.table-wins');
  const timeButton = document.querySelector('.table-time');
  const winners = document.querySelector('.winners-view');
  if (!(winners instanceof HTMLElement)) {
    throw new Error('Error');
  }
  if (!(winsButton instanceof HTMLElement)) {
    throw new Error('Error');
  }
  if (!(timeButton instanceof HTMLElement)) {
    throw new Error('Error');
  }
  winsButton.onclick = async () => {
    store.sortBy = 'wins';
    setSortCars();
    await apdWinners();
    winners.innerHTML = getWinners();
    await listenSortCars();
  };
  timeButton.onclick = async () => {
    store.sortBy = 'time';
    setSortCars();
    await apdWinners();
    winners.innerHTML = getWinners();
    await listenSortCars();
  };
};
