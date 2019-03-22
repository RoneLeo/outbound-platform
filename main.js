import Vue from 'vue'
import App from './App'
import Store from './store/index.js'

Vue.config.productionTip = false

Vue.prototype.$staticUrl = 'http://182.151.22.247:8083/files'
Vue.prototype.$url = 'http://www.chiy.online:8083'
Vue.prototype.$store = Store
Vue.prototype.$setting = {swiper: true}
Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("globalUser");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}

Vue.prototype.$postData = function(object) {
	const {url, data, success} = object
	uni.request({
		url: this.$url + url,
		data: data,
		header: {
			'Content-Type':'application/x-www-form-urlencoded'
		},
		method: "POST",
		success: success
	});
}

App.mpType = 'app'

const app = new Vue({
	Store,
    ...App
})
app.$mount()
