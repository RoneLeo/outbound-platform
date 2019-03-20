import Vue from 'vue'
import App from './App'
import Store from './store/index.js'

Vue.config.productionTip = false

Vue.prototype.$url = 'https://www.imovietrailer.com/superhero'
Vue.prototype.$store = Store
Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("globalUser");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
	Store,
    ...App
})
app.$mount()
