import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import myBar from './components/bar/bar.vue';
Vue.component('my-bar',myBar)
const app = new Vue({
    ...App
})
app.$mount()
