import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronRight,faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VCharts);
Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
