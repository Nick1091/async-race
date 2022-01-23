import { store } from '../../store';
import { createCar, updateCar, getCar, deleteCar, deleteWinner, getWinner, saveWinners } from '../../api';
import { updateStateGarage } from '../index';
import { generateRandomCars } from './generateCars/index';
import { startDriving, stopDriving, race } from './startStopEngine/index';

export async function listen() {
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
      await updateStateGarage();
    }
    updateName.disabled = true;
    updateColor.disabled = true;
    updateButton.disabled = true;
    store.selectedCarID = null;
  });
  document.getElementById('create')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('Error');
    }
    console.log(e.target);
    const targetName = e.target.querySelector('input');
    if (!(targetName instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const targetColor = e.target.querySelectorAll('input')[1];
    if (!(targetColor instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const myCreateCar = new Map();
    myCreateCar.set(targetName.name, targetName.value);
    myCreateCar.set(targetColor.name, targetColor.value);
    const car = Object.fromEntries(myCreateCar);
    await createCar(car);
    await updateStateGarage();
  });
  const generateButton = document.querySelector('.generator-button');
  if (!(generateButton instanceof HTMLButtonElement)) {
    throw new Error("generateButton isn't a button");
  }
  generateButton.addEventListener('click', async () => {
    generateButton.disabled = true;
    const cars = generateRandomCars();
    await Promise.all(cars.map(async (car) => createCar(car)));
    await updateStateGarage();
    generateButton.disabled = false;
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
    const winnerMessage = document.getElementById('message-winner');
    if (!(winnerMessage instanceof HTMLElement)) {
      throw new Error("it's not a button");
    }
    resetButton.disabled = false;
    winnerMessage.innerHTML = `${winner.name} went first in ${winner.time} seconds!`;
    winnerMessage.classList.toggle('visible');
    await saveWinners(winner);
  });
  resetButton.addEventListener('click', async () => {
    resetButton.disabled = true;
    store.cars.map(({ id }) => stopDriving(id));
    const winnerMessage = document.getElementById('message-winner');
    if (!(winnerMessage instanceof HTMLElement)) {
      throw new Error("it's not a button");
    }
    winnerMessage.classList.toggle('visible');
    raceButton.disabled = false;
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
        }
        await updateStateGarage();
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
