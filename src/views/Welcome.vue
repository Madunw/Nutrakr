<!-- Langding page -->
<template>
  <div class="welcomepage">
    <div class="main-area">
      <!-- welcome headlines and slogans -->
      <transition name="fade">
        <div class="box" v-show="showWelcome">
          <div class="main-headline">
            <h1>Tracking Your Intake <br />Calculate Recipe Nutrition</h1>
          </div>
          <div class="sub-headline" v-for="item in subHeadlines" :key="item.id">
            <h4>{{ item.text }}</h4>
          </div>
          <div class="button-area">
            <span class="welcome-button"
              >
                <el-button type="primary" round @click="connect"
                  >Connect Wallet</el-button
                >
              
              <div class="button-hint" style="max-width:100%">
                Connect metamask wallet wo track your weight
              </div></span
            ><span class="welcome-button"
              ><el-button
                type="primary"
                round
                plain
                @click="continueWithoutWallet"
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
          <div>
            <strong>Your Address : </strong>{{ $store.state.userAddress }}
            <span v-show="!isConnected"
              ><el-button type="primary" round @click="reconnect"
                >Connect Wallet</el-button
              ></span
            >
            <el-button
              type="primary"
              round
              v-show="isConnected"
              @click="record(weight, caloriesNeeded)"
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
          <transition name="fade">
            <div v-if="isConnected"><Challenge></Challenge></div
          ></transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';
import Result from '@/components/Result.vue';
import Challenge from '@/components/Challenge.vue';
import { ethers } from 'ethers';
import {
  userInfoAddressABI,
  userInfoAddressAddress,
} from '../../smart_contracts/contract';
import { mapState } from 'vuex';
export default {
  name: 'Welcome',
  data() {
    return {
      subHeadlines: [
        {
          text: 'Simplify your nutrition journey',
          id: 1,
        },
        {
          text: 'Calculate your nutrition needs',
          id: 2,
        },
        {
          text: 'Calculate recipe nutrition',
          id: 3,
        },
        {
          text: 'Reach your goal to earn crypto rewards',
          id: 4,
        },
      ],
    };
  },
  components: {
    Form,
    Result,
    Challenge,
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
        this.$notify.info({
          message: 'Please install metamask',
        });
        return;
      }
      const [address] = await this.Provider().send('eth_requestAccounts', []);
      this.$store.state.userAddress = address; // set user address
      this.$notify({
        message: 'metamask connected',
        type: 'success',
      });
      this.$store.state.welcome.isConnected = true;
    },
    connect() {
      this.connectWallet();
      this.$store.state.welcome.showWelcome = false; // hide welcome box
      this.$store.state.welcome.showForm = true; // show form box
    },
    reconnect() {
      this.connectWallet();
    },
    // continue without wallet
    continueWithoutWallet() {
      this.$store.state.welcome.showWelcome = false; // hide welcome box
      this.$store.state.welcome.showForm = true; // show form box
    },
    Provider() {
      return new ethers.providers.Web3Provider(window.ethereum);
    },
    // get UserInfo contract
    getUserInfoContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ContractCounter = new ethers.Contract(
        userInfoAddress,
        userInfoABI,
        signer
      );
      return ContractCounter;
    },
    // record user info into UserInfo Contract
    async record(weight, caloriesNeeded) {
      if (this.$store.state.userAddress == '') {
        this.$notify.info({
          message: 'Please connect wallet first',
        });
        return;
      }
      await this.getUserInfoContract().setUserInfo(weight, caloriesNeeded);
    },
  },
};
</script>

<style scoped>

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
  margin-top: 3rem;
  width: 60%;
  height: 100%;
}
.main-area {
  margin-left: 6%;
  float: left;
  width: 40%;
  height: 90%;
  justify-content: center;
  align-items: center;
  max-width: 60vw;
}
h1 {
  font-size: 2.4rem;
}
.box {
  width: 40%;
  height: 70%;
  top: 20%;
  margin-top: 3%;
  position: absolute;
}
.main-headline {
  font-size: 1.7rem;
  margin: 2rem auto;
  text-align: justify;
  color: rgb(48, 49, 65);
}
.sub-headline {
  margin: 0.2rem;
  text-align: justify;
  color: rgb(91, 103, 117);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.button-area {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.welcome-button {
  flex: 1;
}
button {
  height: 2.2rem;
}
.button-hint {
  color: rgb(143, 143, 143);
  font-size: 0.8rem;
}

.form {
  left: 12%;
}
.result {
  width: 42rem;
  text-align: left;
}
.result button {
  margin: 3rem;
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

@media screen and (max-width: 768px) {
  .main-headline h1 {
    font-size: 1.5rem;
  }
  .sub-headline h4 {
    font-size: 14px;
  }
  .welcome-button {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
