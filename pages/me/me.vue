<template>
	<view class="page page-fill">
		<view class="header">
			<image :src="userInfo.avatarUrl" class="face"></image>
			<view class="info-wapper">
				<view class="nickname">
					{{user.mz}}
				</view>
				<view class="nav-info">{{qy}} {{user.yhm}}</view>
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
						<view class="total-num-do">{{totalNum.yclNum}}</view>
						/{{totalNum.yjsNum}}
					</view>
					<view class="total-txt">案 件</view>
				</view>
				<view class="total-item money-total">
					<view class="total-num">
						<view class="total-num-do">{{totalNum.sjMoney}}</view>
						/{{totalNum.ydMoney}}
					</view>
					<view class="total-txt">佣 金</view>
				</view>
			</view>
			<view class="page-block me-list">
				<view class="me-list-item" @tap="gotoStatistics">
					<view class="list-tt">任务数据统计</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
				<!-- <view class="me-list-item">
					<view class="list-tt">案件类型占比</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
				<view class="me-list-item">
					<view class="list-tt">案件趋势分析图表</view>
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view> -->
			</view>
			<view v-show="!user.id" style="height: auto;display: flex;flex-direction: column;justify-content: space-between;align-items: center; font-size: 32px;font-weight: 400;color: #ebebeb;padding: 20upx 0">
				<view>Chasing Gold Man.</view>
				<!-- <view>追</view>
				<view>金</view>
				<view>侠</view> -->
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				userInfo: {},
				user: {},
				qyArr: [],
				qy: '',
				totalNum: {}
			};
		},
		onLoad() {
			this.user = this.getGlobalUser();
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					this.userInfo = infoRes.userInfo;
				}
			});
			this.$api.post('/dict/findDictListByZddm', {zddm: 'D_SYS_AJQYDM', zxbz: 0}).then((res)=>{
				if(res.resCode == 200) {
					this.qyArr = res.data;
					this.qy = this.$util.parseJSON(this.user.szxzqdm, this.qyArr);
				}else {
					
				}
			}).catch((err)=>{
				console.log('request fail', err);
			})
			this.getTotalData();
		},
		onShow() {
			this.user = this.getGlobalUser();
		},
		methods: {
			getTotalData() {
				this.$api.post('/task/countYwyRwxx', {rwzxr: this.user.id}).then((res)=>{
					if(res.resCode == 200) {
						this.totalNum = res.data;
					}
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			gotoStatistics() {
				uni.navigateTo({
					url: '../../pages/countTask/countTask',
				});
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
