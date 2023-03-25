<!-- search bar component to serch data from database  -->
<template>
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
        &nbsp;&nbsp;{{ item.name
        }}<el-button
          class="addButton"
          size="default"
          plain
          circle
          @click="addToList(item.name)"
          >
          <!-- trash can icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="svg"
          >
            <path
              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
            />
          </svg>
        </el-button>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import foods from '@/store/foods.json';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      // 营养值数据库 from nutrition database
      foods: foods,
    };
  },
  computed: {
    ...mapState({ list: (state) => state.calculator.list }), // 映射 mapping
  },
  methods: {
    ...mapMutations(['addToList']),
  },
};
</script>
<style scoped>
.svg {
  width: 15px;
  height: 15px;
}
.addButton {
  float: right;
}
</style>
