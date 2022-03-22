<template>
  <div >
    carb
       </div>
</template>

<script>
// import ChartMacronutrients from './side-area/ChartMacronutrients.vue'
// import Form from './side-area/Form.vue'
import {mapState} from 'vuex'

export default {
  name: 'Side',
  computed:{
    ...mapState(['count'])
  },
  methods:{
    
  }
}
</script>

<style>
.table {
  background-color: #67C23A;
}
.leftBlock {
  background-color: 204, 255, 255;
  width: 60%;
  height: 100%;
}
.search {
  width: 400px;
}
.rightBlock {
  height: 100%;
  width: 20%;
  background-color: yellow;
}
.form {
  height: 500px;
  width: 100px;
  margin-top: 30px;
  padding: 60px 26px;
  position: absolute;
  display: flex;
  border-radius: 16px 0px 0px 16px;
  justify-content: center;
  align-items: center;
  background-color: pink;
  left: 20px;
  z-index: 1;
}
.bottomBlock {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 90%;
  background-color: 204, 255, 153;
}
.bottomBlock * {
  display: inline-block;
}

table td {
  border-left: 5px;
}
.table {
  z-index: -1;
  width: 100%;
  height: 50%;
  margin: 50px 20px 0px 50px;
}
.chart {
  margin: 0 auto;
  height: 50%;
  margin: 50px 20px 0px 50px;
}
.progress-block {
  margin: 10px auto;
}
.progress {
  margin: 0px auto;
  height: 28px;
}
.el-progress-icon {
  width: 5%;
  font-size: 18px;
  float: left;
}
.el-progress--line {
  width: 95%;
  float: right;
}
.el-progress-bar {
  width: 90%;
}
.el-progress__text {
  width: 10%;
}

.el-popover__reference {
  width: 20px;
}
</style>
