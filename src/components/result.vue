<!-- Result component to show nutrition needs result -->
<template>
  <div v-show="goalWeight != 0">
    To reach your goal weight In 28 Days, You need :
  </div>
  <el-card class="box-card">
    <span class="items">
      <ul>
        <li v-for="item in ['Calories', 'Carbohydrate', 'Protein', 'Fat']">{{ item }}</li>
      </ul>
      </span
    >
    <span class="results">
      <ul>
        {{
          caloriesNeeded
        }}
        kcal
      </ul>
      <ul>
        {{
          CarbNeeded
        }}
        g
      </ul>
      <ul>
        {{
          ProteinNeeded
        }}
        g
      </ul>
      <ul>
        {{
          FatNeeded
        }}
        g
      </ul>
    </span>
  </el-card>
</template>
<script>
import { mapState, mapGetters, mapMudules, mapMutations } from 'vuex';
export default {
  name: 'Result',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      caloriesNeeded: (state) => state.form.caloriesNeeded,
      goalWeight: (state) => state.form.goalWeight,
    }), //Get data from vuex store
    ...mapGetters(['ProteinNeeded', 'CarbNeeded', 'FatNeeded']),
  },
};
</script>
<style>
.box-card {
  width: 400px;
  margin: 20px 0;
  padding: 20px;
  font-size: large;
  text-align: center;
}
.items {
  text-align: justify;
  float: left;
}
.results {
  text-align: justify;
  float: right;
}
</style>
