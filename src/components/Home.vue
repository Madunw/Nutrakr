<template>
  <div id="app">
    <!-- 左半部 -->
    <div class="leftBlock">
      <!-- 搜索框 -->
      <div class="search">
      <el-select
        v-model="name"
        filterable
        v-loading="loading"
        placeholder="食品名を入力してください"
        style="width: 60%"

      >
        <el-option
          v-for="item in foods"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
          <el-button
            icon="el-icon-plus"
            size="mini"
            circle
            @click="
              add(
                item.name,
                item.CARB,
                item.PROT,
                item.FAT,
                item.ENERC_KCAL,
                item.NACL_EQ,
                item.CHOAVL,
                item.FIB,
                item.NA,
                item.K,
                item.CA,
                item.MG,
                item.P,
                item.FE,
                item.ZN,
                item.CU,
                item.MN,
                item.ID,
                item.SE,
                item.CR,
                item.MO,
                item.CARTBEQ,
                item.VITD,
                item.VITK,
                item.THIA,
                item.RIBF,
                item.NIA,
                item.VITB6A,
                item.VITB12,
                item.FOL,
                item.PANTAC,
                item.BIOT,
                item.VITC,
                item.VITE,
                item.num
              )
            "
          >
          </el-button>
          &nbsp;&nbsp;{{ item.name }}
        </el-option>
      </el-select>
      </div>
      <!-- 表格 -->
      <el-table :data="list_show" stripe v-loading="loading" style="width: 100%" show-summary>
        <!-- 移除按钮 -->
        <el-table-column align="right" label=" " width="60">
          <template slot-scope="scope">
            <!-- 从list/list_show中移除 -->
            <el-button
              size="small"
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="食品名" width="200">
        </el-table-column>

        <el-table-column label="栄養成分">
        <el-table-column
          prop="ENERC_KCAL"
          label="カロリー(kcal)"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="CARB" label="炭水化物(g)" align="center">
        </el-table-column>

        <el-table-column prop='PROT' label="たんぱく質(g)" align="center">
        </el-table-column>

        <el-table-column prop="FAT" label="脂質(g)" align="center">
        </el-table-column>

        <el-table-column prop="NACL_EQ" label="食塩" align="center">
        </el-table-column>g

        <el-table-column label="ミネラル/ビタミン" width="90">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              visible-arrow="true"
              trigger="click"
            >
              <table style="font-size: 4px">
                <tr>
                  <td>・糖質:&nbsp;&nbsp;{{ list_show[scope.$index].CHOAVL }}g</td>
                  <td>・食物繊維:&nbsp;&nbsp;{{ list_show[scope.$index].FIB }}g</td>
                  <td>
                    ・ナトリウム:&nbsp;&nbsp;{{ list_show[scope.$index].NA }}mg
                  </td>
                  <td>・カリウム:&nbsp;&nbsp;{{ list_show[scope.$index].K }}mg</td>
                  <td>
                    ・カルシウム:&nbsp;&nbsp;{{ list_show[scope.$index].CA }}mg
                  </td>
                  <td>
                    ・マグネシウム:&nbsp;&nbsp;{{ list_show[scope.$index].MG }}mg
                  </td>
                  <td>・リン:&nbsp;&nbsp;{{ list_show[scope.$index].P }}mg</td>
                </tr>
                <tr>
                  <td>・鉄:&nbsp;&nbsp;{{ list_show[scope.$index].FE }}mg</td>
                  <td>・亜鉛:&nbsp;&nbsp;{{ list_show[scope.$index].ZN }}mg</td>
                  <td>・銅:&nbsp;&nbsp;{{ list_show[scope.$index].CU }}mg</td>
                  <td>・マンガン:&nbsp;&nbsp;{{ list_show[scope.$index].MN }}mg</td>
                  <td>・ヨウ素:&nbsp;&nbsp;{{ list_show[scope.$index].ID }}μg</td>
                  <td>・セレン:&nbsp;&nbsp;{{ list_show[scope.$index].SE }}μg</td>
                  <td>・クロム:&nbsp;&nbsp;{{ list_show[scope.$index].CR }}μg</td>
                </tr>
                <tr>
                  <td>
                    ・モリブデン:&nbsp;&nbsp;{{ list_show[scope.$index].MO }}μg
                  </td>
                  <td>
                    ・ビタミンA:&nbsp;&nbsp;{{ list_show[scope.$index].CARTBEQ }}μg
                  </td>
                  <td>
                    ・ビタミンC: &nbsp;&nbsp;{{ list_show[scope.$index].VITC }}μg
                  </td>
                  <td>
                    ・ビタミンD:&nbsp;&nbsp;{{ list_show[scope.$index].VITD }}μg
                  </td>
                  <td>
                    ・ビタミンE:&nbsp;&nbsp;{{ list_show[scope.$index].VITE }}μg
                  </td>
                  <td>
                    ・ビタミンK:&nbsp;&nbsp;{{ list_show[scope.$index].VITK }}μg
                  </td>
                  <td>
                    ・ビタミンB<sub>1</sub>:&nbsp;&nbsp;{{
                      list_show[scope.$index].THIA
                    }}mg
                  </td>
                </tr>
                <tr>
                  <td>
                    ・ビタミンB<sub>2</sub>:&nbsp;&nbsp;{{
                      list_show[scope.$index].RIBF
                    }}mg
                  </td>
                  <td>
                    ・ナイアシン:&nbsp;&nbsp;{{ list_show[scope.$index].NIA }}mg
                  </td>
                  <td>
                    ・ビタミンB<sub>6</sub>:&nbsp;&nbsp;{{
                      list_show[scope.$index].VITB6A
                    }}mg
                  </td>
                  <td>
                    ・ビタミンB<sub>12</sub>:&nbsp;&nbsp;{{
                      list_show[scope.$index].VITB12
                    }}μg
                  </td>
                  <td>・ 葉酸:&nbsp;&nbsp;{{ list_show[scope.$index].FOL }}μg</td>
                  <td>
                    ・パントテン酸:&nbsp;&nbsp;{{ list_show[scope.$index].PANTAC }}mg
                  </td>
                  <td>
                    ・ビオチン:&nbsp;&nbsp;{{ list_show[scope.$index].BIOT }}μg
                  </td>
                </tr>
              </table>
              <el-button slot="reference" circle size='small' icon="el-icon-arrow-down" style="width: 32px"></el-button>
            </el-popover>
          </template>
        </el-table-column>
        </el-table-column>

        <el-table-column label="グラム" width="200">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              @change="sumValue();list_value_by_num(scope.row.num/100,scope.$index);"
              :min="0"
              :max="9999"
              label="グラム"
              size="mini"
              :step="50"
            ></el-input-number>&nbsp;&nbsp;g
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 右半部 -->
    <div class="rightBlock">

      <Form v-show="drawerIsShow" class="form"> </Form>

      <div class="table">
         本日の摂取量
        <div class="progress-block">
       cal
       <div class="progress">
        <div class="el-progress-icon">
          <i class="el-icon-success" style="color:#67C23A" v-show="(100*totalValue.totalCal/calNeeded).toFixed(0)>90 & (100*totalValue.totalCal/calNeeded).toFixed(0)<=110"></i>
          <i class="el-icon-warning" style="color:#F56C6C" v-show="(100*totalValue.totalCal/calNeeded).toFixed(0)>110"></i></div>
        <el-progress
          :stroke-width="20"
          :percentage= (100*totalValue.totalCal/calNeeded).toFixed(0)
          :color = 'customColorMethod'
        ></el-progress>
          </div>
        </div>
        <div class="progress-block">
          carb
        <div class="progress">
        <div class="el-progress-icon">
          <i class="el-icon-success" style="color:#67C23A" v-show="(100*totalValue.rows[0].gram/carbNeeded).toFixed(0)>90 & (100*totalValue.rows[0].gram/carbNeeded).toFixed(0)<=110"></i>
          <i class="el-icon-warning" style="color:#F56C6C" v-show="(100*totalValue.rows[0].gram/carbNeeded).toFixed(0)>110"></i></div>
        <el-progress
          :stroke-width="20"
          :percentage = (100*totalValue.rows[0].gram/carbNeeded).toFixed(0)
          :color = 'customColorMethod'
        ></el-progress>
        </div>
        </div>
        <div class="progress-block">
        prot
        <div class="progress">
        <div class="el-progress-icon">
          <i class="el-icon-success" style="color:#67C23A" v-show="(100*totalValue.rows[1].gram/protNeeded).toFixed(0)>90 & (100*totalValue.rows[1].gram/protNeeded).toFixed(0)<=110"></i>
          <i class="el-icon-warning" style="color:#F56C6C" v-show="(100*totalValue.rows[1].gram/protNeeded).toFixed(0)>110"></i></div>
        <el-progress
          :stroke-width="20"
          :percentage = (100*totalValue.rows[1].gram/protNeeded).toFixed(0)
        ></el-progress>
        </div>
        </div>
        <div class="progress-block">
        Fat
        <div class="progress">
        <div class="el-progress-icon">
          <i class="el-icon-success" style="color:#67C23A" v-show="(100*totalValue.rows[2].gram/fatNeeded).toFixed(0)>90 & (100*totalValue.rows[2].gram/fatNeeded).toFixed(0)<=110"></i>
          <i class="el-icon-warning" style="color:#F56C6C" v-show="(100*totalValue.rows[2].gram/fatNeeded).toFixed(0)>110"></i></div>
        <el-progress
          :stroke-width="20"
          :percentage = (100*totalValue.rows[2].gram/fatNeeded).toFixed(0)
        ></el-progress>
        </div>
        </div>

        </div>
        <div class="chart">
          <ChartMacronutrients v-bind:totalValue="totalValue" ></ChartMacronutrients>
        </div >

      </div>

  </div>
