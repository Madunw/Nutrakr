<template>
  <ve-liquidfill :data="chartData" height="240px" width="240px" :settings="chartSettings" label="タンパク質"></ve-liquidfill>
</template>

<script>
  import bus from '../../assets/eventBus';
  export default {
    props: ['sumProt'],
    name:'ChartProt',
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
              return `${seriesName}\n${Math.round(value * 100)}%`//丸め誤差を回避するため、Math.roundで整数化
            },
            fontSize: 20,
          }
        }
      }
    }
      return {
        sumProt: 0,
        ProtNeeded: 0,
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
        bus.$on('Prot',(res)=>{//busから値を取得
            this.ProtNeeded = res
            this.Protpercent = this.sumProt / this.ProtNeeded /100;
            this.chartData.rows[0].percent = this.Protpercent.toFixed(2)//小数第2位に丸める
        })
    },
    watch: {//sumProtの変化を監視し、パーセントを計算し、値をチャットに渡す
      sumProt: function (val) {
      this.Protpercent = this.sumProt / this.ProtNeeded /100;
      this.chartData.rows[0].percent = this.Protpercent.toFixed(2)//小数第2位に丸める
      }
    }
  }
  
</script>