import { getCarsView } from '../../../garageView/index';
import { getWinners } from '../../../winnersView';
import { apdCars, apdWinners, store } from '../../../../components';
import { buttonDisable } from '../../components';
import { listenSortCars } from '../../../../utils/listenSortCars/listenSortCars';

export async function listen() {
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  if (!(prevButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (!(nextButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  const garage = document.getElementById('garage');
  if (!(garage instanceof HTMLElement)) {
    throw new Error('Error');
  }
  const winners = document.querySelector('.winners-view');
  if (!(winners instanceof HTMLElement)) {
    throw new Error('Error');
  }
  const garageView = document.querySelector('.garage-view');
  if (!(garageView instanceof HTMLElement)) {
    throw new Error('Error');
  }
  const winnersView = document.querySelector('.winners-view');
  if (!(winnersView instanceof HTMLElement)) {
    throw new Error('Error');
  }

  const garageMenuButton = document.querySelector('.garage-menu-button');
  garageMenuButton?.addEventListener('click', async () => {
    garageView.style.display = 'block';
    winnersView.style.display = 'none';
    store.view = 'garagePage';
    buttonDisable();
  });
  const winnersMenuButton = document.querySelector('.winners-menu-button');
  winnersMenuButton?.addEventListener('click', async () => {
    garageView.style.display = 'none';
    winnersView.style.display = 'block';
    store.view = 'winnersPage';
    await listenSortCars();
    buttonDisable();
  });
  prevButton?.addEventListener('click', async () => {
    switch (store.view) {
      case 'garagePage': {
        store.carsPage -= 1;
        await apdCars();
        garage.innerHTML = getCarsView();
        break;
      }
      case 'winnersPage': {
        store.winnersPage -= 1;
        await apdWinners();
        winners.innerHTML = getWinners();
        break;
      }
    }
    buttonDisable();
    await listenSortCars();
  });
  nextButton?.addEventListener('click', async () => {
    switch (store.view) {
      case 'garagePage': {
        store.carsPage += 1;
        await apdCars();
        garage.innerHTML = getCarsView();
        break;
      }
      case 'winnersPage': {
        store.winnersPage += 1;
        await apdWinners();
        winners.innerHTML = getWinners();
        break;
      }
    }
    buttonDisable();
  });
}
