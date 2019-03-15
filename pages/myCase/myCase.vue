<template>
	<view class="page">
		<view v-show="toolbarShow" class="tabBar-wrapper">
			<view class="tabBar">
				<view :class="{'tabBar-item':true,'active':activeIndex==0}">外访中</view>
				<view :class="{'tabBar-item':true,'active':activeIndex==1}">已外访</view>
				<view :class="{'tabBar-item':true,'active':activeIndex==2}">未通过</view>
				<view :class="{'tabBar-item':true,'active':activeIndex==3}">未通过</view>
				<view :class="{'tabBar-item':true,'active':activeIndex==4}">未通过</view>
			</view>
			<image src="../../static/icon/close.png" class="tabBar-icon" @tap="toolBarShowChange"></image>
		</view>
		
		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<image src="../../static/icon/filter.png" class="toolbar-icon"></image>
		</view>
		
		<view :class="{'case-list':true,'marginTop':toolbarShow}">
			<view>
				<navigator open-type="navigate" url="/pages/task/task?taskId=1">
					<view class="case-list-item">
						<view class="case-list-item-body">
							<view class="case-item-info">
								<view class="case-item-info-name">
									张三
									<view style="color: #999;margin-left: 18upx;">27岁</view>
									<view style="color: #999;margin-left: 18upx;">男</view>
								</view>
								<view class="case-item-info-addr">
									<view class="case-item-info-tt">外访地址</view>
									<view class="case-item-info-td">
										四川省成都市武侯区四川省成都市武侯区四川省成都市武侯区
									</view>
								</view>
							</view>
							<view class="case-item-way">
								确认对象地址信息准确性（上传定位信息）,认对象地址信息准确,认对象地址信息准确
							</view>
						</view>
						<view class="case-list-item-foot">
							<view class="case-item-btn">
								<image src="../../static/icon/money.png" class="btn-img"></image>
								<view class="btn-txt">￥30.00</view>
							</view>
							<view class="case-item-btn">
								<image src="../../static/icon/phone.png" class="btn-img"></image>
								<view class="btn-txt">18483680709</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="case-list-item">
				<view class="case-list-item-tag">
					请耐心等待审核
				</view>
				<view class="case-list-item-body">
					<view class="case-item-info">
						<view class="case-item-info-name">
							张三
							<view style="color: #999;margin-left: 18upx;">27岁</view>
							<view style="color: #999;margin-left: 18upx;">男</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访时间</view>
							<view class="case-item-info-td">
								2018-03-14 14:00:00
							</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访地址</view>
							<view class="case-item-info-td">
								四川省成都市武侯区四川省成都市武侯区四川省成都市武侯区
							</view>
						</view>
					</view>
					<view class="case-item-way">
						确认案件对象信息完整
					</view>
				</view>
				<view class="case-list-item-foot">
					<view class="case-item-btn">
						<image src="../../static/icon/money.png" class="btn-img"></image>
						<view class="btn-txt">￥30.00</view>
					</view>
					<view class="case-item-btn">
						<image src="../../static/icon/phone.png" class="btn-img"></image>
						<view class="btn-txt">18483680709</view>
					</view>
				</view>
			</view>
			<view class="case-list-item">
				<!-- <view class="case-list-item-tag"> -->
					<image src="../../static/icon/yes1.png" class="tag-img"></image>
					<!-- 即将发放佣金 -->
				<!-- </view> -->
				<view class="case-list-item-body">
					<view class="case-item-info">
						<view class="case-item-info-name">
							张三
							<view style="color: #999;margin-left: 18upx;">27岁</view>
							<view style="color: #999;margin-left: 18upx;">男</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访时间</view>
							<view class="case-item-info-td">
								2018-03-14 14:00:00
							</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访地址</view>
							<view class="case-item-info-td">
								四川省成都市武侯区四川省成都市武侯区四川省成都市武侯区
							</view>
						</view>
					</view>
					<view class="case-item-way">
						上门送信函（需签字）
					</view>
				</view>
				<view class="case-list-item-foot">
					<view class="case-item-btn">
						<image src="../../static/icon/money.png" class="btn-img"></image>
						<view class="btn-txt">￥30.00</view>
					</view>
					<view class="case-item-btn">
						<image src="../../static/icon/phone.png" class="btn-img"></image>
						<view class="btn-txt">18483680709</view>
					</view>
				</view>
			</view>
			<view class="case-list-item">
				<image src="../../static/icon/no2.png" class="tag-img"></image>
				<view class="case-list-item-body">
					<view class="case-item-info">
						<view class="case-item-info-name">
							张三
							<view style="color: #999;margin-left: 18upx;">27岁</view>
							<view style="color: #999;margin-left: 18upx;">男</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访时间</view>
							<view class="case-item-info-td">
								2018-03-14 14:00:00
							</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访地址</view>
							<view class="case-item-info-td">
								四川省成都市武侯区四川省成都市武侯区四川省成都市武侯区
							</view>
						</view>
					</view>
					<view class="case-item-way">
						传达催款信息（记录音视频影像）
					</view>
				</view>
				<view class="case-list-item-foot">
					<view class="case-item-btn">
						<image src="../../static/icon/money.png" class="btn-img"></image>
						<view class="btn-txt">￥30.00</view>
					</view>
					<view class="case-item-btn">
						<image src="../../static/icon/phone.png" class="btn-img"></image>
						<view class="btn-txt">18483680709</view>
					</view>
				</view>
			</view>
			<view class="case-list-item">
				<view class="case-list-item-tag">
					已赚取￥20.00
				</view>
				<view class="case-list-item-body">
					<view class="case-item-info">
						<view class="case-item-info-name">
							张三
							<view style="color: #999;margin-left: 18upx;">27岁</view>
							<view style="color: #999;margin-left: 18upx;">男</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访时间</view>
							<view class="case-item-info-td">
								2018-03-14 14:00:00
							</view>
						</view>
						<view class="case-item-info-addr">
							<view class="case-item-info-tt">外访地址</view>
							<view class="case-item-info-td">
								四川省成都市武侯区四川省成都市武侯区四川省成都市武侯区
							</view>
						</view>
					</view>
					<view class="case-item-way">
						确认对象地址信息准确性（上传定位信息）
					</view>
				</view>
				<view class="case-list-item-foot">
					<view class="case-item-btn">
						<image src="../../static/icon/money.png" class="btn-img"></image>
						<view class="btn-txt">￥30.00</view>
					</view>
					<view class="case-item-btn">
						<image src="../../static/icon/phone.png" class="btn-img"></image>
						<view class="btn-txt">18483680709</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toolbarShow: false,
				activeIndex: 1,
				tabs: 5,
			};
		},
		methods:{
			toolBarShowChange() {
				this.toolbarShow = !this.toolbarShow;
			}
		}
	}
