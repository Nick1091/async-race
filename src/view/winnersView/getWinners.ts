import { getCarImage, store } from '../../components';

export const getWinners = () => `
<h1>Winners: ${store.winnersCount}</h1>
<h2>Page № ${store.winnersPage}</h2>
  <table class="table" cellspacing ="0" border="0" cellpadding="0" >
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table-button table-wins" id = "sort-by-wins">Wins</th>
      <th class="table-button table-time" id = "sort-by-time">Best time (sec)</th>
    </thead>
    <tbody>
    ${store.winners
      .map(
        (winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${getCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
        `
      )
      .join(' ')}
    </tbody>
  </table>`;
