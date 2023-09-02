<!-- calculate page -->
<template>
  <div id="calculate-page">

    <!-- table on the left side -->
    <span class="table"><Search></Search><Table></Table></span>

    <!-- charts on the right side -->
    <span class="side">
      <div class="chartMacronutrients">
        <div class="chartMacronutrient">
          <ChartMacronutrients></ChartMacronutrients>
        </div>
      </div>
      <!-- Progress bars for tracking calories, carbs, protein, and fat -->
      <div class="progress-bars">
        <div class="progress-bar">
          Today's Calories: {{ sumENERC_KCAL }}/{{ caloriesNeeded }} kcal
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="divisionToFixed(sumENERC_KCAL, caloriesNeeded)"
            :color="customColors"
          ></el-progress>
        </div>
        <div class="progress-bar">
          Today's Carbohydrates: {{ sumCARB }}/{{ CarbNeeded }} g
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="divisionToFixed(sumCARB, CarbNeeded)"
            :color="customColors"
          ></el-progress>
        </div>
        <div class="progress-bar">
          Today's Protein: {{ sumPROT }}/{{ ProteinNeeded }} g
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="divisionToFixed(sumPROT, ProteinNeeded)"
            :color="customColors"
          ></el-progress>
        </div>
        <div class="progress-bar">
          Today's Fat: {{ sumFAT }}/{{ FatNeeded }} g{{ caloriesNeed }}
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="divisionToFixed(sumFAT, FatNeeded)"
            :color="customColors"
          ></el-progress>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import Table from '@/components//table.vue';
import ChartMacronutrients from '@/components/chart-macronutrients.vue';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      //Set progress-bars color
      customColors: [
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
        { color: '#f56c6c', percentage: 2000 },
      ],
    };
  },
  name: 'Calculator',
  //Get data from store
  computed: {
    ...mapState({ caloriesNeeded: (state) => state.form.caloriesNeeded }), //Get caloriesNeeded from store
    ...mapGetters([ //Get data from store
      'ProteinNeeded',
      'CarbNeeded',
      'FatNeeded',
      'sumENERC_KCAL',
      'sumCARB',
      'sumPROT',
      'sumFAT',
    ]),
  },
  components: {
    Search,
    Table,
    ChartMacronutrients,
  },
  methods: {
    //传入两个整数，让其相除，不保留小数
    // Divide two integers and return the result as a string with no decimal places
    divisionToFixed(num1, num2) {
      return (num1 / num2).toFixed(0);
    },
  },
};
</script>
<style>
#calculate-page {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  display: flex;
}
.table {
  display: block;
  width: calc(99% - 400px);
  margin-top: 120px;
}
.side {
  display: block;
  width: 400px;
  height: 100%;
  margin: 2rem auto;
  
}
.chartMacronutrients {
  width: 100%;
  height: 50%;
  text-align: center;
}
.chartMacronutrient {
  margin: auto;
}
.progress-bars {
  text-align: left;
}
.progress-bar {
  width: 20rem;
  margin: 1rem auto;
}
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@media screen and (orientation: portrait) {
  .table {
    height: auto;
    float:none;
}
.side {
  height: auto;
  width: auto;
  float:none;
}
}

@media screen and (max-width: 1250px) {
  #calculate-page {
    /* flex-direction: row; */
    display: block;
  }

  .table {
    width: 100%;
    margin-top: 1.5rem;
    font-size: 3px;
  }
  .el-table{
    font-size: 0.5rem;
  }
  .side {
    height: 100%;
  }

}
</style>
