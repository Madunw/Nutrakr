<!-- history page -->
<template>
  <div class="history-page">
    <!-- table to show the contract history events -->
    <el-table :data="list" style="width: 100%">
      <el-table-column label="Wallet Address"
        ><template #default="props">
          {{ props.row.args[0] }}</template
        ></el-table-column
      >
      <el-table-column label="Weight">
        <template #default="props"> {{ props.row.args[1] }} kg</template>
      </el-table-column>
      <el-table-column label="Calories Needed Per Day">
        <template #default="props"> {{ props.row.args[2] }} kcal</template>
      </el-table-column>
      <el-table-column label="Goal">
        <template #default="props"> {{ props.row.args[3] }} kg</template>
      </el-table-column>
      <el-table-column label="Time">
        <template #default="props">
          {{ timestampToTime(props.row.args[4]) }}</template
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../../smart_contracts/contract';
export default {
  data() {
    return {
      list: [],// Store data for the contract events
    };
  },
  mounted() {
    //进入路由时自动获取链上记录
    // Automatically get records on the blockchain when entering the route
    this.getUserInfoUpdatedEvents();
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
    // Get the contract instance
    getContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ContractCounter = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      return ContractCounter;
    },
    // Get UserInfoUpdated events and update the list for table data
    async getUserInfoUpdatedEvents() {
      const filter = this.getContract().filters.UserInfoUpdated();
      const events = await this.getContract().queryFilter(filter);
      console.log(events);
      this.list = events;
    },
  },
};
</script>
<style>
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
