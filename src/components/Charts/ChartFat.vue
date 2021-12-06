<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="脂質"></ve-liquidfill>
</template>

<script>
  import bus from '../../assets/eventBus';
  export default {
    props: ['sumFat'],
    name:'ChartFat',
    data () {
      this.chartSettings = {
      seriesMap: {
        '脂質': {
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
        sumFat: 0,
        FatNeeded: 0,
        chartData: {
          columns: ['Nutrient', 'percent'],
          rows: [{
            Nutrient: '脂質',
            percent: 0
          }]
        }
      }
    },
    created(){
        bus.$on('Fat',(res)=>{
            this.FatNeeded = res
            this.chartData.rows[0].percent = this.sumFat / this.FatNeeded
        })
    }
  }
  
</script>