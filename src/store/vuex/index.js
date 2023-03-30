// here is vuex data

import form from './/modules/form';
import calculator from './modules/calculator';
import welcome from './modules/welcome'
import { createStore } from 'vuex';

export default createStore({
  state: {
    userAddress: '', //MetaMask Address
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    form,
    calculator,
    welcome,
  },
});
