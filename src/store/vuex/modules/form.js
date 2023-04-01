const state={
  caloriesNeeded: 0,
  weight: 0,
  goalWeight: 0,
}
const getters={
  ProteinNeeded(state) {
    // 1日のタンパク質摂取量を算出
    return Math.round((state.caloriesNeeded * 0.17) / 4);
  },
  CarbNeeded(state) {
    // 1日の炭水化物摂取量を算出
    return Math.round((state.caloriesNeeded * 0.58) / 9);
  },
  FatNeeded(state) {
    // 1日の脂質摂取量を算出
    return Math.round((state.caloriesNeeded * 0.25) / 4);
  },
}
const mutations={
  // 身体活動レベルを掛け、1日カロリを算出
  getCaloriesNeeded(state, caloriesNeeded ) {
    state.caloriesNeeded = caloriesNeeded
  },
  getWeight(state, weight ) {
    state.weight = weight
  },
  getGoalWeight(state, goalWeight ) {
    state.goalWeight = goalWeight
  },
}

export default {
  state,
  getters,
  mutations,
}
