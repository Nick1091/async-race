import { store } from '../../components';
import { getCarContainer } from './getCarsContainer/index';

export const getCarsView = () => `
<h1>Garage: ${store.carsCount}</h1>
<h2>Page № ${store.carsPage}</h2>
<ul class="garage">
  ${store.cars.map((car) => `<li id ="car-road-${car.id}">${getCarContainer(car)}</li>`).join('')}  
</ul>
`;
