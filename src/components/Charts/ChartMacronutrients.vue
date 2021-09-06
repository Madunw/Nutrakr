<template>
 
    <ve-ring :data="totalValue" :extend="extend" height="240px" width="240px" :settings="{radius: [30, 50], offsetY: 100}"></ve-ring>
  
</template>

<script>
export default {
    name:'ChartMacronutrients',
    props: {
        totalValue:{
            type:Object
        }
    }
}
</script>
<style scoped>

</style>