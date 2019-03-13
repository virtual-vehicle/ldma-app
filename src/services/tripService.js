import { API } from 'ldmaapp/src/constants/api';
import fetchData from 'ldmaapp/src/api/fetchData';

export const tripService = {
  getTripsAll,
  getTripsInterval,
};

export function getTripsAll(auth_token) {
  console.log("we are here:", auth_token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  return fetchData(`${API.BACKEND_URL}/trips`, requestOptions);
}

export function getTripsInterval(auth_token, start_date, end_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ start_date, end_date }),
  };

  return fetchData(`${API.BACKEND_URL}/trips`, requestOptions);
}
