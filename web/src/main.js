import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './Sass/style.scss'
import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  axios from 'axios'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/Card'
Vue.component('m-card', Card)

import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

Vue.prototype.$http = axios.create({

	baseURL: process.env.Vue_APP_API_URL || '/web/api'
})

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
