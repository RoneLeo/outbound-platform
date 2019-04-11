<template>
	<view class="body">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icon/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">授权码</label>
				<input name="sqm" type="number" v-model="sqm" value="" @confirm="formSubmit" class="input" placeholder="请输入授权码"
				 placeholder-class="graywords" />
			</view>
			<button open-type="getUserInfo" class="submit-btn" type="primary" form-type="submit" style="">提交</button>
		</form>
	</view>
</template>


<script>
	import HMmessages from '../../components/HM-messages/HM-messages'
	export default {
		components: {
			HMmessages
		},
		data() {
			return {
				sqm: ''
			};
		},
		onLoad() {
			uni.showToast({
				title: '自动登录中',
				icon: 'none'
			})
			uni.login({
				provider: "weixin",
				success: (loginResult) => {
					var code = loginResult.code,
						encryptedData = '',
						iv = '';
					uni.getUserInfo({
						provider: 'weixin',
						success: (infoRes) => {
							encryptedData = infoRes.encryptedData;
							iv = infoRes.iv;
							this.$api.post('/user/weLogin', {
								code: code,
								sqm: '',
								encryptedData: encryptedData,
								iv: iv
							}).then(res => {
								if (res.resCode === 200) {
									uni.showToast({
										title: '登录成功',
										icon: 'none'
									})
									uni.setStorageSync("globalUser", res.data.userInfo);
									uni.setStorageSync("sessionId", res.data.sessionId);
									let pages = getCurrentPages();
									if (pages.length > 1) {
										uni.navigateBack()
									}else {
										uni.switchTab({
											url: "../../pages/index/index"
										});
									}
								}else {
									uni.showToast({
										title: '登录失败，手动登录',
										icon: 'none'
									})
								}
							})
						},
						fail: (res) => {
							console.log('uni getUserInfo', res);
						}
					});
				},
				fail: (res) => {
					console.log('uni login', res);
				},
			})
		},
		methods: {
			formSubmit(e) {
				var sqm = e.detail.value.sqm;
				//#ifdef MP-WEIXIN
				wx.getSetting({
					success: res => {
						if (!res.authSetting['scope.userInfo']) {
							wx.authorize({
								scope: 'scope.userInfo',
								success: () => {
									uni.login({
										provider: "weixin",
										success: (loginResult) => {
											var code = loginResult.code,
												encryptedData = '',
												iv = '';
											uni.getUserInfo({
												provider: 'weixin',
												success: (infoRes) => {
													encryptedData = infoRes.encryptedData;
													iv = infoRes.iv;
													this.requestLogin(code, sqm, encryptedData, iv)
												},
												fail: (res) => {
													console.log('login.vue uni getUserInfo', res);
												}
											});
										},
										fail: (res) => {
											console.log('login.vue uni login', res);
										}
									});
								},
								fail: (res) => {
									console.log('login.vue wx authorize', res);
								}
							})
						} else {
							uni.login({
								provider: "weixin",
								success: (loginResult) => {
									var code = loginResult.code,
										encryptedData = '',
										iv = '';
									uni.getUserInfo({
										provider: 'weixin',
										success: (infoRes) => {
											encryptedData = infoRes.encryptedData;
											iv = infoRes.iv;
											this.requestLogin(code, sqm, encryptedData, iv)
										},
										fail: (res) => {
											console.log('uni getUserInfo', res);
										}
									});
								},
								fail: (res) => {
									console.log('uni login', res);
								}
							});
						}
					}
				})
				//#endif
			},
			requestLogin(code, sqm, encryptedData, iv) {
				console.log('参数',code)
				console.log('sqm', sqm);
				console.log('encryptedData', encryptedData);
				console.log('iv', iv)
				this.$api.post('/user/weLogin', {
					code: code,
					sqm: sqm || this.sqm,
					encryptedData: encryptedData,
					iv: iv
				}).then(res => {
					if (res.resCode === 200) {
						uni.setStorageSync("globalUser", res.data.userInfo);
						uni.setStorageSync("sessionId", res.data.sessionId);
						uni.switchTab({
							url: "../../pages/index/index"
						});
					} else {
						this.HMmessages.show(res.resMsg, {
							icon: 'error',
							closeButton: true,
							duration: 5000
						})
					}
				})
			},
		}
	}
</script>

<style>
	@import url("login.css");
</style>
