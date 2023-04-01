<!-- Langding page -->
<template>
  <div class="welcomepage">
    <div class="main-area">
      <!-- welcome headlines and slogans -->
      <transition name="fade">
        <div class="box welcome" v-show="showWelcome">
          <div class="main-headline">
            <h1 style="font-size: 50px">
              Tracking Your Intake <br />Calculate Recipe Nutrition
            </h1>
          </div>
          <div class="sub-headline">
            <h4>Check calories, portions, and macros</h4>
          </div>
          <div class="sub-headline">
            <h4>Simplify your nutrition journey</h4>
          </div>
          <div class="sub-headline">
            <h4>Estimate the number of daily calories your body needs</h4>
          </div>
          <div class="sub-headline">
            <h4>Reach your goal to earn crypto rewards</h4>
          </div>

          <div class="button-area">
            <span class="welcome-button"
              ><div>
                <el-button type="primary" round @click="connect"
                  >Connect Wallet</el-button
                >
              </div>
              <div class="hint">
                Connect metamask wallet wo track your weight
              </div></span
            ><span class="welcome-button"
              ><el-button type="primary" round plain @click="continueWithoutWallet"
                >Continue</el-button
              ></span
            >
          </div>
        </div>
      </transition>

      <!-- form to calculate nutrtion needs -->
      <transition name="fade">
        <div class="box form" v-show="showForm">
          <Form v-on:isSubmitted="Submit"></Form>
        </div>
      </transition>

      <!-- show form results -->
      <transition name="fade">
        <div class="box result" v-show="showResult">
          <div style="margin: 10px">
            Your Address : {{ $store.state.userAddress }}
            <span v-show="!isConnected"
              ><el-button type="primary" round @click="reconnect"
                >Connect Wallet</el-button
              ></span
            >
            <el-button
              type="primary"
              round
              v-show="isConnected"
              @click="record(weight, caloriesNeeded, goalWeight)"
              >Record</el-button
            >
          </div>

          <Result></Result>

          <span>
            <el-button type="primary" round @click="toCalculate"
              >Calculate Recipe Nutrition</el-button
            >
          </span>
          <span>
            <el-button round @click="reForm">Re-fill</el-button>
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Form from '@/components/form.vue';
import Result from '@/components/result.vue';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../../smart_contracts/contract';
import { mapState } from 'vuex';
export default {
  name: 'Welcome',
  data() {
    return {
      // showWelcome: true,
      // showForm: false,
      // showResult: false,
      // isConnected: false,
    };
  },
  components: {
    Form,
    Result,
  },
  computed: {
    ...mapState({
      caloriesNeeded: (state) => state.form.caloriesNeeded,
      weight: (state) => state.form.weight,
      goalWeight: (state) => state.form.goalWeight,
      showWelcome: (state) => state.welcome.showWelcome,
      showForm: (state) => state.welcome.showForm,
      showResult: (state) => state.welcome.showResult,
      isConnected: (state) => state.welcome.isConnected,
    }), //Get data from vuex store
  },
  methods: {
    // 提交表单
    Submit(status) {
      this.$store.state.welcome.showResult = status;
      this.$store.state.welcome.showForm = false;
    },
    // 重新调出计算表单
    // Recall the calculation form
    reForm() {
      this.$store.state.welcome.showResult = false; // hide result box
      this.$store.state.welcome.showForm = true; // show form box
    },
    // 跳转到calculate页面
    // Jump to the calculate page
    toCalculate() {
      this.$router.push({ path: '/calculator' });
    },
    // connect metamsk wallet
    async connectWallet() {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please install metamask');
        return;
      }
      const [address] = await this.Provider().send('eth_requestAccounts', []);
      this.$store.state.userAddress = address; // set user address
      console.log('metamask connected');
      this.$store.state.welcome.isConnected = true;
    },
    connect(){
      this.connectWallet();
      this.$store.state.welcome.showWelcome = false; // hide welcome box
      this.$store.state.welcome.showForm = true; // show form box
    },
    reconnect(){
      this.connectWallet();
    },
    // continue without wallet
    continueWithoutWallet() {
      this.$store.state.welcome.showWelcome = false; // hide welcome box
      this.$store.state.welcome.showForm = true; // show form box
    },
    // get contract
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
    // record user info into blockchain
    async record(weight, caloriesNeeded, goalWeight) {
      if (this.$store.state.userAddress == '') {
        console.log('Please connect wallet first');
        return;
      }
      await this.getContract().setUserInfo(weight, caloriesNeeded, goalWeight);
    },
    Provider() {
      return new ethers.providers.Web3Provider(window.ethereum);
    },
  },
};
</script>

<style>
.welcomepage {
  height: 100%;
  width: 100%;
  background-image: url(../assets/background.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right bottom;
}
.left-area {
  float: left;
  position: relative;
  width: 60%;
  height: 70%;
  /* background-color: aquamarine; */
}
.left-area img {
  margin-top: 50px;
  width: 60%;
  height: 100%;
}
.main-area {
  margin-left: 9%;
  float: left;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
}

.box {
  top: 20%;
  margin-top: 3%;
  position: absolute;
}
.main-headline {
  margin: 30px auto;
  text-align: justify;
  color: rgb(48, 49, 65);
}
.sub-headline {
  margin: 10px;
  text-align: justify;
  color: rgb(91, 103, 117);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.button-area {
  margin: 60px auto;
}
.hint {
  color: rgb(143, 143, 143);
  font-size: 3px;
}
.welcome-button {
  width: 49%;
  float: left;
}
.form {
  left: 12%;
}
.result {
  width: 42rem;
}
.result button {
  margin: 30px;
}
.fade-leave-active {
  -webkit-animation: fade-out 0.5s linear;
  animation: fade-out 0.5s linear;
}
.fade-enter-active {
  -webkit-animation: fade-in-fwd 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s
    both;
  animation: fade-in-fwd 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s both;
}

@-webkit-keyframes fade-out {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
}
@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
