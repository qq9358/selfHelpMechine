import axios from "axios";
import tokenService from "@/services/tokenService.js";

const ajax = axios.create({
  // baseURL: 'http://192.168.1.68:8039/',
  // baseURL: '/api',
  // baseURL: 'http://192.168.1.64:8010/',
  baseURL: 'http://egoal-test.eicp.net:25449/cd/',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  timeout: 10000
});

ajax.interceptors.request.use(
  function (config) {
    const token = tokenService.getToken();
    if (token) {
      config.headers.common["Authorization"] = `${token.token_type} ${
        token.access_token
        }`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  response => {

    return response.data;
  },
  error => {

    return Promise.reject(error);
  }
);
export default ajax;
