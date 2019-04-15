<script>
	export default {
		onLaunch: function() {
			// uni.clearStorage();
			console.log('App Launch')
		},
		onShow: function() {
			// uni.clearStorage();
			console.log('App Show', this.getGlobalUser(), this.getSessionId())
// 			uni.getSavedFileList({   //清空文件的本地缓存
// 				success: function(res) {
// 					let files = res.fileList;
// 					if (files.length > 0) {
// 						for(let i = 0; i < files.length; i ++) {
// 							uni.removeSavedFile({
// 								filePath: files[i].filePath,
// 								complete: function(res) {
// 									console.log(res);
// 								}
// 							});
// 						}
// 					}
// 				}
// 			});
			if (this.getGlobalUser() == null || this.getSessionId() == null) {
				let pages = getCurrentPages();
				if (pages.length && pages[pages.length - 1].route != 'pages/login/login') { //当前界面不是login.vue
					//#ifdef MP-WEIXIN
					wx.getSetting({
						success: res => {
							if (res.authSetting['scope.userInfo']) { //已经授权的话，就尝试登录
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
														//登录成功
														uni.setStorageSync("globalUser", res.data.userInfo);
														uni.setStorageSync("sessionId", res.data.sessionId);
														uni.switchTab({
															url: "../../pages/index/index"
														});
													} else {
														uni.redirectTo({
															url: '../../pages/login/login'
														})
													}
												})
											},
											fail: res => {
												console.log('uni getUserInfo', res)
											}
										});
									},
									fail: res => {
										console.log('uni login', res)
									}
								})
							} else {
								uni.redirectTo({
									url: '../../pages/login/login'
								})
							}
						},
					})
					//#endif
				} else { //当前在login.vue
					//#ifdef MP-WEIXIN
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
											uni.setStorageSync("globalUser", res.data.userInfo);
											uni.setStorageSync("sessionId", res.data.sessionId);
											let pages = getCurrentPages();
											if (pages.length > 1) {
												uni.navigateBack()
											}
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
					//#endif
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
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

// 	.triangle_border_nw {
// 		width: 0;
// 		height: 0;
// 		border-width: 30px 30px 0 0;
// 		border-style: solid;
// 		border-color: #6c6 transparent transparent transparent;
// 		margin: 40px auto;
// 		position: relative;
// 	}
// 
	.list-item {
		padding: 20upx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 14px;
	}

	.list-item-tt {
		align-self: flex-start;
		width: 220upx;
		color: #2a3a4a;
		text-align: right;
	}

	.list-item-td {
		align-self: center;
		width: 470upx;
		color: #34495e;
	}

	.page-end {
		/* height: 60upx; */
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15upx;
	}

	.end-txt {
		color: #ccc;
		font-size: 12px;
		letter-spacing: 2upx;
	}

	.null-box {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;

		.null-wrapper {
			display: flex;
			flex-direction: column;

			.null-ico {
				width: 140upx;
				height: 140upx;
			}
			.null-txt {
				font-size: 14px;
				color: #777;
				letter-spacing: 2px;
			}

			.null-txt,
			.null-ico {
				align-self: center;
			}
		}
	}
</style>
