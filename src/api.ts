import {
  ICar,
  ICars,
  IUpdateCar,
  GetWinnersParams,
  GetWinners,
  SaveWinner,
  IStartStopParams,
  IGetWinners,
  ICreateCar,
} from './interfaces';
const baseUrl = 'http://localhost:3000';
const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;

export const getCars = async (page: number, limit = 7): Promise<ICars> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const carsCount = {
    items: await res.json(),
    count: Number(res.headers.get('X-Total-Count')),
  };
  return carsCount;
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: ICreateCar) =>
  (
    await fetch(`${garage}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteCar = async (id: number) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    })
  ).json();

export const updateCar = async (body: IUpdateCar, id: number) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const startCar = async (id: number): Promise<IStartStopParams> =>
  (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopCar = async (id: number): Promise<IStartStopParams> =>
  (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const driveCar = async (id: number): Promise<boolean> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string | null, order: string | null) =>
  sort && order ? `&_sort=${sort}&_order=${order}` : '';

//help
export const getWinners = async ({ page, limit = 10, sort, order }: GetWinnersParams): Promise<IGetWinners> => {
  const res = await fetch(`${winners}?_page=${page}&_limit=${limit}&${getSortOrder(sort, order)}`);
  const items = await res.json();

  return {
    items: await Promise.all(items.map(async (winner: GetWinners) => ({ ...winner, car: await getCar(winner.id) }))),
    count: Number(res.headers.get('X-Total-Count')),
  };
};

export const getWinner = async (id: number): Promise<GetWinners> => (await fetch(`${winners}/${id}`)).json();

export const deleteWinner = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: GetWinners) =>
  (
    await fetch(`${winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
export const updateWinner = async (id: number, body: GetWinners) =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

//save image;

// export const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

// export const saveWinners = async ({ id, time }: SaveWinner) => {
//   const winnerStatus = await getWinnerStatus(id);
//   if (winnerStatus === 404) {
//     await createWinner({
//       id,
//       wins: 1,
//       time,
//     });
//   } else {
//     const winner: GetWinners = await getWinner(id);
//     await updateWinner(id, {
//       id,
//       wins: winner.wins + 1,
//       time: time < winner.time ? time : winner.time,
//     });
//   }
// };
