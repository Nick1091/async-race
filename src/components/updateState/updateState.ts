import { getCars, getWinners, store } from '../../components';

export const apdCars = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
};
export const apdWinners = async () => {
  const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
  store.winners = items;
  store.winnersCount = count;
};
export const updateState = async () => {
  await apdCars();
  await apdWinners();
};
