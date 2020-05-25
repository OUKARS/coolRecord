import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
import * as API from './utils/request.js'
Vue.prototype.$api = API
App.mpType = 'app'
import myBar from './components/bar/bar.vue';
Vue.component('my-bar',myBar)

const app = new Vue({
    ...App,
	store
})
app.$mount()