</template>

<script>
import foods from '../assets/foods.json'
import ChartMacronutrients from './ChartMacronutrients.vue'
import Form from './Form.vue'
import bus from '../assets/eventBus'

export default {
  name: 'Home',
  data () {
    return {
      // 抽屉是否显示
      drawerIsShow: true,
      // 营养值数据库from food.json
      foods: foods,
      // 已选的数据（在表格中展示）
      list: [],
      list_show: [],
      // 合计数据
      calNeeded: 0,
      carbNeeded: 0,
      protNeeded: 0,
      fatNeeded: 0,
      totalValue: {
        columns: ['Nutrition', 'gram'],
        rows: [
          { Nutrition: '炭水化物', gram: 0 },
          { Nutrition: 'タンパク質', gram: 0 },
          { Nutrition: '脂質', gram: 0 }
        ],
        totalCal: 0
      }
    }
  },
  computed: {},
  methods: {
    // 将合计值传给totalValue
    sumValue () {
      var sumCarb = this.list
        .map((row) => row.CARB * row.num)
        .reduce((acc, cur) => parseInt(cur) + acc, 0) // 计算list中每个CARB与num乘积的合计值
      var sumPro = this.list
        .map((row) => row.PROT * row.num)
        .reduce((acc, cur) => parseInt(cur) + acc, 0) // 计算list中每个PROT与num乘积的合计值
      var sumFat = this.list
        .map((row) => row.FAT * row.num)
        .reduce((acc, cur) => parseInt(cur) + acc, 0) // 计算list中每个FAT与num乘积合计值
      var sumCal = this.list
        .map((row) => row.ENERC_KCAL * row.num)
        .reduce((acc, cur) => parseInt(cur) + acc, 0) // 计算list中每个Cal与num乘积合计值
      this.totalValue.rows[0].gram = sumCarb / 100
      this.totalValue.rows[1].gram = sumPro / 100
      this.totalValue.rows[2].gram = sumFat / 100
      this.totalValue.totalCal = sumCal / 100
    },
    // 计算LIST属性
    list_value_by_num (num, index) {
      this.list_show[index].CARB = (this.list[index].CARB * num).toFixed(1)
      this.list_show[index].PROT = (this.list[index].PROT * num).toFixed(1)
      this.list_show[index].FAT = (this.list[index].FAT * num).toFixed(1)
      this.list_show[index].ENERC_KCAL = (
        this.list[index].ENERC_KCAL * num
      ).toFixed(1)
      this.list_show[index].NACL_EQ = (this.list[index].NACL_EQ * num).toFixed(
        1
      )
      this.list_show[index].CHOAVL = (this.list[index].CHOAVL * num).toFixed(1)
      this.list_show[index].FIB = (this.list[index].FIB * num).toFixed(1)
      this.list_show[index].NA = (this.list[index].NA * num).toFixed(1)
      this.list_show[index].K = (this.list[index].K * num).toFixed(1)
      this.list_show[index].CA = (this.list[index].CA * num).toFixed(1)
      this.list_show[index].MG = (this.list[index].MG * num).toFixed(1)
      this.list_show[index].P = (this.list[index].P * num).toFixed(1)
      this.list_show[index].FE = (this.list[index].FEB * num).toFixed(1)
      this.list_show[index].ZN = (this.list[index].ZNB * num).toFixed(1)
      this.list_show[index].CU = (this.list[index].CU * num).toFixed(1)
      this.list_show[index].MN = (this.list[index].MN * num).toFixed(1)
      this.list_show[index].ID = (this.list[index].ID * num).toFixed(1)
      this.list_show[index].SE = (this.list[index].SE * num).toFixed(1)
      this.list_show[index].CR = (this.list[index].CR * num).toFixed(1)
      this.list_show[index].MO = (this.list[index].MO * num).toFixed(1)
      this.list_show[index].CARTBEQ = (this.list[index].CARTBEQ * num).toFixed(
        1
      )
      this.list_show[index].VITD = (this.list[index].VITD * num).toFixed(1)
      this.list_show[index].VITK = (this.list[index].VITK * num).toFixed(1)
      this.list_show[index].THIA = (this.list[index].THIA * num).toFixed(1)
      this.list_show[index].RIBF = (this.list[index].RIBF * num).toFixed(1)
      this.list_show[index].NIA = (this.list[index].NIA * num).toFixed(1)
      this.list_show[index].VITB6A = (this.list[index].VITB6A * num).toFixed(1)
      this.list_show[index].VITB12 = (this.list[index].VITB12 * num).toFixed(1)
      this.list_show[index].FOL = (this.list[index].FOL * num).toFixed(1)
      this.list_show[index].PANTAC = (this.list[index].PANTAC * num).toFixed(1)
      this.list_show[index].BIOT = (this.list[index].BIOT * num).toFixed(1)
      this.list_show[index].VITC = (this.list[index].VITC * num).toFixed(1)
      this.list_show[index].VITE = (this.list[index].VITE * num).toFixed(1)
    },
    // 进度条颜色
    customColorMethod (percentage) {
      if (percentage > 110) {
        return '#F56C6C'
      } else if (percentage > 90) {
        return '#67C23A'
      } else {
        return '#409EFF'
      }
    },
    // 加号按钮 -> 加入list/listshow(表格)中
    add: function (
      name,
      CARB,
      PROT,
      FAT,
      ENERC_KCAL,
      NACL_EQ,
      CHOAVL,
      FIB,
      NA,
      K,
      CA,
      MG,
      P,
      FE,
      ZN,
      CU,
      MN,
      ID,
      SE,
      CR,
      MO,
      CARTBEQ,
      VITD,
      VITK,
      THIA,
      RIBF,
      NIA,
      VITB6A,
      VITB12,
      FOL,
      PANTAC,
      BIOT,
      VITC,
      VITE
    ) {
      this.list.push({
        name,
        CARB,
        PROT,
        FAT,
        ENERC_KCAL,
        NACL_EQ,
        CHOAVL,
        FIB,
        NA,
        K,
        CA,
        MG,
        P,
        FE,
        ZN,
        CU,
        MN,
        ID,
        SE,
        CR,
        MO,
        CARTBEQ,
        VITD,
        VITK,
        THIA,
        RIBF,
        NIA,
        VITB6A,
        VITB12,
        FOL,
        PANTAC,
        BIOT,
        VITC,
        VITE,
        num: '100',
        tCHOCDF: CARB / 100
      })
      this.list_show.push({
        name,
        CARB,
        PROT,
        FAT,
        ENERC_KCAL,
        NACL_EQ,
        CHOAVL,
        FIB,
        NA,
        K,
        CA,
        MG,
        P,
        FE,
        ZN,
        CU,
        MN,
        ID,
        SE,
        CR,
        MO,
        CARTBEQ,
        VITD,
        VITK,
        THIA,
        RIBF,
        NIA,
        VITB6A,
        VITB12,
        FOL,
        PANTAC,
        BIOT,
        VITC,
        VITE,
        num: '100',
        tCHOCDF: CARB / 100
      })
    },
    // delete from list/list_show
    handleDelete (index) {
      this.list.splice(index, 1)
      this.list_show.splice(index, 1)
    }
  },
  components: {
    ChartMacronutrients,
    Form
  },
  created () {
    bus.$on('Cal', (res) => {
      // busから値を取得
      this.calNeeded = res
    })
    bus.$on('Carb', (res) => {
      // busから値を取得
      this.carbNeeded = res
    })
    bus.$on('Prot', (res) => {
      // busから値を取得
      this.protNeeded = res
    })
    bus.$on('Fat', (res) => {
      // busから値を取得
      this.fatNeeded = res
    })
  }
}
</script>

<style>
#app {
  margin-top: 100px;
  padding: 0px;
  top: 0;
  left: 0;
  z-index: -1;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 80%;
  position: absolute;
  background-color: rgb(217, 180, 252);
  background-size: cover;
}
.leftBlock {
  float: left;
  background-color: 204, 255, 255;
  height: 100%;
  width: 72%;
}
.search {
  width: 400px;
}
.rightBlock {
  position: relative;
  overflow: hidden;
  height: 100%;
  float: right;
  width: 28%;
  background-color: yellow;
}
.form {
  height: 500px;
  width: 480px;
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
  width: 350px;
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
