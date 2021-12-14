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
              return `${seriesName}\n${Math.round(value * 100)}%`//丸め誤差を回避するため、Math.roundで整数化
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
        bus.$on('Carb',(res)=>{//busから値を取得
            this.CarbNeeded = res
            this.Carbpercent = this.sumCarb / this.CarbNeeded /100;
            this.chartData.rows[0].percent = this.Carbpercent.toFixed(2)//小数第2位に丸める
        })
    },
    watch: {//sumCarbの変化を監視し、パーセントを計算し、値をチャットに渡す
      sumCarb: function (val) {
      this.Carbpercent = this.sumCarb / this.CarbNeeded /100;
      this.chartData.rows[0].percent = this.Carbpercent.toFixed(2)//小数第2位に丸める
      }
    }
  }
  
</script>