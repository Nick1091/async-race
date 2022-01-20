export interface ICar {
  name: string;
  color: string;
  id: number;
}
export interface ICars {
  items: ICar[];
  count: number;
}
export interface IUpdateCar {
  name: string;
  color: string;
}
export interface ICreateCar {
  name: string;
  color: string;
}
export interface IStartStopParams {
  velocity: number;
  distance: number;
}

export type CarsEngine = {
  success: true;
};

export type GetWinners = {
  id: number;
  wins: number;
  time: number;
};
export interface IGetWinners {
  items: GetWinners[];
  count: number;
}
export type GetWinnersParams = {
  page: number;
  limit?: number;
  sort: string | null;
  order: string | null;
};

export type SaveWinner = {
  id: number;
  time: number;
};
export interface IStorageObj {
  carsPage: number;
  cars: ICar[];
  carsCount: number;
  winnersPage: number;
  winners: GetWinners[];
  winnersCount: number;
  animation: IObj;
  view: 'garage';
  sortBy: null;
  sortOrder: null;
  selectedCarID: number | null;
}
interface IObj {
  [key: string]: string;
}
export interface ICarEnj {
  id: number;
  name: string;
  color: string;
  isEngineStarted: boolean;
}
