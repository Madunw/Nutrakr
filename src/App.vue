<template>
  <!-- show this message when the device is not PC or is in portrait mode -->
  <div class="fullscreen-bg" v-if="!isPC || !isLandscape">
    <div class="fullscreen-text">"Currently only support PC end."</div>
  </div>

  <!-- show the main content when the device is PC and is in landscape mode -->
  <div id="app" v-else>
    <!-- header -->
    <el-header id="page-header">
      <div class="header-contents" >
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
    </div>
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
    </el-header>
    <!-- main contents area -->
    <el-main id="main"><router-view /></el-main>
  </div>
</template>

<script>
import { getUserInfoUpdatedEvents } from './context/UserInfoContext.js';

export default {
  name: 'App',
  data() {
    return {
      isPC: true, // 用于判断是否为PC端
      isLandscape: true,  // 用于判断是否为竖屏
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
  mounted() {
    // 判断是否为PC端 Determine whether it is a PC terminal
    this.isPC = !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    // 判断屏幕方向是否为横屏 Determine whether the screen orientation is landscape
    const mediaQuery = window.matchMedia('(orientation: landscape)');
    this.isLandscape = mediaQuery.matches;
    // 监听屏幕方向的变化 Listen for screen orientation changes
    mediaQuery.addListener((mq) => {
      this.isLandscape = mq.matches;
    });
    //自动获取链上记录
    // Automatically get recorded events on the blockchain ,and get the last counted calorieNeed value
    getUserInfoUpdatedEvents().then((events) => {
      this.$store.state.form.caloriesNeeded =
        events[events.length - 1].args.calorieNeed;
    });
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

    window.addEventListener('resize', this.handleResize);
  },
};
</script>
<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 18px;
}

#app {
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
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
  height: 12%;
  z-index: 0;
}
.header-contents {
  position:absolute;
  display: flex;
  width: 60%;
}
.navigation {
  list-style-type: none;
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.navigation li {
  margin: 0px 1rem;
  display: inline-block;
}
.logo {
  width: 9rem;
  height: 2.5rem;
  margin: 0px 10px;
}
.router-link {
  font-size: 1.4rem;
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
  height: 88%;
  padding: 0;
}
.waveHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
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

.fullscreen-bg {
  height: 100%;
  width: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-text {
  color: #fff;
  font-size: 4vw;
}
@media screen and (max-width: 1200px) {
  html {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  html {
    font-size: 12px;
  }
}
</style>
