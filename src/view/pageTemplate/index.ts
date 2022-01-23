import { updateStateGarage, updateStateWinners } from '../../controlPages/index';

export async function listen() {
  const garageMenuButton = document.querySelector('.garage-menu-button');
  garageMenuButton?.addEventListener('click', async () => {
    await updateStateGarage();
  });
  const winnersMenuButton = document.querySelector('.winners-menu-button');
  winnersMenuButton?.addEventListener('click', async () => {
    await updateStateWinners();
  });
}

export const render = async (template: string) => {
  const html = `
<div class="menu">
    <button class="button garage-menu-button primary" id="garage-menu">TO GARAGE</button>
    <button class="button winners-menu-button primary" id="winners-menu">TO WINNERS</button>
  </div>
${template}  
  <div class="pagination">
    <button class="button primary prev-button" id="prev">PREV</button>
    <button class="button primary next-button" id="next">NEXT</button>
</div>`;
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.innerHTML = '';
  document.body.append(root);
  listen();
};
