<script>
	export default {
		onLaunch: function() {
			console.log('App Launch', this.getGlobalUser())
			if (this.getGlobalUser() === null) {
				console.log('App Launch' + '需要登录')
				// 				uni.showLoading({
				// 					title: '登录中...'
				// 				});
				// 				uni.login({
				// 					provider: "weixin",
				// 					success: (loginResult) => {
				// 						// 获得微信登录的code：授权码
				// 						var code = loginResult.code;
				// 						setTimeout(function() {
				// 							uni.hideLoading();
				// 							uni.switchTab({
				// 								url: "../../pages/me/me"
				// 							});
				// 						}, 3000);
				// 												uni.request({
				// 													url: this.$url + "/mpWXLogin/",
				// 													data: {
				// 														"code": code,
				// 													},
				// 													method: "POST",
				// 													success(res) {
				// 														console.log(res);
				// 														uni.hideLoading();
				// 														if (res.data.resCode === 200) {
				// 															//登录成功
				// 															uni.setStorageSync("globalUser", res.data.data);
				// 															uni.switchTab({
				// 																url: "../../pages/me/me"
				// 															});
				// 														} else if (res.data.status === 500) {
				// 															uni.showToast({
				// 																title: res.data.msg,
				// 																duration: 2000,
				// 																image: "../../static/icon/error.png"
				// 															})
				// 														} else {
				// 															//当前页面已是login界面
				// 															uni.showToast({
				// 																title: '登录认证失败，请输入你的授权码！',
				// 																duration: 3000,
				// 																image: "../../static/icon/error.png"
				// 															})
				// 														}
				// 													}
				// 												});
				// 					}
				// 				});
			}
		},
		onShow: function() {
			console.log('App Show', this.getGlobalUser())
			//清空store
			this.$store.commit('resetFormData');
			if (this.getGlobalUser() == null) {
				console.log('App Show' + '需要登录')
				//#ifdef MP-WEIXIN
				//用户信息授权
				uni.getSetting({
					success: res => {
						console.log(res.authSetting)
						if (res.authSetting['scope.userInfo']) {
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
											uni.showLoading({
												title: '登录认证中...'
											});
											this.$postData({
												url: "/user/weLogin",
												data: {
													"code": code,
													"sqm": '',
													"encryptedData": encryptedData,
													"iv": iv
												},
												success: res => {
													uni.hideLoading();
													console.log('登录接口返回：', res.data)
													if (res.data.resCode === 200) {
														//登录成功
														uni.setStorageSync("globalUser", res.data.data);
														uni.switchTab({
															url: "../../pages/me/me"
														});
													} else if (res.data.status === 500) {
														uni.showToast({
															title: res.data.resMsg,
															duration: 2000,
															image: "../../static/icon/error.png"
														})
													} else {
														//当前界面不一定是登录界面
														//判断当前页面是否是登录界面
														let pages = getCurrentPages();
														if (pages.length && pages[pages.length - 1].route != 'page/login/login') {
															console.log(pages.length, pages[pages.length - 1].route, pages[pages.length - 1].route !=
																'page/login/login')
															uni.redirectTo({
																url: '../../pages/login/login'
															})
														}
														uni.showToast({
															title: '认证失败',
															duration: 1000,
															image: "../../static/icon/error.png"
														});
													}
												}
											})
										}
									});
								}
							})
						}

					}
				})
				//#endif
			} else {
				uni.reLaunch({
					url: '../../pages/index/index'
				});
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page {
		width: 100%;
		min-height: 100%;
		background-color: #f1f1f1;
		position: absolute;
	}

	.page-block {
		background-color: #fff;
	}

	.over-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.triangle_border_nw {
		width: 0;
		height: 0;
		border-width: 30px 30px 0 0;
		border-style: solid;
		border-color: #6c6 transparent transparent transparent;
		margin: 40px auto;
		position: relative;
	}

	.list-item {
		padding: 20upx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 14px;
	}

	.list-item-tt {
		width: 180upx;
		color: #2a3a4a;
		text-align: right;
	}

	.list-item-td {
		align-self: center;
		width: 510upx;
		color: #34495e;
	}

	.page-end {
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.end-txt {
		color: #ccc;
		font-size: 12px;
		letter-spacing: 2upx;
	}
</style>
