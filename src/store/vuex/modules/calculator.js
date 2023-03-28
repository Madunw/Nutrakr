import foods from '@/store/foods.json';
const state = {
  list: [], // list for selected items form component-'search'
};
const getters = {
  // compute list value by num
  sumENERC_KCAL(state) {
    let sumENERC_KCAL = state.list
      .map((row) => (row.ENERC_KCAL * row.num) / 100)
      .reduce((acc, cur) => parseInt(cur) + acc, 0);
    return sumENERC_KCAL;
  },
  sumCARB(state) {
    let sumCARB = state.list
      .map((row) => (row.CARB * row.num) / 100)
      .reduce((acc, cur) => parseInt(cur) + acc, 0);
    return sumCARB;
  },
  sumPROT(state) {
    let sumPROT = state.list
      .map((row) => (row.PROT * row.num) / 100)
      .reduce((acc, cur) => parseInt(cur) + acc, 0);
    return sumPROT;
  },
  sumFAT(state) {
    let sumFAT = state.list
      .map((row) => (row.FAT * row.num) / 100)
      .reduce((acc, cur) => parseInt(cur) + acc, 0);
    return sumFAT;
  },
};
const mutations = {
  // 身体活動レベルを掛け、1日カロリを算出
  // add item into list/list_show for component-'search'
  addToList(state, name) {
    var a = foods.find(function (item) {
      //find item by name in 'foods'
      return item.name == name;
    });
    a.num = 100; //add a propertiy 'num' to Object-'a'
    state.list.push(a); //pop in list
  },
  // compute list value by num
  computeListValueByNum(num, index) {
    state.list_show[index].CARB = (state.list[index].CARB * num).toFixed(1);
    state.list_show[index].PROT = (state.list[index].PROT * num).toFixed(1);
    state.list_show[index].FAT = (state.list[index].FAT * num).toFixed(1);
    state.list_show[index].ENERC_KCAL = (
      state.list[index].ENERC_KCAL * num
    ).toFixed(1);
    state.list_show[index].NACL_EQ = (state.list[index].NACL_EQ * num).toFixed(
      1
    );
    state.list_show[index].CHOAVL = (state.list[index].CHOAVL * num).toFixed(1);
    state.list_show[index].FIB = (state.list[index].FIB * num).toFixed(1);
    state.list_show[index].NA = (state.list[index].NA * num).toFixed(1);
    state.list_show[index].K = (state.list[index].K * num).toFixed(1);
    state.list_show[index].CA = (state.list[index].CA * num).toFixed(1);
    state.list_show[index].MG = (state.list[index].MG * num).toFixed(1);
    state.list_show[index].P = (state.list[index].P * num).toFixed(1);
    state.list_show[index].FE = (state.list[index].FEB * num).toFixed(1);
    state.list_show[index].ZN = (state.list[index].ZNB * num).toFixed(1);
    state.list_show[index].CU = (state.list[index].CU * num).toFixed(1);
    state.list_show[index].MN = (state.list[index].MN * num).toFixed(1);
    state.list_show[index].ID = (state.list[index].ID * num).toFixed(1);
    state.list_show[index].SE = (state.list[index].SE * num).toFixed(1);
    state.list_show[index].CR = (state.list[index].CR * num).toFixed(1);
    state.list_show[index].MO = (state.list[index].MO * num).toFixed(1);
    state.list_show[index].CARTBEQ = (state.list[index].CARTBEQ * num).toFixed(
      1
    );
    state.list_show[index].VITD = (state.list[index].VITD * num).toFixed(1);
    state.list_show[index].VITK = (state.list[index].VITK * num).toFixed(1);
    state.list_show[index].THIA = (state.list[index].THIA * num).toFixed(1);
    state.list_show[index].RIBF = (state.list[index].RIBF * num).toFixed(1);
    state.list_show[index].NIA = (state.list[index].NIA * num).toFixed(1);
    state.list_show[index].VITB6A = (state.list[index].VITB6A * num).toFixed(1);
    state.list_show[index].VITB12 = (state.list[index].VITB12 * num).toFixed(1);
    state.list_show[index].FOL = (state.list[index].FOL * num).toFixed(1);
    state.list_show[index].PANTAC = (state.list[index].PANTAC * num).toFixed(1);
    state.list_show[index].BIOT = (state.list[index].BIOT * num).toFixed(1);
    state.list_show[index].VITC = (state.list[index].VITC * num).toFixed(1);
    state.list_show[index].VITE = (state.list[index].VITE * num).toFixed(1);
  },
  // delete from list/list_show
  handleDelete(state, b) {
    state.list.splice(b, 1);
  },
};
export default {
  state,
  getters,
  mutations,
};
