import { getCarsView } from '../garageView/index';
import { getWinners } from '../winnersView';
import { listen } from './utils/listen';
import { buttonDisable } from './components';

export const render = async () => {
  const html = `
  <div class="menu">
  <button class="button garage-menu-button" id="garage-menu">TO GARAGE</button>
  <button class="button winners-menu-button" id="winners-menu">TO WINNERS</button>
</div>
<div id="garage-view" class="garage-view">
  <div class="forms">
    <form action="" class="form" id="create">
      <input type="text" class="input" id="create-name" name="name" >
      <input type="color" class="color" id="create-color" name="color" value = #ffffff>
      <button class="button" type="submit">Create</button>
    </form>
    <form action="" class="form" id="update">
      <input type="text" class="input" id="update-name" name="name" disabled>
      <input type="color" class="color" id="update-color" name="color" value = #ffffff disabled>
      <button class="button" type="submit" disabled>Update</button>
    </form>
  </div>
  <div class="race-controls">
    <button class="button race-button" id="race">Race</button>
    <button class="button reset-button" id="reset" disabled>Reset</button>
    <button class="button generator-button" id="generator">Generate cars</button>
  </div>
  <div id="garage" class="garage">
    ${getCarsView()}
  </div>
  <p class="message-winner" id="message-winner"></p>
</div> 
<div class="winners-view" style="display: none">
    ${getWinners()}
</div> 
<div class="pagination">
  <button class="button prev-button" id="prev">PREV</button>
  <button class="button next-button" id="next">NEXT</button>
</div>`;
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.innerHTML = '';
  document.body.append(root);
  listen();
  buttonDisable();
};
