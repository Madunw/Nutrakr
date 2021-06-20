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
      <el-table   :data="list"   stripe   show-summary   style="width: 100%" >   
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
              <el-input-number v-model="scope.row.num" @change="handleChange" :min="0" :max="100" label="数量"></el-input-number>
          </template>
          </el-table-column>
      </el-table>
    </div>
    <!-- 右半部 -->
    <div class="Calculator-right">
        <ve-ring :data="chartData" :extend="extend"></ve-ring>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      
        list: [
          {
            num: 1,
            name: "banana",
            Carbohydrate:  168,
            Protein: 2,
            Fat: 3,
            Calorie: 6,
            ServingSize: "g"
          }
          ],
        // sumFat : list.reduce((sum, e) => sum + Fat(e.number || 0), 0),
        foods: [
          {
            name: "りんご",
            Carbohydrate: 16,
            Protein: 2,
            Fat: 3,
            Calorie: 56,
            ServingSize: "g",
            num: 1
          },
          {
            name: "banana",
            Carbohydrate: 162,
            Protein: 2,
            Fat: 3,
            Calorie: 6,
            ServingSize: "g",
            num: 1
          },
          {
            name: "orange",
            Carbohydrate: 12,
            Protein: 2,
            Fat: 3,
            Calorie: 6,
            ServingSize: "g",
            num: 1
          },
          {

            name: "melon",
            Carbohydrate: 12,
            Protein: 0,
            Fat: 3,
            Calorie: 56,
            ServingSize: "g",
            num: 1
          },
          {
            name: "rice",
            Carbohydrate: 12,
            Protein: 2,
            Fat: 5,
            Calorie: 56,
            ServingSize: "g",
            num: 1
          },
          {
            name: "milk",
            Carbohydrate: 12,
            Protein: 2,
            Fat: 3,
            Calorie: 56,
            ServingSize: "g",
            num: 1
          }
        ],
        // 图表数据
        chartData: {
          columns: ['Nutrition', 'gram'],
          rows: [
            { 'Nutrition': 'Carbohydrate', 'gram': 1, },
            { 'Nutrition': 'Protein', 'gram': 1, },
            { 'Nutrition': 'Fat', 'gram': 4, },
          ]
        }
    }
  },
  computed:{
        sumFat:function(){
            sumFat = 0;
          this.list.forEach(function (item){
            sumFat+=item.Fat;
          })
          return sumFat;
        },
  },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      // 加号按钮 -> 加入表格中
      add: function (name, Carbohydrate, Protein, Fat, Calorie, ServingSize, num) {
          this.list.push({
            name , Calorie, Carbohydrate, Protein, Fat, ServingSize, num
          });
        },

      // 计算合计值
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'total';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' g';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
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