import type { paths } from './api.js';

export type ListTicketsQuery =
  NonNullable<paths['/tickets']['get']['parameters']['query']>;
export type ListTicketsResponse =
  paths['/tickets']['get']['responses'][200]['content']['application/json'];

/**
 * Додаткове завдання п. 1: типізована клієнтська функція для отримання сторінки заявок
 * з використанням типів, згенерованих із openapi.json.
 */
export async function fetchTickets(
  baseUrl: string,
  token: string,
  query: ListTicketsQuery = {},
): Promise<ListTicketsResponse> {
  const url = new URL(`${baseUrl.replace(/\/$/, '')}/tickets`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: не вдалося отримати список заявок`);
  }

  return (await res.json()) as ListTicketsResponse;
}
