import { API } from '../constants/api';
import fetchData from '../api/fetchData';

export const eventService = {
  getEvents,
};

export function getEvents(auth_token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  return fetchData(`${API.BACKEND_URL}/events`, requestOptions);
}
