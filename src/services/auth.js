import axios from 'axios';
import { API } from '@/constants';

let auth = {

  isAuthenticated: function () {
    return this.getToken() !== null;
  },

  login: function (credentials) {
    return axios.post(API + 'auth', credentials)
  },

  setHeaders: function () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken();
  },

  removeHeaders: function () {
    delete axios.defaults.headers.common['Authorization']
  },

  setToken: function (token) {
    localStorage.setItem('access_token', token);
  },

  getToken: function () {
    return localStorage.getItem('access_token');
  },

  removeToken: function () {
    localStorage.removeItem('access_token');
  },

  setUser: function (user) {
    let keys = Object.keys(user);
    for (let i = 0, l = keys.length; i < l; i++) {
      localStorage.setItem(keys[i], user[keys[i]])
    }
  },

  removeUser: function () {
    localStorage.clear()
  }

};

export { auth }
