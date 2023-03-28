// here is vuex data

import form from './/modules/form';
import calculator from './modules/calculator';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isConnected: false, // MetaMaskの接続状態
    isSubmitted: false, // フォームの送信状態
    userAddress: '', //MetaMask Address
    noWallet: false, //use without wallet
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    form,
    calculator,
  },
});
