<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="炭水化物"></ve-liquidfill>
</template>

<script>
  import bus from '../../assets/eventBus';
  export default {
    props: ['sumCarb'],
    name:'ChartCarb',
    data () {
      this.chartSettings = {
      seriesMap: {
        '炭水化物': {
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
        sumCarb: 0,
        CarbNeeded: 0,
        chartData: {
          columns: ['Nutrient', 'percent'],
          rows: [{
            Nutrient: '炭水化物',
            percent: 0
          }]
        }
      }
    },
    created(){
        bus.$on('Carb',(res)=>{
            this.CarbNeeded = res
            this.chartData.rows[0].percent = this.sumCarb / this.CarbteinNeeded
        })
    }
  }
  
</script>