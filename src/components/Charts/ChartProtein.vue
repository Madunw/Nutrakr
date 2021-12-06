<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="タンパク質"></ve-liquidfill>
</template>

<script>
  import bus from '../../assets/eventBus';
  export default {
    props: ['sumPro'],
    name:'ChartProtein',
    data () {
      this.chartSettings = {
      seriesMap: {
        'タンパク質': {
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
        sumPro: 0,
        ProteinNeeded: 0,
        chartData: {
          columns: ['Nutrient', 'percent'],
          rows: [{
            Nutrient: 'タンパク質',
            percent: 0
          }]
        }
      }
    },
    created(){
        bus.$on('Prot',(res)=>{
            this.ProteinNeeded = res
            this.chartData.rows[0].percent = this.sumPro / this.ProteinNeeded
        })
    }
  }
  
</script>