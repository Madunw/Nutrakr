import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list: [{"name":"haha","FAT":"8"}]
  },
  mutations: {
    add:()=>{
        state.list.push(name)
    },
    add1:(state,item) => {
      //code
    }
  },
  actions: {
    addtolist:(context,value) => {
      context.commit('PRODUCT_ADDTO_CART', value);
    },
  }
})