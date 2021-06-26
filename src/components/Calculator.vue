<template >
  <div class="Calculator" > 
    <!-- 左半部 -->
    <div class="Calculator-left">
        <!-- 搜索框 -->
        <el-select v-model="name" filterable placeholder="Foods e.g. Apple" >
          <el-option  v-for="item in foods"  :key="item.name"  :label="item.name"  :value="item.name" >
           <el-button icon="el-icon-plus" size="mini" circle @click="add(item.name, item.Carbohydrate, item.Protein, item.Fat, item.Calorie, item.ServingSize, item.num)"></el-button>
            {{item.name}}
          </el-option>
        </el-select>
     
  
  
       <!-- 表格 -->   
      <el-table   :data="list"   stripe   style="width: 100%" >   
          <el-table-column     prop="name"     label="食物名"     width="180">   
          </el-table-column>   
          <el-table-column     prop="Carbohydrate"     label="糖分"> 
          </el-table-column>   
  
          <el-table-column     prop="Protein"     label="蛋白质">   
          </el-table-column>   
  
          <el-table-column     prop="Fat"     label="脂肪">   
          </el-table-column>  
  
          <el-table-column     prop="Calorie"     label="卡路里">  
          </el-table-column>   
  
          <el-table-column  prop="num" label="数量" > 
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" @change="sumValue" :min="0" :max="100" label="数量" size="small"></el-input-number>
          </template>
          </el-table-column>
      </el-table>
     
    </div>
    <!-- 右半部 -->
    <div class="Calculator-right">
        <ve-ring :data="totalValue" :extend="extend"></ve-ring>
    </div>
  </div>
</template>
add
<script>
import foods from "../../static/foods.json";
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
            { 'Nutrition': 'Carbohydrate', gram: 0, },
            { 'Nutrition': 'Protein', gram: 0, },
            { 'Nutrition': 'Fat', gram: 0 , },
          ]
        }
    }
  },
  computed: {
        //将合计值传给totalValue
        sumValue() {
            var sumCar = this.list.map(row => row.Carbohydrate * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个Carbohydrate与num乘积的合计值
            var sumPro = this.list.map(row => row.Protein * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个Protein与num乘积的合计值
            var sumFat = this.list.map(row => row.Fat * row.num).reduce((acc, cur) => (parseInt(cur) + acc), 0);//计算list中每个Fat与num乘积合计值
            this.totalValue.rows[0].gram = sumCar;
            this.totalValue.rows[1].gram = sumPro;
            this.totalValue.rows[2].gram = sumFat;
        },
  },
  methods: {
      // 加号按钮 -> 加入list(表格)中
      add: function (name, Carbohydrate, Protein, Fat, Calorie) {
          this.list.push({
            name , Calorie, Carbohydrate, Protein, Fat, ServingSize:"1", num:"1"
          });
        },
    }
}
</script>

<style scoped>
.Calculator {
  margin-top: 10%;
  background-color: black;
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