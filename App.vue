<script>
	export default {
		onLaunch: function() {
			console.log('App Launch', this.getGlobalUser())
			if (this.getGlobalUser() === null) {
				console.log('App Launch' + '需要登录')
				uni.showLoading({
					title: '登录中...'
				});
				uni.login({
					provider: "weixin",
					success: (loginResult) => {
						// 获得微信登录的code：授权码
						var code = loginResult.code;
						setTimeout(function() {
							uni.hideLoading();
							uni.switchTab({
								url: "../../pages/me/me"
							});
						}, 3000);
						// 										uni.hideLoading();
						// 										uni.switchTab({
						// 											url: "../../pages/me/me"
						// 										});
						// 						uni.request({
						// 							url: this.$url + "/mpWXLogin/",
						// 							data: {
						// 								"code": code,
						// 							},
						// 							method: "POST",
						// 							success(res) {
						// 								console.log(res);
						// 								uni.hideLoading();
						// 								if (res.data.resCode === 200) {
						// 									//登录成功
						// 									uni.setStorageSync("globalUser", res.data.data);
						// 									uni.switchTab({
						// 										url: "../../pages/me/me"
						// 									});
						// 								}
						// 							}
						// 						});
					}
				});
			}
		},
		onShow: function() {
			console.log('App Show', this.getGlobalUser())
			//清空store
			this.$store.commit('resetFormData');
			if (this.getGlobalUser() === null) {
				console.log('App Show' + '需要登录')
				uni.showLoading({
					title: '登录认证中...'
				});
				uni.login({
					provider: "weixin",
					success: (loginResult) => {
						// 获得微信登录的code：授权码
						var code = loginResult.code;
						setTimeout(function() {
							uni.hideLoading();
							uni.switchTab({
								url: "../../pages/me/me"
							});
						}, 3000);
// 						uni.request({
// 							url: this.$url + "/mpWXLogin/",
// 							data: {
// 								"code": code,
// 							},
// 							method: "POST",
// 							success(res) {
// 								console.log(res);
// 								uni.hideLoading();
// 								if (res.data.resCode === 200) {
// 									//登录成功
// 									uni.setStorageSync("globalUser", res.data.data);
// 									uni.switchTab({
// 										url: "../../pages/me/me"
// 									});
// 								} else {
// 									uni.showToast({
// 										title: '登录认证失败，请输入你的授权码！',
// 										duration: 3000,
// 										image: "../../static/icon/error.png"
// 									})
// 								}
// 							}
// 						});
					}
				});
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			login() {
				uni.login({
					provider: "weixin",
					success: (loginResult) => {
						// 获得微信登录的code：授权码
						var code = loginResult.code;
						uni.navigateTo({
							url: './pages/login/login'
						});
						// 						uni.request({
						// 							url: this.$url + "/mpWXLogin/",
						// 							data: {
						// 								"code": code,
						// 							},
						// 							method: "POST",
						// 							success(res) {
						// 								console.log(res);
						// 								if(res.data.resCode === 200) {
						// 									//登录成功
						// 									uni.setStorageSync("globalUser", res.data.data);
						// 									uni.switchTab({
						// 										url: "pages/me/me"
						// 									});
						// 								}else if(res.data.resCode === 100) {
						// 									//需要传授权码
						// 									uni.navigateTo({
						// 										url: 'pages/login/login'
						// 									});
						// 								}
						// 							}
						// 						});
					}
				});
			}
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
</style>
