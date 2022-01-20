import { IStorageObj, ICars, GetWinnersParams, IGetWinners } from './interfaces';
import { getCars, getWinners } from './api';

export const store: IStorageObj = {
  carsPage: 1,
  cars: [],
  carsCount: 1,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
  selectedCarID: null,
};
