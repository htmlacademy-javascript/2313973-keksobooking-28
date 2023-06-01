const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

function load (route, method = Method.GET, body = null) {
  return fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
}

function getData () {
  return load(Route.GET_DATA);
}
function sendData (body) {
  return load(Route.SEND_DATA, Method.POST, body);
}

export {getData, sendData};
