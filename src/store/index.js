// here is vuex data

import form from './modules/form';
import calculator from './modules/calculator';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isConnected: false, //判断是否连接钱包
    isSubmitted: false, //判断是否提交
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
