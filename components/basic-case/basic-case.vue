<template>
	<view>
		<view class="page-block case-head">
			<view class="basic-info">
				<view class="head-img-wrapper">
					<image v-show="sex" src="../../static/icon/women.png" class="head-img"></image>
					<image v-show="!sex" src="../../static/icon/man.png" class="head-img"></image>
				</view>
				<view class="head-info">
					<view class="info-data info-title">
						<view class="info-name">{{basicInfo.armc}}</view>
						<!-- <view class="info-age">37岁</view> -->
						<view class="info-addr">{{basicInfo.jtdz}}</view>
					</view>
					<view class="info-data over-text">
						单位名称：{{basicInfo.dwmc}}
					</view>
					<view class="info-data over-text">
						身份证号：{{basicInfo.arzjh}}
					</view>
				</view>
			</view>
			<view class="data-wrapper">
				<view class="data-item">
					<view class="data-name">委案金额</view>
					<view class="data-num">{{qtInfo.waje}}
						<view class="light-color">元</view>
					</view>
				</view>
				<view class="data-item">
					<view class="data-name">已还金额</view>
					<view class="data-num">{{qtInfo.yhk}}
						<view class="light-color">元</view>
					</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期天数</view>
					<view class="data-num">{{qtInfo.yqts}}
						<view class="light-color">天</view>
					</view>
				</view>
			</view>
			<view class="case-staus over-text" >
				{{tagTxt}}
			</view>
		</view>
		
		<TabBlock :caseId="caseId"></TabBlock>
		
		
		<!-- <view class="task-info" style="font-size: 14px;">
			<view class="page-block" v-show="moreInfoShow">
				<view style="height: 300upx;">
					此处是更多信息。此处是更多信息。此处是更多信息。此处是更多信息。
				</view>
			</view>
			<view @tap="showMoreInfo" style="color: #00C674;padding: 5upx 20upx;">
				{{btnTxt}}
			</view>
		</view> -->
		
		
		<view class="page-block task-info">
			<view class="block-name">
				外访任务说明
			</view>
			<view class="task-list">
				<view class="list-item">
					<view class="list-item-tt over-text">任务名称</view>
					<view class="list-item-td over-text">{{taskData.rwmc}}</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">任务佣金</view>
					<view class="list-item-td over-text">{{taskData.rwyj}}元</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">任务方式</view>
					<view class="list-item-td">{{rwfs}}</view>
				</view>
				<view class="list-item" v-show="taskData.rwzt == 2">
					<view class="list-item-tt over-text">派发方式</view>
					<view class="list-item-td">指定派发</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">任务描述</view>
					<view class="list-item-td over-text">{{taskData.rwms}}</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">任务截止时间</view>
					<view class="list-item-td over-text">{{taskData.rwjzsj}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import TabBlock from '../../components/tab-block/tab-block'
	export default {
		props:['tagTxt', 'caseId', 'taskId'],
		components: {
			TabBlock
		},
		data() {
			return {
				moreInfoShow: false,
				btnTxt: '查看更多相关信息',
				caseData: {},
				taskData: {},
				rwfsArr: [],
				rwfs: '',
				basicInfo: {},
				qtInfo: {},
				sex: 0, //1是女， 0是男
			};
		},
		onLoad(params) {
			this.$api.post('/dict/findDictListByZddm', {zddm: 'D_SYS_RWFSDM', zxbz: 0}).then((res)=>{
				if(res.resCode == 200) {
					this.rwfsArr = res.data;
				}
			}).catch((err)=>{
				console.log('request fail', err);
			})
			this.getCaseData();
			this.getTaskData();
		},
		methods: {
			getCaseData() {
				this.$api.post('/casebase/findAllInfoById', {id: this.caseId}).then((res)=>{
					if(res.resCode == 200) {
						this.caseData = res.data;
						this.basicInfo = res.data.arxx && res.data.arxx.length && res.data.arxx[0];
						this.sex = this.basicInfo && this.basicInfo.arxb.indexOf('女')!= -1 ? 1 : 0;
						this.qtInfo.yqts = res.data.qtxx && res.data.qtxx.length && res.data.qtxx[0].yqts;
						this.qtInfo.waje = res.data.dkxx && res.data.dkxx.length && res.data.dkxx[0].waje;
						this.qtInfo.yhk = res.data.dkxx && res.data.dkxx.length && res.data.dkxx[0].yhk;
					}else {
						uni.showToast({
							title: res.resMsg,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			getTaskData() {
				this.$api.post('/task/findById', {id: this.taskId}).then((res)=>{
					if(res.resCode == 200) {
						this.taskData = res.data;
						this.rwfs = this.$util.parseJSON(this.taskData.rwfs, this.rwfsArr);
					}else {
						uni.showToast({
							title: res.resMsg,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			showMoreInfo() {
				this.moreInfoShow = !this.moreInfoShow;
				
				this.btnTxt = this.moreInfoShow ? '收起更多相关信息' : '查看更多相关信息';
			},
			tabchange(index, e) {
			}
		}
	}
</script>

<style lang="scss">
	.light-color {
		display: inline-block;
		font-size: 14px;
		color: #999;
		margin-left: 10upx;
	}
	.case-head {
		position: relative;
		
		.basic-info {
			padding: 30upx 20upx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			
			.head-img-wrapper {
				align-self: center;
				border-radius: 50%;
				width: 150upx;
				height: 150upx;
				background-color: #f1f1f1;
				display: flex;
				justify-content: center;
				align-items: center;
				.head-img {
					width: 120upx;
					height: 120upx;
				}
			}
			
			.head-info {
				width: 520upx;
				align-self: center;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.info-title {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					height: 70upx;
				}
				
				.info-data {
					align-items: center;
					color: #515151;
					font-size: 14px;
					.info-name {
						color: #222;
						font-size: 16px;
						font-weight: 500;
						letter-spacing: 1px;
					}
					
					.info-age,
					.info-addr {
						color: #999;
						margin-left: 20upx;
					}
				}
			}
			
		}
		.data-wrapper {
			height: 150upx;
			border-top: 1px solid #f2f2f2;
			padding: 10upx 20upx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			
			.data-item {
				align-self: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				font-weight: 500;
				
				.data-name {
					color: #333;
					line-height: 28px;
				}
				
				.data-num {
					color: #00B07B;
					line-height: 22px;
					font-size: 16px;
				}
			}
		}
		.case-staus {
			position: absolute;
			top: 35upx;
			right: -3upx;
			text-align: center;
			min-width: 90upx;
			max-width: 160upx;
			height: 60upx;
			background: #00B07B;
			border-bottom-left-radius: 25upx;
			border-top-left-radius: 25upx;
			font-size: 14px;
			letter-spacing: 1upx;
			color: #FFFFFF;
			line-height: 60upx;
			padding: 0 25upx;
		}
	}

	.task-info {
		margin-top: 20upx;
		.block-name {
			font-size: 16px;
			font-weight: 500;
			padding: 30upx 30upx 20upx;
			color: #333333;
		}
	}

	.block-title {
		margin-top: 20upx;
		background-color: #f7f7f7;
		font-size: 14px;
		padding: 20upx;
		line-height: 20px;
	}

	.task-list {
		padding: 20upx;
	}
</style>
