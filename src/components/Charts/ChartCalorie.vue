<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="カロリー"></ve-liquidfill>
</template>

<script>
  import bus from '../../assets/eventBus';
  export default {
    props: ['sumCal'],
    name:'ChartCalorie',
    data () {
      this.chartSettings = {
      seriesMap: {
        'カロリー': {
          label: {
            formatter (options) {
              const {
                seriesName,
                value
              } = options
              return `${seriesName}\n${value * 100}%`
            },
            fontSize: 20,
          }
        }
      }
    }
      return {
        sumCal: 0,
        CaloriesNeeded: 0,
        chartData: {
          columns: ['Nutrient', 'percent'],
          rows: [{
            Nutrient: 'カロリー',
            percent: 0
          }]
        }
      }
    },
    created(){
        bus.$on('Cal',(res)=>{
            this.CaloriesNeeded = res
            this.chartData.rows[0].percent = this.sumCal / this.CaloriesNeeded
        })
    }
  }
  
</script>