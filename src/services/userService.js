import { AsyncStorage } from 'react-native';
import { API } from 'ldmaapp/src/constants/api';

export const userService = {
  login,
  logout,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${API.BACKEND_URL}/sign_in`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user && user.auth_token) {
        // store user details and auth token in local storage to keep user logged in between page refreshes
        AsyncStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  // remove user from async storage to log user out
  return AsyncStorage.removeItem('user');
}
