<!-- table component  -->
<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%"
    show-summary
    :summary-method="getSummaries"
  >
    <el-table-column :align="right" label=" " width="60" fixed>
      <template #default="scope">
        <!-- 从list中移除 delete from the list in vuex -->
        <el-button circle @click="handleDelete(scope.$index)"
          ><!-- 移除按钮 delete button -->
          <img src="@/assets/trash-solid.svg" alt="delete" />
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="食品名"> </el-table-column>
    <el-table-column label="栄養成分">
      <el-table-column prop="ENERC_KCAL" label="カロリー" :align="center">
        <template #default="props">
          {{
            getValue(props.row.ENERC_KCAL, props.row.num)
          }}&nbsp;kcal</template
        >
      </el-table-column>

      <el-table-column label="炭水化物" :align="center">
        <template #default="props">
          {{ getValue(props.row.CARB, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="たんぱく質" :align="center">
        <template #default="props">
          {{ getValue(props.row.PROT, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="脂質(g)" :align="center">
        <template #default="props">
          {{ getValue(props.row.FAT, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="食塩" :align="center">
        <template #default="props">
          {{ getValue(props.row.NACL_EQ, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>
 <!-- 微量元素 Micronutrients -->
      <el-table-column type="expand" label="..." :align="center">
        <template #default="props">
          <table id="micronutrients">
            <tr>
              <td v-for="nutrient in micronutrients">
                ・{{ nutrient.label }}:&nbsp;&nbsp;{{
                  getValue(props.row[nutrient.key], props.row.num)
                }}{{ nutrient.unit }}
              </td>
            </tr>
          </table>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column label="グラム" fixed="right">
      <template #default="props">
        <el-input-number
          v-model="props.row.num"
          :min="0"
          :max="9999"
          :step="50"
          size="small"
          controls-position="right"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Table',
  data() {
    return {
      micronutrients: [
        { label: '糖質', key: 'CHOAVL', unit: 'g' },
        { label: '食物繊維', key: 'FIB', unit: 'g' },
        { label: 'ナトリウム', key: 'NA', unit: 'mg' },
        { label: 'カリウム', key: 'K', unit: 'mg' },
        { label: 'カルシウム', key: 'CA', unit: 'mg' },
        { label: 'マグネシウム', key: 'MG', unit: 'mg' },
        { label: 'リン', key: 'P', unit: 'mg' },
        { label: '鉄', key: 'FE', unit: 'mg' },
        { label: '亜鉛', key: 'ZN', unit: 'mg' },
        { label: '銅', key: 'CU', unit: 'mg' },
        { label: 'マンガン', key: 'MN', unit: 'mg' },
        { label: 'ヨウ素', key: 'ID', unit: 'μg' },
        { label: 'セレン', key: 'SE', unit: 'μg' },
        { label: 'クロム', key: 'CR', unit: 'μg' },
        { label: 'モリブデン', key: 'MO', unit: 'μg' },
        { label: 'ビタミンA', key: 'CARTBEQ', unit: 'μg' },
        { label: 'ビタミンC', key: 'VITC', unit: 'μg' },
        { label: 'ビタミンD', key: 'VITD', unit: 'μg' },
        { label: 'ビタミンE', key: 'VITE', unit: 'μg' },
        { label: 'ビタミンK', key: 'VITK', unit: 'μg' },
        { label: 'ビタミンB1', key: 'THIA', unit: 'mg' },
        { label: 'ビタミンB2', key: 'RIBF', unit: 'mg' },
        { label: 'ナイアシン', key: 'NIA', unit: 'mg' },
        { label: 'ビタミンB6', key: 'VITB6A', unit: 'mg' },
        { label: 'ビタミンB12', key: 'VITB12', unit: 'μg' },
        { label: '葉酸', key: 'FOL', unit: 'μg' },
        { label: 'パントテン酸', key: 'PANTAC', unit: 'mg' },
        { label: 'ビオチン', key: 'BIOT', unit: 'μg' },
      ],
    };
  },
  computed: {
    ...mapState({ list: (state) => state.calculator.list }), // 映射
    ...mapGetters(['sumENERC_KCAL', 'sumCARB', 'sumPROT', 'sumFAT']),
  },
  methods: {
    ...mapMutations(['computeListValueByNum', 'handleDelete']),
    // 表格中显示的数据，需要用标准值与num相乘 The data displayed in the table needs to be multiplied by the standard value and num
    getValue: function (value, num) {
      return Math.round(value * num) / 100;
    },
    // 计算表格的各项合计值 Calculate the total value of each item in the table
    getSummaries(param) {
      const { columns, data } = param;
      const sums = []; // 返回的数据
      columns.forEach((column, index) => {
        if (index === 1) {
          // 第2列 返回'合計' Column 2
          sums[index] = '合計';
          return;
        } else if (index === 2) {
          // 第3列 返回卡路里的合计值 Column 3 returns the total number of calories
          sums[index] = this.sumENERC_KCAL + ' kcal';
          return;
        } else if (index === 3) {
          sums[index] = this.sumCARB + ' g';
          return;
        } else if (index === 4) {
          sums[index] = this.sumPROT + ' g';
          return;
        } else if (index === 5) {
          sums[index] = this.sumFAT + ' g';
          return;
        } else if (index === 6) {
          let sumNACL_EQ = this.list
            .map((row) => (row.NACL_EQ * row.num) / 100)
            .reduce((acc, cur) => parseInt(cur) + acc, 0);
          sums[index] = sumNACL_EQ + ' g';
          return;
        }
      });
      return sums;
    },
  },
};
</script>

<style scoped>
img {
  width: 1rem;
  height: 1rem;
}
#micronutrients {
  position: relative;
}
#micronutrients tr {
  display: flex;
  flex-wrap: wrap;
}
#micronutrients td {
  width: 12rem;
}
@media (orientation: portrait){
    *{
      font-size: 80rem;
    }
  }
</style>
