import Vue from 'vue'
import App from './App'
import Store from './store/index.js'
import util from '@/common/util.js'
import api from '@/common/request-http/'

Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.prototype.$staticUrl = 'http://182.151.22.247:8083/files'
Vue.prototype.$url = 'http://www.chiy.online:8083'
Vue.prototype.$store = Store
Vue.prototype.$util = util
Vue.prototype.$setting = {swiper: true}
Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("globalUser");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}
Vue.prototype.getSessionId = function(key) {
	var sessionId = uni.getStorageSync("sessionId");
	if (sessionId != null && sessionId != "" && sessionId != undefined) {
		return sessionId;
	} else {
		return null;
	}
}

Vue.prototype.$postData = function(object) {
	const {url, data, success} = object
	let header = {
		'content-type': 'application/x-www-form-urlencoded',
		'cookie': 'JSESSIONID=' + uni.getStorageSync("sessionId")
	}
	if(url.indexOf("Login") != -1) {   //如果是登录接口
		header = {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}
	uni.request({
		url: this.$url + url,
		data: data,
		header: header,
		method: "POST",
		success: success
	});
}



Vue.prototype.$getData = function(object) {
	const {url, success} = object
	let header = {
		'content-type': 'application/x-www-form-urlencoded',
	}
	uni.request({
		url: this.$url + url,
		method: "GET",
		success: success
	});
}

App.mpType = 'app'

const app = new Vue({
	Store,
    ...App
})
app.$mount()
