<template >
  <div class="Calculator" > 
    <!-- 左半部 -->
    <div class="Calculator-left">
        <!-- 搜索框 -->
        <el-select v-model="name" filterable v-loading="loading" placeholder="Foods e.g. Apple" >
          <el-option  v-for="item in foods"  :key="item.name"  :label="item.name"  :value="item.name" >
           <el-button icon="el-icon-plus" size="mini" circle 
              @click="add(item.name, item.CHOCDF, item.PROT, item.FAT, item.ENERC_KCAL,item.NACL_EQ, item.CHOAVL, item.FIB, item.NA, item.K, item.CA,item.MG, item.P, item.FE, item.ZN, item.CU, item.MN, item.ID,item.SE, item.CR, item.MO, item.CARTBEQ, item.VITD, item.VITK, item.THIA, item.RIBF,item.NIA, item.VITB6A, item.VITB12, item.FOL, item.PANTAC, item.BIOT,item.VITC, item.VITE, item.Size, item.num)">
            </el-button>
            &nbsp;&nbsp;{{item.name}}
          </el-option>
        </el-select>

  
        {{sumCarb}}
       <!-- 表格 -->   
      <el-table   :data="list"   stripe   v-loading="loading" style="width: 100%"> 
          
          <!-- 移除按钮 -->
          <el-table-column  align="right" label=" " width="45">
            <template slot-scope="scope">
              <!-- 从list中移除 -->
              <el-button  size="small" circle icon="el-icon-delete" @click="handleDelete(scope.$index)"></el-button>
            </template>
          </el-table-column>

          <el-table-column     prop="name"     label="食品名"    width="200">   
          </el-table-column> 

          <el-table-column     prop="ENERC_KCAL"     label="熱量(kcal)" align="center">  
          </el-table-column> 

          <el-table-column     prop="CHOCDF"     label="炭水化物(g)" align="center"> 
          </el-table-column>   
  
          <el-table-column     prop="PROT"     label="たんぱく質(g)" align="center">   
          </el-table-column>   
  
          <el-table-column     prop="FAT"     label="脂質(g)" align="center">   
          </el-table-column>  

          <el-table-column     prop="NACL_EQ"     label="食塩(g)" align="center">  
          </el-table-column> 

          <el-table-column width="150"> 
            <template slot-scope="scope"> 
              <el-popover  placement="bottom"  visible-arrow="true" width="50px" trigger="click">
                <table style="font-size: 4px">
                  <tr>
                    <td>・糖質: {{list[scope.$index].CHOAVL}}g</td><td>・食物繊維: {{list[scope.$index].FIB}}g</td><td>・ナトリウム: {{list[scope.$index].NA}}mg</td><td>・カリウム: {{list[scope.$index].K}}mg</td>
                    <td>・カルシウム: {{list[scope.$index].CA}}mg</td><td>・マグネシウム: {{list[scope.$index].MG}}mg</td><td>・リン: {{list[scope.$index].P}}mg</td>
                  </tr>
                  <tr>
                    <td>・鉄: {{list[scope.$index].FE}}mg</td><td>・亜鉛: {{list[scope.$index].ZN}}mg</td><td>・銅: {{list[scope.$index].CU}}mg</td><td>・マンガン: {{list[scope.$index].MN}}mg</td>
                    <td>・ヨウ素: {{list[scope.$index].ID}}μg </td><td>・セレン: {{list[scope.$index].SE}}μg</td><td>・クロム: {{list[scope.$index].CR}}μg</td>
                  </tr>
                  <tr>
                    <td>・モリブデン: {{list[scope.$index].MO}}μg</td><td>・ビタミンA: {{list[scope.$index].CARTBEQ}}μg</td><td>・ビタミンC: {{list[scope.$index].VITC}}μg</td><td>・ビタミンD: {{list[scope.$index].VITD}}μg</td>
                    <td>・ビタミンE: {{list[scope.$index].VITE}}μg</td><td>・ビタミンK: {{list[scope.$index].VITK}}μg</td><td>・ビタミンB<sub>1</sub>: {{list[scope.$index].THIA}}mg</td>
                  </tr>
                  <tr>
                    <td>・ビタミンB<sub>2</sub>: {{list[scope.$index].RIBF}}mg</td><td>・ナイアシン: {{list[scope.$index].NIA}}mg</td><td>・ビタミンB<sub>6</sub> {{list[scope.$index].VITB6A}}mg</td><td>・ビタミンB<sub>12</sub>: {{list[scope.$index].VITB12}}μg</td> 
                    <td>・ 葉酸: {{list[scope.$index].FOL}}μg</td><td>・パントテン酸: {{list[scope.$index].PANTAC}}mg</td><td>・ビオチン: {{list[scope.$index].BIOT}}μg</td>
                  </tr>
                </table>
              <el-button slot="reference">⊽</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column     prop="Size"     label="" class="test" width="62">  
          </el-table-column>  
  
          <el-table-column  prop="num" width="143"> 
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" @change="sumValue" :min="0" :max="99" label="数量" size="mini"></el-input-number>
            </template>
          </el-table-column>

          
        
        </el-table>
     
    </div>
    <!-- 右半部 -->
    <div>
      
    </div>
    <div class="Calculator-right">
        <ve-ring :data="totalValue" :extend="extend"></ve-ring>
    </div>
  </div>
