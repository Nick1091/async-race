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
  success: boolean;
};

export type GetWinners = {
  id: number;
  wins: number;
  time: number;
};
export interface IGetWinners {
  items: IIDWinner[];
  count: number;
}
export interface IIDWinner {
  id: number;
  wins: number;
  time: number;
  car: ICar;
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
  winners: IIDWinner[];
  winnersCount: number;
  animation: IObj;
  sortBy: null | string;
  sortOrder: null | string;
  selectedCarID: number | null;
  view: string;
}
export interface IObjNumber {
  [id: string]: number;
}
export interface IObj {
  [id: string]: IObjNumber;
}
export interface IWinners {
  success: boolean;
  id: number;
  time: number;
}
export interface IWinner {
  name?: string;
  color?: string;
  id?: number;
  time: number;
}
export interface INewWinner {
  name?: string;
  color?: string;
  id: number;
  time: number;
}
