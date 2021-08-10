<template>

  <div class="HelloWorld">
    <ve-liquidfill :data="chartData" :settings="chartSettings"></ve-liquidfill>
  </div>
  
</template>

<script>
export default {
    data () {
    this.chartSettings = {
      wave: [[], [0.1, 0.2], []],
      seriesMap: [
        {
          label: {
            formatter (options) {
              return `${options.seriesName}\n${options.data.value}`
            },
            fontSize: 30
          },
          center: ['14%', '20%'],
          radius: '40%',
        },
        {
          label: {
            formatter (options) {
              return `${options.seriesName}\n${options.data.value}`
            },
            fontSize: 30
          },
          center: ['25%', '70%'],
          radius: '40%'
        },
        {
          label: {
            fontSize: 30
          },
          center: ['70%', '50%'],
          radius: '40%',
        }
      ]
    }
    return {
      chartData: {
        columns: ['city', 'percent'],
        rows: [{
          city: 'カロリー',
          percent: 0.6
        }, {
          city: '糖質',
          percent: 0.4
        }, {
          city: '成都',
          percent: 0.9
        }]
      }
    }
  }
}
</script>
<style scoped>
</style>