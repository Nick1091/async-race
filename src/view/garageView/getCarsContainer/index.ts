import { getCarImage } from '../../../components';
import { ICar } from '../../../types/types';
export const getCarContainer = ({ id, name, color }: ICar) => `
  <div class="general-buttons">
    <button class="select-button" id = 'select-car-${id}'>Select</button>
    <button class="remove-button" id = 'remove-car-${id}'>Remove</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="road">
    <div class="road-car-area">
      <div class="control-panel">
        <button class="icon start-engine-button" id="start-engine-car-${id}">Start</button>
        <button class="icon stop-engine-button" id="stop-engine-car-${id}" disabled>Stop</button>
      </div>
      <div class="car" id="car-${id}">
        ${getCarImage(color)}
      </div>
    </div>
    <div class="flag" id="flag-${id}">&#127937;</div>
  </div>
  <div id="message-broke-down-engine-${id}" class = "message" display="none"></div>
`;
