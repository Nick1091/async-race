/* eslint-disable @typescript-eslint/indent */
import './style.css';
import { ICar, IUpdateCar, GetWinnersParams, GetWinners, SaveWinner, ICarEnj } from './interfaces';
import { getCars, getCar, getWinners } from './api';
import { store } from './store';
import { renderGaragePage } from './view/garageView/index';
import { renderWinnersPage } from './view/winnersView/index';
import { updateStateGarage, updateStateWinners } from './controlPages/index';

updateStateGarage();
