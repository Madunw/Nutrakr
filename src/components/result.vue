<!-- Result component to show nutrition needs result -->
<template>
  <div v-show="weightGoal != 0">
    To {{ gainOrLoose }}{{ weightGoal }} kg In 28 Days, You Need :
  </div>
  <el-card class="box-card">
    <span class="items">
      <ul>
        Calories
      </ul>
      <ul>
        Carbohydrate
      </ul>
      <ul>
        Protein
      </ul>
      <ul>
        Fat
      </ul></span
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
    return {
    };
  },
  computed: {
    ...mapState({
      caloriesNeeded: 'form.caloriesNeeded',
      weightGoal: 'form.weightGoal',
    }),
    ...mapGetters(['ProteinNeeded', 'CarbNeeded', 'FatNeeded']),
    // not show when weightgoal is 0
    gainOrLoose: function() {
  return this.weightGoal > 0 ? 'Gain' : this.weightGoal < 0 ? 'Loose' : 'notShow';
},

  },
};
</script>
<style>
.box-card {
  width: 400px;
  margin: 20px auto;
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
