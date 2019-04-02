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
				<view class="me-list-item" @tap="gotoStatistics">
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
		onLoad() {
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					this.userInfo = infoRes.userInfo;
				}
			});
		},
		methods: {
			gotoStatistics() {
// 				uni.navigateTo({
// 					url: '../../pages/caseStatistics/caseStatistics',
// 				});
			},
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
</style>
