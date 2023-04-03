<template>
  Get crypto token reward for reaching target weight after 28 days
  <div v-show="!isInChallenge">
    <el-button type="primary" round @click="startChallenge(weight, goalWeight)"
      >Start Challenge</el-button
    >
    <el-button type="primary" round @click="getChallengerData()"
      >Get Challenger Data</el-button
    >
  </div>
  <div v-show="isInChallenge">
    Day {{ challengeStartTime }} of the challenge
    <el-button type="primary" round @click="getReward(weight)"
      >Get Reward</el-button
    >
  </div>
</template>

<script>
import { ethers } from 'ethers';
import { mapState } from 'vuex';
import { challengeABI, challengeAddress } from '../../smart_contracts/contract';
export default {
  name: 'Challenge',
  data() {
    return {
      isInChallenge: false, //是否在挑战中，由链上数据判断
      challengeStartTime: 0, //挑战开始时间，由链上数据判断
    };
  },
  computed: {
    ...mapState({
      weight: (state) => state.form.weight,
      goalWeight: (state) => state.form.goalWeight,
    }), //Get data from vuex store
  },
  methods: {
    // get challenge contract
    getChallengeContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ContractCounter = new ethers.Contract(
        challengeAddress,
        challengeABI,
        signer
      );
      return ContractCounter;
    },
    // Call the startChallenge function in the Challenge contract
    async startChallenge(_weight, _goalWeight) {
      console.log(weight, goalWeight);
      if (this.$store.state.userAddress == '') {
        this.$notify.info({
          message: 'Please connect wallet first',
        });
        return;
      }
      await this.getChallengeContract().startChallenge(_weight, _goalWeight);
      this.getChallengerData(); //  get ChallengerData
    },
    async getReward(_weight) {
      if (this.$store.state.userAddress == '') {
        this.$notify.info({
          message: 'Please connect wallet first',
        });
        return;
      }
      const asd = await this.getChallengeContract().receiveReward(_weight);
      console.log(asd);
    },
    // Call the getChallengerData function in the Challenge contract to get ChallengerData
    async getChallengerData() {
      if (this.$store.state.userAddress == '') {
        this.$notify.info({
          message: 'Please connect wallet first',
        });
        return;
      }
      const events = await this.getChallengeContract().getChallengerData();
      this.isInChallenge = events.isInChallenge;
      this.challengeStartTime = this.getDaysAgo(
        parseInt(events.challengeStartTime._hex, 16)
      ); //convert to decimal
    },
    // 将时间戳转换为日期对象
    getDaysAgo(_timestamp) {
      _timestamp = _timestamp * 1000;
      const date = new Date(_timestamp);
      // 获取当前日期的时间戳
      const now = Date.now();
      // 计算时间差，单位为秒
      const diffInSeconds = Math.floor((now - _timestamp) / 1000);
      // 计算时间差，单位为天
      const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
      return diffInDays;
    },
  },
  mounted() {
    //进入路由时自动获取链上记录
    // Automatically get records on the blockchain when entering the route
    this.getChallengerData();
  },
};
</script>
<style scoped></style>
