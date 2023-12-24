import axios from 'axios';
import Cookies from 'js-cookie';

export const baseURL = 'https://i-share-api.onrender.com';

export const setHeaders = () => {
  const authHeaders = JSON.parse(Cookies.get('authHeaders')) || null;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.uid = authHeaders.uid;
  axios.defaults.headers.common.client = authHeaders.client;
  axios.defaults.headers.common['access-token'] = authHeaders['access-token'];
};
