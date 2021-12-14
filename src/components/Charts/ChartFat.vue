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
              return `${seriesName}\n${Math.round(value * 100)}%`//丸め誤差を回避するため、Math.roundで整数化
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
        bus.$on('Fat',(res)=>{//busから値を取得
            this.FatNeeded = res
            this.Fatpercent = this.sumFat / this.FatNeeded /100;
            this.chartData.rows[0].percent = this.Fatpercent.toFixed(2)//小数第2位に丸める
        })
    },
    watch: {//sumFatの変化を監視し、パーセントを計算し、値をチャットに渡す
      sumFat: function (val) {
      this.Fatpercent = this.sumFat / this.FatNeeded/100;
      this.chartData.rows[0].percent = this.Fatpercent.toFixed(2)//小数第2位に丸める
      }
    }
  }
  
</script>