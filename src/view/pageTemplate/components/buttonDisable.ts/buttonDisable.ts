import { store } from '../../../../components';
export const buttonDisable = async () => {
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  if (!(prevButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (!(nextButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  if (store.view === 'garagePage') {
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
  } else {
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
  }
};
