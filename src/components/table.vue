<!-- table component  -->
<template>
  <el-table
    :data="list"
    stripe
    v-loading="loading"
    style="width: 100%"
    show-summary
    :summary-method="getSummaries"
  >
    <!-- 移除按钮 delete button -->
    <el-table-column align="right" label=" " width="60">
      <template #default="scope">
        <!-- 从list中移除 delete from the list in vuex -->
        <el-button circle @click="handleDelete(scope.$index)"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"
            /></svg
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="食品名"> </el-table-column>
    <el-table-column label="栄養成分">
      <el-table-column prop="ENERC_KCAL" label="カロリー" align="center">
        <template #default="props">
          {{
            getValue(props.row.ENERC_KCAL, props.row.num)
          }}&nbsp;kcal</template
        >
      </el-table-column>

      <el-table-column label="炭水化物" align="center">
        <template #default="props">
          {{ getValue(props.row.CARB, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="たんぱく質" align="center">
        <template #default="props">
          {{ getValue(props.row.PROT, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="脂質(g)" align="center">
        <template #default="props">
          {{ getValue(props.row.FAT, props.row.num) }}&nbsp;g</template
        >
      </el-table-column>

      <el-table-column label="食塩" align="center">
        <template #default="props">
          {{ getValue(props.row.NACL_EQ, props.row.num) }}&nbsp;g</template
        >
        <!-- 微量元素 Micronutrients -->
      </el-table-column>
      <el-table-column type="expand" label="..." align="center">
        <template #default="props">
          <table style="font-size: 4px">
            <tr>
              <td>
                ・糖質:&nbsp;&nbsp;{{
                  getValue(props.row.CHOAVL, props.row.num)
                }}g
              </td>
              <td>
                ・食物繊維:&nbsp;&nbsp;{{
                  getValue(props.row.FIB, props.row.num)
                }}g
              </td>
              <td>
                ・ナトリウム:&nbsp;&nbsp;{{
                  getValue(props.row.NA, props.row.num)
                }}mg
              </td>
              <td>
                ・カリウム:&nbsp;&nbsp;{{
                  getValue(props.row.K, props.row.num)
                }}mg
              </td>
              <td>
                ・カルシウム:&nbsp;&nbsp;{{
                  getValue(props.row.CA, props.row.num)
                }}mg
              </td>
              <td>
                ・マグネシウム:&nbsp;&nbsp;{{
                  getValue(props.row.MG, props.row.num)
                }}mg
              </td>
              <td>
                ・リン:&nbsp;&nbsp;{{ getValue(props.row.P, props.row.num) }}mg
              </td>

              <td>
                ・鉄:&nbsp;&nbsp;{{ getValue(props.row.FE, props.row.num) }}mg
              </td>
              <td>
                ・亜鉛:&nbsp;&nbsp;{{ getValue(props.row.ZN, props.row.num) }}mg
              </td>
              <td>
                ・銅:&nbsp;&nbsp;{{ getValue(props.row.CU, props.row.num) }}mg
              </td>
              <td>
                ・マンガン:&nbsp;&nbsp;{{
                  getValue(props.row.MN, props.row.num)
                }}mg
              </td>
              <td>
                ・ヨウ素:&nbsp;&nbsp;{{
                  getValue(props.row.ID, props.row.num)
                }}μg
              </td>
              <td>
                ・セレン:&nbsp;&nbsp;{{
                  getValue(props.row.SE, props.row.num)
                }}μg
              </td>
              <td>
                ・クロム:&nbsp;&nbsp;{{
                  getValue(props.row.CR, props.row.num)
                }}μg
              </td>
            </tr>
            <tr>
              <td>
                ・モリブデン:&nbsp;&nbsp;{{
                  getValue(props.row.MO, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンA:&nbsp;&nbsp;{{
                  getValue(props.row.CARTBEQ, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンC: &nbsp;&nbsp;{{
                  getValue(props.row.VITC, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンD:&nbsp;&nbsp;{{
                  getValue(props.row.VITD, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンE:&nbsp;&nbsp;{{
                  getValue(props.row.VITE, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンK:&nbsp;&nbsp;{{
                  getValue(props.row.VITK, props.row.num)
                }}μg
              </td>
              <td>
                ・ビタミンB<sub>1</sub>:&nbsp;&nbsp;{{
                  getValue(props.row.THIA, props.row.num)
                }}mg
              </td>

              <td>
                ・ビタミンB<sub>2</sub>:&nbsp;&nbsp;{{
                  getValue(props.row.RIBF, props.row.num)
                }}mg
              </td>
              <td>
                ・ナイアシン:&nbsp;&nbsp;{{
                  getValue(props.row.NIA, props.row.num)
                }}mg
              </td>
              <td>
                ・ビタミンB<sub>6</sub>:&nbsp;&nbsp;{{
                  getValue(props.row.VITB6A, props.row.num)
                }}mg
              </td>
              <td>
                ・ビタミンB<sub>12</sub>:&nbsp;&nbsp;{{
                  getValue(props.row.VITB12, props.row.num)
                }}μg
              </td>
              <td>
                ・ 葉酸:&nbsp;&nbsp;{{
                  getValue(props.row.FOL, props.row.num)
                }}μg
              </td>
              <td>
                ・パントテン酸:&nbsp;&nbsp;{{
                  getValue(props.row.PANTAC, props.row.num)
                }}mg
              </td>
              <td>
                ・ビオチン:&nbsp;&nbsp;{{
                  getValue(props.row.BIOT, props.row.num)
                }}μg
              </td>
            </tr>
          </table>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column label="グラム">
      <template #default="props">
        <el-input-number
          v-model="props.row.num"
          :min="0"
          :max="9999"
          :step="50"
          size="small"
          controls-position="right"
        />&nbsp;&nbsp;g
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Table',
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

<style>
svg {
  width: 15px;
  height: 15px;
}
</style>
