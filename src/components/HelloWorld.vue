<template>

  <div class="HelloWorld">
    asdasdasssssss
    <ve-ring :data="chartData" :extend="extend"></ve-ring>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, },
            { '日期': '1/2', '访问用户': 3530, },
            { '日期': '1/3', '访问用户': 2923, },
          ]
        }
      }
  }
}

</script>
<style scoped>
</style>