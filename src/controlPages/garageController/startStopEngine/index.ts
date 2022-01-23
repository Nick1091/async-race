import { startCar, driveCar, stopCar } from '../../../api';
import { store } from '../../../store';
import { getDistance } from './getDistance/index';
import { IObjNumber, IWinner, IWinners, INewWinner } from '../../../interfaces';

export function animation(id: number, car: HTMLElement, distance: number, animationTime: number) {
  const state: IObjNumber = {};
  const startTime = new Date().getTime();
  async function getInterval() {
    const currTime = new Date().getTime();
    const passedDistance = Math.round((currTime - startTime) * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passedDistance, distance)}px)`;
    if (passedDistance < distance) {
      state.id = window.requestAnimationFrame(getInterval);
    }
  }
  state.id = window.requestAnimationFrame(getInterval);
  return state;
}

export const startDriving = async (id: number) => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  if (!(startButton instanceof HTMLButtonElement)) {
    throw new Error(" Error: startButton isn't a button ");
  }
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  if (!(stopButton instanceof HTMLButtonElement)) {
    throw new Error(" Error: startButton isn't a button ");
  }
  startButton.disabled = true;
  const { velocity, distance } = await startCar(id);
  const time = Math.round(distance / velocity);
  stopButton.disabled = false;
  const car = document.getElementById(`car-${id}`);
  if (!(car instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  const flag = document.getElementById(`flag-${id}`);
  if (!(flag instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  const CurrentDistance = Math.floor(getDistance(car, flag) + 80);
  store.animation[id] = animation(id, car, CurrentDistance, time);
  const { success } = await driveCar(id).then((data) => {
    if (data.status !== 200) {
      window.cancelAnimationFrame(store.animation[id].id);
    }
    return data;
  });
  return { success, id, time };
};

export const stopDriving = async (id: number) => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  if (!(startButton instanceof HTMLButtonElement)) {
    throw new Error(" Error: startButton isn't a button ");
  }
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  if (!(stopButton instanceof HTMLButtonElement)) {
    throw new Error(" Error: startButton isn't a button ");
  }
  stopButton.disabled = true;
  await stopCar(id);
  startButton.disabled = false;
  const car = document.getElementById(`car-${id}`);
  if (!(car instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  car.style.transform = 'translateX(0)';
  if (store.animation[id] !== undefined) window.cancelAnimationFrame(store.animation[id].id);
};

export const getWinnerRace = async (promises: Promise<IWinners>[], ids: number[]): Promise<IWinner> => {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    promises.splice(failedIndex, 1);
    ids.splice(failedIndex, 1);
    return getWinnerRace(promises, ids);
  }
  return { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (prom: (id: number) => Promise<IWinners>) => {
  const promises = store.cars.map(({ id }) => prom(id));
  const winner = (await getWinnerRace(
    promises,
    store.cars.map((car) => car.id)
  )) as INewWinner;
  return winner;
};
