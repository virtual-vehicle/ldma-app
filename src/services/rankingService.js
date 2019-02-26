import { API } from 'ldmaapp/src/constants/api';
import fetchData from 'ldmaapp/src/api/fetchData';

export const rankingService = {
  getRanking,
};

export function getRanking(auth_token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  };

  return fetchData(`${API.BACKEND_URL}/rankings`, requestOptions);
}

