<template>
	<view class="page" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
		<view v-show="isNull" class="null-box" >
			<view class="null-wrapper">
				<image src="../../static/icon/null3.png" class="null-ico"></image>
				<text class="null-txt">没有相关数据</text>
			</view>
		</view>
		<view v-show="toolbarShow" class="tabBar-wrapper">
			<view class="tabBar">
				<view v-for="(item, index) in tabList" :key="index" @tap="activeTabChange(item.type)" :class="{'tabBar-item':true,'active':activeIndex==item.type}">
					{{item.label}}
				</view>
			</view>
			<image src="../../static/icon/close.png" class="tabBar-icon" @tap="toolBarShowChange"></image>
		</view>

		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<image src="../../static/icon/filter.png" class="toolbar-icon"></image>
		</view>

		<view :class="{'case-list':true,'marginTop':toolbarShow}" ref='btnImg'>
			<view>
				<!-- <navigator open-type="navigate" url="/pages/task/task?taskId=1"> -->
				<view class="case-list-item" v-for="(item, index) in cases" :key="index">
					<view v-if="item.rwxx && item.rwxx.rwzt == 3" class="case-list-item-tag">
						{{item.rwxx.rwjzsj}}
					</view>
					<view v-if="item.rwxx && item.rwxx.rwzt !== 1 && item.rwxx.rwzt !== 2 && item.rwxx.rwzt !== 3" class="case-list-item-tag">
						{{item.rwxx.rwzt === 4 ? '请耐心等待审核' : item.rwxx.rwzt === 6 ? '等待发放佣金中...' : '已赚取￥' }}
					</view>
					<view v-if="item.rwxx && item.rwxx.rwzt === 5" class="case-list-item-tag" style="background: linear-gradient(to left, #FE6756, #F00000)">
						审核不通过
					</view>
					<image v-if="item.rwxx && item.rwxx.rwzt === 6" src="../../static/icon/yes1.png" class="tag-img"></image>
					<image v-if="item.rwxx && item.rwxx.rwzt === 5" src="../../static/icon/no2.png" class="tag-img"></image>
					<view class="case-list-item-body" @tap="taskDetail(item.rwxx.ajid, item.rwxx.id)">
						<view class="case-item-info">
							<view class="case-item-info-name">
								{{item.arxx && item.arxx.armc}}
								<view style="color: #999;margin-left: 18upx;">{{item.arxx && item.arxx.arxb}}</view>
								<view style="color: #999;margin-left: 18upx;">{{item.arxx && item.arxx.hjdz}}</view>
							</view>
							<view class="case-item-info-addr">
								<view class="case-item-info-tt">外访描述</view>
								<view class="case-item-info-td">
									{{item.rwxx && item.rwxx.rwms}}
								</view>
							</view>
						</view>
						<view class="case-item-way">
							{{item.rwxx && item.rwxx.rwfs1}}
						</view>
					</view>
					<view class="case-list-item-foot">
						<view class="case-item-btn">
							<image src="../../static/icon/money.png" class="btn-img"></image>
							<view class="btn-txt">￥{{item.rwxx && item.rwxx.rwyj}}</view>
						</view>
						<view class="case-item-btn" @tap="makePhoneCall(item.arxx.arsj)">
							<image src="../../static/icon/phone.png" class="btn-img"></image>
							<view class="btn-txt">{{item.arxx && item.arxx.arsj}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-end" v-show="isEnd">
			<view class="end-txt">{{currentPage}}/{{totalPage}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {},
		onLoad() {
			this.user = this.getGlobalUser() != null ? this.getGlobalUser() : {};
			this.activeIndex = this.tabList[0].type;

			this.$api.post('/dict/findDictListByZddm', {
				zddm: 'D_SYS_RWFSDM',
				zxbz: 0
			}).then((res) => {
				if (res.resCode == 200) {
					this.rwfsArr = res.data;
					this.getTaskData(this.currentPage, this.pageSize);
				}
			}).catch((err) => {
				console.log('request fail', err);
			})
		},
		onShow() {
			this.currentPage = 1;
			this.getTaskData(this.currentPage, this.pageSize);
		},
		data() {
			return {
				tabList: [{
						type: 3,
						label: '外访中'
					},
					{
						type: 4,
						label: '已外访'
					},
					{
						type: 5,
						label: '未通过'
					},
					{
						type: 6,
						label: '已通过'
					},
					{
						type: 7,
						label: '已发放'
					},
				],
				toolbarShow: true,
				activeIndex: 0,
				isEnd: false,
				isNull: false,
				tabs: 5,
				cases: [],
				rwfsArr: [],
				user: {},
				currentPage: 1,
				pageSize: 4,
				totalPage: 0,
				startX: 0,
				moveX: 0,
				disX: 0,
				startY: 0,
				moveY: 0,
				disY: 0,
			};
		},
		methods: {
			getTaskData(page, pagesize) {
				uni.showLoading({
					mask: true
				})
				this.isNull = false;
				this.$api.post('/task/findAllByYwyidYjd', {
					page: page,
					pagesize: pagesize,
					ywyid: this.user.id,
					rwzt: this.activeIndex
				}).then((res) => {
					this.cases = res.data;
					this.totalPage = res.totalpage;
					if (this.totalPage > 0) {
						this.isEnd = true;
					}else if(this.totalPage == 0) {
						this.isNull = true;
					}
					this.cases.forEach(item => {
						item.rwxx.rwfs1 = this.$util.parseJSON(item.rwxx.rwfs, this.rwfsArr);
					})
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					console.log('request fail', err);
				})
			},
			toolBarShowChange() {
				this.toolbarShow = !this.toolbarShow;
			},
			activeTabChange(index) {
				this.isEnd = false;
				this.activeIndex = index;
				this.currentPage = 1;
				this.getTaskData(this.currentPage, this.pageSize);
			},
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			taskDetail(caseId, taskId) {
				uni.navigateTo({
					url: '../../pages/task/task?caseId=' + caseId + '&taskId=' + taskId + '&rwzt=' + this.activeIndex
				})
			},
			touchStart: function(ev) {
				ev = ev || event;
				ev.preventDefault();
				if (ev.touches.length == 1) { //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
					this.startX = ev.touches[0].clientX; // 记录开始位置
					this.startY = ev.touches[0].clientY;
				}
			},
			touchMove: function(ev) {
				ev = ev || event;
				ev.preventDefault();
			
				if (ev.touches.length == 1) {
					//滑动时距离浏览器左侧的距离
					this.moveX = ev.touches[0].clientX;
					this.moveY = ev.touches[0].clientY;
				}
			},
			touchEnd: function(ev) {
				ev = ev || event;
				ev.preventDefault();
			
				this.disX = this.moveX - this.startX;
				this.disY = this.moveY - this.startY;
				if (this.disX < -150) { //向左
					if (this.activeIndex < 7) {
						this.activeIndex = this.activeIndex + 1;
						this.activeTabChange(this.activeIndex);
					}
				} else if (this.disX > 150) { //向右
					if (this.activeIndex > 3) {
						this.activeIndex = this.activeIndex - 1;
						this.activeTabChange(this.activeIndex);
					}
				}
				if (this.startY < 120 && this.disY > 100) { //向下滑
					if (this.currentPage > 1) { // 查询上一页面
						this.currentPage--;
						this.getTaskData(this.currentPage, this.pageSize);
					}
				} else if (this.startY > 500 && this.disY < -100) { //向上滑
					if (this.currentPage < this.totalPage) {
						this.currentPage++;
						this.getTaskData(this.currentPage, this.pageSize);
					}
				}
			},
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
				background: linear-gradient(to left, #00FA9A, #ADFF2F);
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
		padding-top: 150upx;
	}

	.tabBar-wrapper {
		position: fixed;
		top: 100;
		z-index: 2000;
		width: 750upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20upx 10upx 8upx;
		background: linear-gradient(to bottom, #00C674, #66CC66);

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
			padding: 5upx 0;

			.tabBar-item {
				font-size: 14px;
				line-height: 24px;
				border: 1px solid #fff;
				color: #fff;
				padding: 5upx 22upx;
				border-radius: 10%;
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
		bottom: 15%;
		right: 3%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2000;
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
		background: linear-gradient(to bottom, #66CC66, #00B07B);
		box-shadow: 8upx 5upx 10upx 0upx RGBA(0, 198, 116, .3);

		.toolbar-icon {
			align-self: center;
			width: 50upx;
			height: 50upx;
		}
	}

	// .toolbar {
	// 	position: fixed;
	// 	bottom: 5%;
	// 	right: 3%;
	// 	width: 70upx;
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: center;
	// 	padding: 40upx 10upx 20upx 10upx;
	// 	border-radius: 40upx;
	// 	background:linear-gradient(to bottom, #66CC66,#00B07B);
	// 	.toolbar-item {
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: center;
	// 		align-self: center;
	// 		margin: 15upx 0;
	// 	}
	// 	.toolbar-icon {
	// 		align-self: center;
	// 		width: 40upx;
	// 		height: 40upx;
	// 	}
	// 	.toolbar-text {
	// 		align-self: center;
	// 		color: #f2f2f2;
	// 		font-size: 12px;
	// 		font-weight: 300;
	// 		margin-top: 5upx;
	// 	}
	// }
	//
</style>
