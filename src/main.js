import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight,faChevronLeft,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import locale from 'element-ui/lib/locale/lang/en'//import ElementUI-English


library.add(faChevronRight,faChevronLeft,faChevronDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VCharts);
Vue.use(ElementUI, { locale })  //use ElementUI-English
Vue.config.productionTip = false


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
