<template>
<div class="toggle">
   <el-button icon="el-icon-arrow-right" circle></el-button>
</div>
</template>

<script>
  export default {
    name: "Drawer",
  }
</script>
<style scoped>
.toggle {
  position: absolute;
  cursor: pointer;
  top: calc(50% - 40px);
  left: -20px;
  border-radius: 50%;
  border: 5px solid blueviolet;
}
.toggle::after{
  position: absolute;
  cursor: pointer;
  top: calc(50% - 40px);
  right: -20px;
  border-radius: 50%;
  border: 5px solid blueviolet;
}
</style>