</script>

<style lang="scss">
	
	.case-list {
		padding: 20upx;
		display: flex;
		flex-direction: column;
		.case-list-item {
			position: relative;
			margin-bottom: 24upx;
			display: flex;
			flex-direction: column;
			border-radius: 10px;
			background: #fff;
			// RGBA(0, 198, 116, .1)
			box-shadow: 5upx 5upx 13upx 4upx #ffffff;
			.tag-img {
				position: absolute;
				bottom: 80upx;
				right: 60upx;
				width: 120upx;
				height: 130upx;
				opacity: .2;
				transform: rotate(-30deg);
			}
			.case-list-item-tag {
				position: absolute;
				top: 0;
				right: 0;
				background:linear-gradient(to left,#00FA9A, #ADFF2F) ;
				opacity: .8;
				padding: 5upx 30upx;
				font-size: 14px;
				color: #fff;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 10px;
				.tag-img {
					width: 30upx;
					height: 30upx;
				}
			}
			.case-list-item-body {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-around;
				font-size: 14px;
				padding: 30upx 20upx 20upx;
				border-bottom: 1px solid #f1f1f1;
				.case-item-info {
					width: 460upx;
					line-height: 24px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					color: #515151;
					.case-item-info-name {
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						line-height: 30px;
					}
					.case-item-info-addr {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						.case-item-info-tt {
							width: 120upx;
						}
						.case-item-info-td {
							align-self: center;
							width: 330upx;
						}
					}
				}
				.case-item-way {
					width: 230upx;
					align-self: center;
					text-align: center;
					color: #222;
					padding-top: 10upx;
				}
			}
			.case-list-item-foot {
				display: flex;
				flex-wrap: nowrap;
				padding: 20upx;
				.case-item-btn {
					width: 330upx;
					display: flex;
					flex-wrap: nowrap;
					justify-content: center;
					border-right: 1px dashed #f1f1f1;
					.btn-img {
						align-self: center;
						width: 40upx;
						height: 40upx;
					}
					.btn-txt {
						align-self: center;
						font-size: 14px;
						color: #333;
						padding-left: 20upx;
					}
				}
				.case-item-btn:last-child {
					border-right: 0;
				}
			}
		}
		
	}
	.case-list.marginTop {
		padding-top: 120upx;
	}
	.tabBar-wrapper {
		position: fixed;
		top: 100;
		z-index: 2000;
		width: 750upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20upx 0upx 8upx;
		background: linear-gradient(to bottom,#00C674,  #66CC66);
		.tabBar-icon {
			align-self: center;
			width: 100upx;
			height: 20upx;
			// margin-top: 20upx;
			border-left: 200upx solid transparent;
			border-right: 200upx solid transparent;
			border-top: 20upx solid transparent;
		}
		.tabBar {
			display: flex;
			justify-content: space-around;
			.tabBar-item {
				font-size: 14px;
				line-height: 20px;
				border: 1px solid #fff;
				color: #fff;
				padding: 5upx 22upx;
				border-radius: 10%;
				// margin: 0 5upx;
				
			}
			.tabBar-item.active {
				color: #00C674;
				background: #fff;
				font-weight: 500;
			}
		}
	}
	
.cicle-toolbar {
	position: fixed;
	bottom: 30%;
	right: 3%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 2000;
	width: 80upx;
	height: 80upx;
	border-radius: 40upx;
	background:linear-gradient(to bottom, #66CC66,#00B07B);
	.toolbar-icon {
		align-self: center;
		width: 50upx;
		height: 50upx;
	}
}
.toolbar {
	position: fixed;
	bottom: 5%;
	right: 3%;
	width: 70upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40upx 10upx 20upx 10upx;
	border-radius: 40upx;
	background:linear-gradient(to bottom, #66CC66,#00B07B);
	.toolbar-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		margin: 15upx 0;
	}
	.toolbar-icon {
		align-self: center;
		width: 40upx;
		height: 40upx;
	}
	.toolbar-text {
		align-self: center;
		color: #f2f2f2;
		font-size: 12px;
		font-weight: 300;
		margin-top: 5upx;
	}
}


</style>
