<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings"></ve-liquidfill>
</template>

<script>
  export default {
    name:'ChartCalorie',
    data () {
      this.chartSettings = {
        wave: [0.5, 0.3, 0.1],
        seriesMap: {
          '上海': {
            color: ['red', 'green', 'yellow'],
            radius: '30%',
          }
        }
      }
      return {
        chartData: {
          columns: ['city', 'percent'],
          rows: [{
            city: '上海',
            percent: 0.7
          }]
        }
      }
    }
  }
</script>