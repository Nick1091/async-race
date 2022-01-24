import { startCar, driveCar, stopCar, store } from '../../../components';
import { IWinners } from '../../../types/types';
import { animation, getDistance } from '../components';

export const startDriving = async (id: number): Promise<IWinners> => {
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
  const brokeEngineMassage = document.getElementById(`message-broke-down-engine-${id}`);
  if (!(brokeEngineMassage instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  const CurrentDistance = Math.floor(getDistance(car, flag) + 80);
  store.animation[id] = animation(car, CurrentDistance, time);
  const { success } = await driveCar(id).then((data) => {
    const brokeEngine = document.getElementById(`car-road-${id}`);
    if (!(brokeEngine instanceof HTMLElement)) {
      throw new Error(" Error: it isn't a button ");
    }
    if (data.success === false) {
      window.cancelAnimationFrame(store.animation[id].id);
      brokeEngine.style.backgroundColor = '#d403033d';
      brokeEngineMassage.style.display = 'block';
      brokeEngineMassage.innerHTML = `${
        brokeEngine.querySelector('.car-name')?.textContent
      } is out of race because the engine was broken down`;
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
  const brokeEngine = document.getElementById(`car-road-${id}`);
  if (!(brokeEngine instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  const brokeEngineMassage = document.getElementById(`message-broke-down-engine-${id}`);
  if (!(brokeEngineMassage instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  stopButton.disabled = true;
  await stopCar(id);
  brokeEngine.style.backgroundColor = 'transparent';
  brokeEngineMassage.style.display = 'none';
  startButton.disabled = false;
  const car = document.getElementById(`car-${id}`);
  if (!(car instanceof HTMLElement)) {
    throw new Error(" Error: it isn't a button ");
  }
  car.style.transform = 'translateX(0)';
  if (store.animation[id] !== undefined) window.cancelAnimationFrame(store.animation[id].id);
};
