
export default function fetchData(url, requestOptions) {
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(data => data);
}
