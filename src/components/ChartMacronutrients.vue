<template>
  <ve-ring
    :data="totalValue"
    :extend="extend"
    height="240px"
    width="300px"
    :settings="{ radius: [50, 80], offsetY: 120 }"
  ></ve-ring>
</template>

<script>
export default {
  name: 'ChartMacronutrients',
  props: {
    totalValue: {
      type: Object
    }
  }
}
</script>
<style scoped></style>
