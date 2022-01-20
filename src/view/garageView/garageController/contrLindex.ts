import { getCarImage } from '../../pageTemplate/car/index';
import { ICar } from '../../../interfaces';
import { store } from '../../../store';
import { render } from '../../pageTemplate/index';
import { getCarContainer } from '../getCarsContainer/index';
import { createCar, updateCar, getCar, deleteCar, deleteWinner, getWinner } from '../../../api';
import { updateStateGarage } from '../../../controlPages/index';
import { generateRandomCars } from './generateCars/index';

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
    //   event.target.disabled = true // ?
  });
  document.getElementById('update')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw new Error('Error');
    }
    const targetName = e.target.querySelector('input');
    if (!(targetName instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const targetColor = e.target.querySelectorAll('input')[1];
    if (!(targetColor instanceof HTMLInputElement)) {
      throw new Error('Error');
    }
    const myUpdateCar = new Map();
    myUpdateCar.set(targetName.name, targetName.value);
    myUpdateCar.set(targetColor.name, targetColor.value);
    const car = Object.fromEntries(myUpdateCar);
    if (store.selectedCarID !== null) {
      await updateCar(car, store.selectedCarID);
      await updateStateGarage();
    }
    updateName.disabled = true;
    updateColor.disabled = true;
    updateButton.disabled = true;
    updateColor.value = '#ffffff';
    store.selectedCarID = null;
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
        // if (await getWinner(id)) {
        //   await deleteWinner(id);
        // }
        await updateStateGarage();
      }
    }
  });

  const generateButton = document.querySelector('.generator-button');
  generateButton?.addEventListener('click', async () => {
    if (!(generateButton instanceof HTMLButtonElement)) {
      throw new Error("it's not a button");
    }
    generateButton.disabled = true;
    const cars = generateRandomCars();
    await Promise.all(cars.map(async (car) => createCar(car)));
    await updateStateGarage();
    generateButton.disabled = false;
  });
}
