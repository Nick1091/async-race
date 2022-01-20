import { getCarImage } from '../pageTemplate/car/index';
import { ICar } from './../../interfaces';
import { store } from '../../store';
import { render } from '../pageTemplate/index';
import { getCarContainer } from './getCarsContainer/index';
import { listen } from './garageController/contrLindex';
import { createCar, updateCar } from '../../api';
import { updateStateGarage } from '../../controlPages/index';

const getCarsView = () => `
<h1>Garage: ${store.carsCount}</h1>
<h2>Page № ${store.carsPage}</h2>
<ul class="garage">
  ${store.cars.map((car) => `<li>${getCarContainer(car)}</li>`).join('')}  
</ul>
`;

export const getGarageView = async () => `
  <div id="garage-view" class="garage-view">
    <div>
      <form action="" class="form" id="create">
        <input type="text" class="input" id="create-name" name="name" >
        <input type="color" class="color" id="create-color" name="color" value = #ffffff>
        <button class="button" type="submit">create</button>
      </form>
      <form action="" class="form" id="update">
        <input type="text" class="input" id="update-name" name="name" disabled>
        <input type="color" class="color" id="update-color" name="color" value = #ffffff disabled>
        <button class="button" type="submit" disabled>Update</button>
      </form>
    </div>
    <div class="race-controls">
      <button class="button race-button primary" id="race">Race</button>
      <button class="button reset-button primary" id="reset">Reset</button>
      <button class="button generator-button" id="generator">Generate cars</button>
    </div>
      <div id="garage">
        ${getCarsView()}
      </div>
    <div>
      <p class="message" id="message"></p>
    </div>
  </div>`;

export const renderGaragePage = async () => {
  await render(await getGarageView());
  await listen();
};
