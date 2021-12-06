<template>
  <el-radio-group v-model="radio">
    <el-radio v-model="radio" label="1">男性</el-radio>
    <el-radio v-model="radio" label="2">女性</el-radio>
    <div>
    年齢：
    <el-input v-model="input" placeholder="age" size="mini" style="width: 140px"></el-input>歳
    </div>
    <div >
    身長：
    <el-input v-model="input" placeholder="Height" size="mini" style="width: 140px"></el-input>cm
    </div>
    <div >
    体重：
    <el-input v-model="input" placeholder="Weight" size="mini" style="width: 140px"></el-input>kg
    </div>
    身体活動レベル：
    <el-radio-group v-model="radio">
    <el-radio :label="3">低い</el-radio>
    <el-radio :label="6">普通</el-radio>
    <el-radio :label="9">高い</el-radio>
  </el-radio-group>
  </el-radio-group>
</template>

<script>
  export default {
    name:'Form',
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>