</template>
<script>
import foods from "../../static/foods2.json";
export default {
  name: 'Calculator',
  data () {
    return {
        //营养值数据库form food.json
        foods: foods,

        //已选的数据（在表格中展示）
        list: [
          ],
        // 合计数据
        totalValue: {
          columns: ['Nutrition', 'gram'],
          rows: [
            { 'Nutrition': 'CHOCDF', gram: 0, },
            { 'Nutrition': 'PROT', gram: 0, },
            { 'Nutrition': 'FAT', gram: 0 , },
          ]
        }
    }
  },
  computed: {
        //将合计值传给totalValue
        sumValue() {
            var sumCarb = this.list.map(row => row.CHOCDF * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个CHOCDF与num乘积的合计值
            var sumPro = this.list.map(row => row.PROT * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个PROT与num乘积的合计值
            var sumFat = this.list.map(row => row.FAT * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个FAT与num乘积合计值
            this.totalValue.rows[0].gram = sumCarb;
            this.totalValue.rows[1].gram = sumPro;
            this.totalValue.rows[2].gram = sumFat;
        },
  },
  methods: {
      // 加号按钮 -> 加入list(表格)中
      add: function (name,CHOCDF,PROT,FAT,ENERC_KCAL,NACL_EQ,CHOAVL,FIB,NA,K,CA,MG,P,FE,ZN,CU,MN,ID,SE,CR,MO,CARTBEQ,VITD,VITK,THIA, RIBF,NIA,VITB6A,VITB12,FOL, PANTAC, BIOT,VITC, VITE, Size, num) {
          this.list.push({
            name,CHOCDF,PROT,FAT,ENERC_KCAL,NACL_EQ,CHOAVL,FIB,NA,K,CA,MG,P,FE,ZN,CU,MN,ID,SE,CR,MO,CARTBEQ,VITD,VITK,THIA, RIBF,NIA,VITB6A,VITB12,FOL, PANTAC, BIOT,VITC, VITE, Size:"100g  *", num:"1"
          });
        },
      //从list中删除
      handleDelete(index) {
        this.list.splice(index,1)
      }
    }
}
</script>

<style scoped>
.Calculator {
  margin-top: 10%;
  background-color: rgb(187, 168, 168);
  height: 80%;
  width: 100%;
}
.Calculator-left {
  float: left;
  background-color: aqua;
  height: 100%;
  width: 60%;
}
.Calculator-right {
  float: right;
  background-color: pink;
  height: 100%;
  width: 40%;
}
table td{
  border-left:5px
}
</style>