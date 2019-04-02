import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

const autoLogin = () => {
	uni.login({
		provider: "weixin",
		success: (loginResult) => {
			let code = loginResult.code;
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					let encryptedData = infoRes.encryptedData;
					let iv = infoRes.iv;
					test('/user/weLogin', {
						code: code,
						sqm: '',
						encryptedData: encryptedData,
						iv: iv
					}).then(res => {
						if (res.resCode === 200) {
							uni.showToast({
								title: '登录成功',
								icon: "none"
							})
							uni.setStorageSync("globalUser", res.data.userInfo);
							uni.setStorageSync("sessionId", res.data.sessionId);
						} else {
							uni.showToast({
								title: '登录失败，手动登录',
								icon: "none"
							})
							uni.navigateTo({
								url: '../../pages/login/login'
							})
						}
					})
				}
			});
		}
	})
}


// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (url, data) => {
	http.config.baseUrl = "http://www.chiy.online:8083"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			'content-type': 'application/x-www-form-urlencoded',
			'cookie': 'JSESSIONID=' + uni.getStorageSync("sessionId")
		}
		if (url.indexOf("Login") != -1) { //如果是登录接口
			config.header = {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}
	}
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		if (response.statusCode === 200) {
			let data = JSON.parse(response.data)
			if (data.resCode === 100 || data.resCode === 101) { //未登录或登录失败
				uni.showToast({
					title: '自动登录中',
					icon: "none"
				})
				autoLogin();
			} else {
				return data;
			}
		} else if (response.statusCode === 500) {
			uni.showToast({
				title: '500-' + response.errMsg,
				duration: 2000,
				image: "../../static/icon/error.png"
			})
		}
		//判断返回状态 执行相应操作

	}
	return http.request({
		url: url,
		dataType: 'text',
		data,
	})
}

// 轮播图
export const banner = (data) => {
	return http.request({
		url: '/banner/36kr',
		method: 'GET',
		data,
		// handle:true
	})
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
	banner
}
