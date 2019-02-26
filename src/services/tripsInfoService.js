import { API } from '../constants/api';
import fetchData from '../api/fetchData';

export const tripsInfoService = {
  getTripsInfo,
};

export function getTripsInfo(auth_token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  return fetchData(`${API.BACKEND_URL}/trips_info`, requestOptions);
}
