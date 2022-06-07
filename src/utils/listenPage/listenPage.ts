import {
  createCar,
  updateCar,
  getCar,
  deleteCar,
  deleteWinner,
  getWinner,
  saveWinners,
  store,
  apdCars,
  apdWinners,
} from '../../components';
import { startDriving, stopDriving } from './animationStartStopRace';
import { getCarsView } from '../../view/garageView/index';
import { getWinners } from '../../view/winnersView';
import { listenSortCars } from '../listenSortCars/listenSortCars';
import { race, generateRandomCars } from './components';
import { buttonDisable } from '../../view/pageTemplate';

export async function listenPage() {
  const garage = document.getElementById('garage');
  if (!(garage instanceof HTMLElement)) {
    throw new Error('Error');
  }
  const winners = document.querySelector('.winners-view');
  if (!(winners instanceof HTMLElement)) {
    throw new Error('Error');
  }
  const updateName = document.getElementById('update-name');
  if (!(updateName instanceof HTMLInputElement)) {
    throw new Error('Error');
  }
  const updateColor = document.getElementById('update-color');
  if (!(updateColor instanceof HTMLInputElement)) {
    throw new Error('Error');
  }
  const updateButton = document.getElementById('update')?.querySelector(' .button');
  if (!(updateButton instanceof HTMLButtonElement)) {
    throw new Error('Error');
  }
  document.getElementById('update')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('Error');
    }
    const myUpdateCar = new Map();
    myUpdateCar.set(updateName.name, updateName.value);
    myUpdateCar.set(updateColor.name, updateColor.value);
    const car = Object.fromEntries(myUpdateCar);
    if (store.selectedCarID !== null) {
      await updateCar(car, store.selectedCarID);
      await apdCars();
      await apdWinners();
      winners.innerHTML = getWinners();
      garage.innerHTML = getCarsView();
    }
    updateName.disabled = true;
    updateName.value = '';
    updateColor.disabled = true;
    updateColor.value = '#ffffff';
    updateButton.disabled = true;
    store.selectedCarID = null;
  });
  document.getElementById('create')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('Error');
    }
    const targetName = e.target.querySelector('.input');
    if (!(targetName instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const targetColor = e.target.querySelector('.color');
    if (!(targetColor instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const myCreateCar = new Map();
    myCreateCar.set(targetName.name, targetName.value);
    myCreateCar.set(targetColor.name, targetColor.value);
    const car = Object.fromEntries(myCreateCar);
    await createCar(car);
    await apdCars();
    garage.innerHTML = getCarsView();
    targetName.value = '';
    targetColor.value = '#ffffff';
  });
  const generateButton = document.querySelector('.generator-button');
  if (!(generateButton instanceof HTMLButtonElement)) {
    throw new Error("generateButton isn't a button");
  }
  generateButton.addEventListener('click', async () => {
    generateButton.disabled = true;
    const cars = generateRandomCars();
    await Promise.all(cars.map(async (car) => createCar(car)));
    await apdCars();
    garage.innerHTML = getCarsView();
    generateButton.disabled = false;
    buttonDisable();
  });

  const raceButton = document.querySelector('.race-button');
  if (!(raceButton instanceof HTMLButtonElement)) {
    throw new Error("it's not a button");
  }
  const resetButton = document.querySelector('.reset-button');
  if (!(resetButton instanceof HTMLButtonElement)) {
    throw new Error("it's not a button");
  }
  raceButton.addEventListener('click', async () => {
    raceButton.disabled = true;
    const winner = await race(startDriving);
    if (winner === null) return (resetButton.disabled = false);
    const winnerMessage = document.getElementById('message-winner');
    if (!(winnerMessage instanceof HTMLElement)) {
      throw new Error("it's not a button");
    }
    resetButton.disabled = false;
    winnerMessage.innerHTML = `${winner.name} went first in ${winner.time} seconds!`;
    winnerMessage.classList.toggle('visible');
    await saveWinners(winner);
    await apdWinners();
    winners.innerHTML = getWinners();
    await listenSortCars();
  });
  resetButton.addEventListener('click', async () => {
    resetButton.disabled = true;
    store.cars.map(({ id }) => {
      stopDriving(id);
    });
    function enableButton() {
      if (!(raceButton instanceof HTMLButtonElement)) {
        throw new Error("it's not a button");
      }
      raceButton.disabled = false;
    }
    setTimeout(enableButton, 2000);
    const winnerMessage = document.getElementById('message-winner');
    if (!(winnerMessage instanceof HTMLElement)) {
      throw new Error("it's not a button");
    }
    winnerMessage.classList.toggle('visible');
  });

  document.getElementById('garage')?.addEventListener('click', async (e) => {
    if (e.target instanceof HTMLButtonElement) {
      if (e.target.classList.contains('select-button')) {
        const selectedCar = await getCar(+e.target.id.split('select-car-')[1]);
        store.selectedCarID = +e.target.id.split('select-car-')[1];
        updateName.value = selectedCar.name;
        updateColor.value = selectedCar.color;
        updateName.disabled = false;
        updateColor.disabled = false;
        updateButton.disabled = false;
      }
      if (e.target.classList.contains('remove-button')) {
        const id = +e.target.id.split('remove-car-')[1];
        await deleteCar(id);
        if (await getWinner(id)) {
          await deleteWinner(id);
          await apdWinners();
          winners.innerHTML = getWinners();
        }
        await apdCars();
        garage.innerHTML = getCarsView();
      }
      if (e.target.classList.contains('start-engine-button')) {
        const id = +e.target.id.split('start-engine-car-')[1];
        startDriving(id);
      }
      if (e.target.classList.contains('stop-engine-button')) {
        const id = +e.target.id.split('stop-engine-car-')[1];
        stopDriving(id);
      }
    }
  });
}
