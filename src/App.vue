<template>
  <!-- header -->
  <el-header id="page-header">
    <router-link to="/"
      ><img src="./assets/logo.png" alt="logo" class="logo"
    /></router-link>
    <!-- navigation -->
    <nav class="navigation">
      <li v-for="router in routers" :key="router.id">
        <span
          ><router-link :to="router.path" class="router-link">{{
            router.title
          }}</router-link></span
        >
      </li>
    </nav>
  </el-header>
  <!-- wave header -->
  <div class="waveHeader">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      ></path>
    </svg>
  </div>
<!-- main contents area -->
  <el-main id="main"><router-view /></el-main>
</template>

<script>
import { ethers } from 'ethers';
import {
  userinformationAddress,
  userinformationABI,
} from '../smart_contracts/contract';

export default {
  name: 'App',
  data() {
    return {
      routers: [
        {
          id: 1,
          title: 'Home',
          path: '/',
        },
        {
          id: 2,
          title: 'Calculator',
          path: '/calculator',
        },
        {
          id: 3,
          title: 'History',
          path: '/history',
        },
      ],
    };
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息   Read the state information in sessionStorage when the page loads
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里     Save the information in vuex to sessionStorage when the page is refreshed
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100%;
  /* font-family: 'Snell Roundhand, cursive'; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  position: absolute;
  background: linear-gradient(
    56deg,
    rgba(241, 245, 248, 1) 59%,
    rgba(241, 241, 239, 1) 100%
  );
}

#page-header {
  padding-top: 2rem;
  display: flex;
  position: relative;
  height: 70px;
  z-index: 1;
}

#navigation {
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
.navigation li {
  margin: 0px 50px;
  display: inline-block;
}
.logo {
  width: 144px;
  height: 40px;
  margin: 0px 10px;
}
.router-link {
  font-size: 22px;
  text-decoration: none;
  color: rgb(48, 54, 75);
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}
.router-link:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}
#main {
  height: calc(100% - 70px);
  padding: 0;
}
.waveHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.waveHeader svg {
  position: relative;
  display: block;
  width: calc(155% + 1.3px);
  height: 129px;
  transform: rotateY(180deg);
}

.waveHeader .shape-fill {
  fill: #ffffff;
}

@media screen and (max-width: 768px) {
  #page-header {
    height: 10rem;
    display: flex;
        flex-direction: column;
        flex-wrap: wrap-reverse;
  }
  .navigation li {
    margin-top: 0.5rem;
    display:flex;
  }
}
</style>
