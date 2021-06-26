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
      <el-table   :data="list"   stripe   v-loading="loading" style="width: 100%" > 
          

          <el-table-column     prop="name"     label="食品名"    >   
          </el-table-column> 

          <el-table-column     prop="ENERC_KCAL"     label="熱量(kcal)">  
          </el-table-column> 

          <el-table-column     prop="CHOCDF"     label="炭水化物(g)"> 
          </el-table-column>   
  
          <el-table-column     prop="PROT"     label="たんぱく質(g)">   
          </el-table-column>   
  
          <el-table-column     prop="FAT"     label="脂質(g)">   
          </el-table-column>  

          <el-table-column     prop="NACL_EQ"     label="食塩(g)">  
          </el-table-column> 

          <el-table-column          label="test"> 
            <template slot-scope="scope"> 
              <el-popover  placement="bottom"   width="600"  trigger="click">
                糖質:{{list[scope.$index].CHOAVL}}g  食物繊維:{{list[scope.$index].FIB}}g  
                ナトリウム:{{list[scope.$index].NA}}mg  カリウム:{{list[scope.$index].K}}mg  カルシウム:{{list[scope.$index].CA}}mg  マグネシウム:{{list[scope.$index].MG}}mg  
                リン:{{list[scope.$index].P}}mg　鉄:{{list[scope.$index].FE}}mg 亜鉛:{{list[scope.$index].ZN}}mg　銅:{{list[scope.$index].CU}}mg  マンガン:{{list[scope.$index].MN}}mg　
                ヨウ素:{{list[scope.$index].ID}}μg  セレン:{{list[scope.$index].SE}}μg  クロム:{{list[scope.$index].CR}}μg  モリブデン:{{list[scope.$index].MO}}μg  
                ビタミンA:{{list[scope.$index].CARTBEQ}}μg  ビタミンC:{{list[scope.$index].VITC}}μg  ビタミンD:{{list[scope.$index].VITD}}μg 
                ビタミンE:{{list[scope.$index].VITE}}μg  ビタミンK:{{list[scope.$index].VITK}}μg　
                ビタミンＢ1:{{list[scope.$index].THIA}}mg  ビタミンＢ2:{{list[scope.$index].RIBF}}mg  ナイアシン:{{list[scope.$index].NIA}}mg  
                ビタミンＢ6:{{list[scope.$index].VITB6A}}mg  ビタミンＢ12:{{list[scope.$index].VITB12}}μg  葉酸:{{list[scope.$index].FOL}}μg  
                パントテン酸:{{list[scope.$index].PANTAC}}mg  ビオチン:{{list[scope.$index].BIOT}}μg


                <el-button slot="reference">more</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column     prop="Size"     label="" class="test" width="65">  
          </el-table-column>  
  
          <el-table-column  prop="num" label="Size" width="140"> 
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" @change="sumValue" :min="0" :max="99" label="数量" size="mini"></el-input-number>
            </template>
          </el-table-column>

          <!-- 移除按钮 -->
          <el-table-column  align="right" label=" " width="80">
            <template slot-scope="scope">
              <!-- 从list中移除 -->
              <el-button  size="small" circle icon="el-icon-delete" @click="handleDelete(scope.$index)"></el-button>
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

</style>