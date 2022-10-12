import axios from 'axios';
const AUTH_URL = 'http://localhost:5000/auth';

export const login = (user) => {
  console.log(user);
  return axios.post(`${AUTH_URL}/login`, user);
}
export const signup = (user) => {
  return axios.post(`${AUTH_URL}/signup`,user);
}
export const oauth = (user) => {
  return axios.post(`${AUTH_URL}/oauth`,user);
}
