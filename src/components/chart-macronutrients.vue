<!-- Macronutrients nutrition chart componet -->
<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { mapGetters } from 'vuex';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import VChart, { THEME_KEY } from 'vue-echarts';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

export default {
  name: 'ChartMacronutrients',
  data() {
    return {
      num: 3130,
    };
  },
  computed: {
    ...mapGetters(['sumCARB', 'sumPROT', 'sumFAT']),
  },
  components: {
    VChart,
  },
  setup: () => {
    const store = useStore();
    const sumCARB = computed(() => store.getters.sumCARB);
    const sumPROT = computed(() => store.getters.sumPROT);
    const sumFAT = computed(() => store.getters.sumFAT);

    // 创建option对象
    let option = ref({
      i: 555,
      title: {
        text: '三大栄養素比率',
        left: 'center',
      },
      // popover
      tooltip: {
        trigger: 'item',
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        width: "220px",
        height: "280px",
        containLabel: true},

      legend: {
        top: '5%',
        left: 'center',
      },
      series: {
        name: 'Macronutrients',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: sumCARB, name: 'sumCARB' },
          { value: sumPROT, name: 'sumPROT' },
          { value: sumFAT, name: 'sumFAT' },
        ],
      },
    });
    return { option };
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
  width: 400px;
}
</style>
