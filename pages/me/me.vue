<template>
	<view class="page page-fill">
		<view class="header">
			<image :src="userInfo.avatarUrl" class="face"></image>
			<view class="info-wapper">
				<view class="nickname">
					{{userInfo.nickName}}
				</view>
				<view class="nav-info">账号：admin</view>
			</view>
			<view class="set-wapper" @tap="gotoSetting" >
				<!-- <navigator open-type="navigate" url="/pages/setting/setting"> -->
					<image src="../../static/icon/settings.png" class="settings"></image>
				<!-- </navigator> -->
			</view>
		</view>
		<view class="me-page">
			<view class="total page-block">
				<view class="total-item case-total">
					<view class="total-num">
						<view class="total-num-do">30</view>
						/100
					</view>
					<view class="total-txt">案 件</view>
				</view>
				<view class="total-item money-total">
					<view class="total-num">
						<view class="total-num-do">400</view>
						/1000
					</view>
					<view class="total-txt">佣 金</view>
				</view>
			</view>
			<view class="page-block me-list">
				<view class="me-list-item">
					<view class="list-tt">案件统计报表</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
				<view class="me-list-item">
					<view class="list-tt">案件类型占比</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
				<view class="me-list-item">
					<view class="list-tt">案件趋势分析图表</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				userInfo: {}
			};
		},
		onShow() {
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					console.log('用户昵称为：' + infoRes.userInfo.avatarUrl);
					this.userInfo = infoRes.userInfo;
				}
			});
// 			var me = this;
// 			// 用户状态的切换
// 			var userInfo = uni.getStorageSync("globalUser");
// 			if (userInfo != null && userInfo != "" && userInfo != undefined) {
// 				me.userIsLogin = true;
// 				me.userInfo = userInfo;
// 			} else {
// 				me.userIsLogin = false;
// 				me.userInfo = {};
// 			}
		},
		methods: {
			gotoSetting() {
				uni.navigateTo({
					url: '../../pages/setting/setting',
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './me.css'
	// 	.page-fill {
	// 		width:100%;
	// 		height: 100%;
	// 		position: relative;
	// 		.me-img {
	// 			width: 750upx;
	// 			height: 270upx;
	// 			position: absolute;
	// 			top: 0;
	// 			left: 0;
	// 		}
	// 		.header {
	// 			display: flex;
	// 			flex-wrap: nowrap;
	// 			justify-content: space-between;
	// 			z-index: 2000;
	// 			height: 210upx;
	// 			padding: 30upx;
	// 			.user-img-wrapper {
	// 				align-self: center;
	// 				width: 150upx;
	// 				height: 150upx;
	// 				border-radius: 50%;
	// 				background: #eee;
	// 				display: flex;
	// 				justify-content: center;
	// 				align-items: center;
	// 				.user-img {
	// 					width: 100upx;
	// 					height: 100upx;
	// 				}
	// 			}
	// 			.user-info {
	// 				width: 450upx;
	// 				color: #fff;
	// 				.user-name {
	// 					font-size: 16px;
	// 				}
	// 				.user-zh {
	// 					font-size: 14px;
	// 					font-weight: 300;
	// 				}
	// 			}
	// 		}
	// 	}
</style>
