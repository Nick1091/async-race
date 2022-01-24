import { store } from '../../../../components';
import { IWinners, IWinner, INewWinner } from '../../../../types/types';

const getWinnerRace = async (promises: Promise<IWinners>[], ids: number[]): Promise<IWinner> => {
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
