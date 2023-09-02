<!-- history page -->
<template>
  <div class="history-page">
    <!-- table to show the contract history events -->
    <el-table :data="list" style="width: 100%">
      <el-table-column label="Wallet Address"
        ><template #default="props">
          {{ props.row.address }}</template
        ></el-table-column
      >
      <el-table-column label="Weight">
        <template #default="props"> {{ props.row.args.weight }} kg</template>
      </el-table-column>
      <el-table-column label="Calories Needed Per Day">
        <template #default="props"> {{ props.row.args.calorieNeed }} kcal</template>
      </el-table-column>
      <el-table-column label="Time">
        <template #default="props">
          {{ timestampToTime(props.row.args.timestamp) }}</template
        >
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { getUserInfoUpdatedEvents } from '../context/UserInfoContext.js';
export default {
  data() {
    return {
      list: [],// Store data for the contract events
    };
  },
  mounted() {
    //进入路由时自动获取链上记录并存入本地
    // Automatically get records on the blockchain when entering the route,and store the event as list[]
    getUserInfoUpdatedEvents().then(events => {
      this.list = events;
    });
  },
  methods: {
    // Convert a UNIX timestamp to a readable date and time string
    timestampToTime(timestamp) {
      const date = new Date(timestamp * 1000);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    },
  },
};
</script>
<style scoped>
.history-page {
  margin-top: 5%;
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
