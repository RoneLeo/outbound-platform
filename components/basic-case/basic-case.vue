<template>
	<view>
		<view class="page-block case-head">
			<view class="basic-info">
				<view class="head-img-wrapper">
					<image src="../../static/icon/man.png" class="head-img"></image>
					<image v-show="false" src="../../static/icon/women.png" class="head-img"></image>
				</view>
				<view class="head-info">
					<view class="info-data info-title">
						<view class="info-name">张三</view>
						<view class="info-age">37岁</view>
						<view class="info-addr">四川省成都市</view>
					</view>
					<view class="info-data over-text">
						委案到期日：2019-03-14
					</view>
					<view class="info-data over-text">
						身份证号：511922177408299999
					</view>
				</view>
			</view>
			<view class="data-wrapper">
				<view class="data-item">
					<view class="data-name">逾期金额</view>
					<view class="data-num">12345.6
						<view class="light-color">元</view>
					</view>
				</view>
				<view class="data-item">
					<view class="data-name">已还金额</view>
					<view class="data-num">12.6
						<view class="light-color">元</view>
					</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期天数</view>
					<view class="data-num">123
						<view class="light-color">天</view>
					</view>
				</view>
			</view>
			<view class="case-staus over-text" >
				{{tagTxt}}
			</view>
		</view>
		
		<TabBlock></TabBlock>
		
		
		<view class="task-info" style="font-size: 14px;">
			<view class="page-block" v-show="moreInfoShow">
				<view style="height: 300upx;">
					此处是更多信息。此处是更多信息。此处是更多信息。此处是更多信息。
				</view>
			</view>
			<view @tap="showMoreInfo" style="color: #00C674;padding: 5upx 20upx;">
				{{btnTxt}}
			</view>
		</view>
		
		
		<view class="page-block task-info">
			<view class="block-name">
				外访说明
			</view>
			<view class="task-list">
				<view class="list-item">
					<view class="list-item-tt over-text">外访方式</view>
					<view class="list-item-td over-text">确认案件对象信息完整</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">外访地址</view>
					<view class="list-item-td">四川省成都市武侯区科华路哈哈小区7栋2单元304</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">外访说明</view>
					<view class="list-item-td">到地址后仔细询问相关信息，并且记录下俩</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import TabBlock from '../../components/tab-block/tab-block'
	export default {
		props:['tagTxt'],
		components: {
			TabBlock
		},
		data() {
			return {
				moreInfoShow: false,
				btnTxt: '查看更多相关信息'
				// toolbarShow: false
			};
		},
		onLoad(params) {},
		methods: {
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
			min-width: 120upx;
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
