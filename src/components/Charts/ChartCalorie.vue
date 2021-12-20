<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="カロリー" ></ve-liquidfill>
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
              return `${seriesName}\n${Math.round(value * 100)}%`//丸め誤差を回避するため、Math.roundで整数化
            },
            fontSize: 20,
          }
        }
      }
    }
      return {
        sumCal: 0,
        CalNeeded: 0,
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
            //busから値を取得
            this.CalNeeded = res
            this.Calpercent = this.sumCal / this.CalNeeded /100;
            this.chartData.rows[0].percent = this.Calpercent.toFixed(2)//小数第2位に丸める
        })
    },
    watch: {//sumCalの変化を監視し、パーセントを計算し、値をチャットに渡す
      sumCal: function (val) {
      this.Calpercent = this.sumCal / this.CalNeeded /100;
      this.chartData.rows[0].percent = this.Calpercent.toFixed(2)//小数第2位に丸める
      }
    }
  }
  
</script>