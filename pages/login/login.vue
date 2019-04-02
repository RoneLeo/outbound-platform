<template>
	<view class="body">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icon/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">授权码</label>
				<input name="sqm" type="text" v-model="sqm" value="" @confirm="formSubmit" password class="input" placeholder="请输入授权码"
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
		onLoad(params) {
			console.log(params.auto)
		},
		methods: {
			formSubmit(e) {
				var sqm = e.detail.value.sqm;
				console.log('授权码', sqm);
				//#ifdef MP-WEIXIN
				wx.getSetting({
					success: res => {
						console.log('getSetting', res, res.authSetting, res.authSetting['scope.userInfo'])
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
													console.log('login.vue code', code, sqm, encryptedData, iv);
													this.requestLogin(code, sqm, encryptedData, iv)
												},
												complete: (res) => {
													console.log('login.vue uni getUserInfo', res);
												}
											});
										},
										complete: (res) => {
											console.log('login.vue uni login', res);
										}
									});
								},
								complete: (res) => {
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
											console.log('code', code, sqm, encryptedData, iv);
											this.requestLogin(code, sqm, encryptedData, iv)
										},
										complete: (res) => {
											console.log('uni getUserInfo', res);
										}
									});
								},
								complete: (res) => {
									console.log('uni login', res);
								}
							});
						}
					}
				})
				//#endif
			},
			requestLogin(code, sqm, encryptedData, iv) {
				this.$api.test('/user/weLogin', {
					code: code,
					sqm: sqm || this.sqm,
					encryptedData: encryptedData,
					iv: iv
				}).then(res => {
					console.log('login.vue 的登录接口返回：', res);
					if (res.resCode === 200) {
						uni.setStorageSync("globalUser", res.data.userInfo);
						uni.setStorageSync("sessionId", res.data.sessionId);
						const storage = uni.getStorageInfoSync();
						console.log('storage', storage.keys);
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
