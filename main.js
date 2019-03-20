import Vue from 'vue'
import App from './App'
import Store from './store/index.js'

Vue.config.productionTip = false

Vue.prototype.$url = 'https://www.imovietrailer.com/superhero'
Vue.prototype.$store = Store

App.mpType = 'app'

const app = new Vue({
	Store,
    ...App
})
app.$mount()
