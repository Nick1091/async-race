import { IStorageObj } from '../../types/types';

export const store: IStorageObj = {
  carsPage: 1,
  cars: [],
  carsCount: 1,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  sortBy: null,
  sortOrder: null,
  selectedCarID: null,
  view: 'garagePage',
};
