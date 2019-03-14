<template>
	<view class="page">
		<view v-show="toolbarShow" class="tabBar-wrapper">
			<view class="tabBar">
				<view class="tabBar-item">外访中</view>
				<view class="tabBar-item">已外访</view>
				<view class="tabBar-item">未通过</view>
				<view class="tabBar-item">未通过</view>
				<view class="tabBar-item">未通过</view>
			</view>
			<image src="../../static/icon/close.png" class="tabBar-icon" @tap="toolBarShowChange"></image>
		</view>
		
		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<image src="../../static/icon/filter.png" class="toolbar-icon"></image>
			
		</view>
		<view class="toolbar" v-show="toolbarShow">
			<view class="toolbar-item">
				<!-- <image src="../../static/icon/record.png" class="toolbar-icon"></image> -->
				<view class="toolbar-text">已接单</view>
			</view>
			<view class="toolbar-item">
				<!-- <image src="../../static/icon/takePhoto.png" class="toolbar-icon"></image> -->
				<view class="toolbar-text">已外访</view>
			</view>
			<view class="toolbar-item">
				<!-- <image src="../../static/icon/video.png" class="toolbar-icon"></image> -->
				<view class="toolbar-text">审核通过</view>
			</view>
			<view class="toolbar-item">
				<!-- <image src="../../static/icon/video.png" class="toolbar-icon"></image> -->
				<view class="toolbar-text">审核不通过</view>
			</view>
			<view class="toolbar-item">
				<!-- <image src="../../static/icon/video.png" class="toolbar-icon"></image> -->
				<view class="toolbar-text">佣金已发放</view>
			</view>
			<view class="toolbar-item" @tap="toolBarShowChange">
				<image src="../../static/icon/down.png" class="toolbar-icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toolbarShow: false
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
	.tabBar-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20upx 0upx 0upx;
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
	width: 100upx;
	height: 100upx;
	border-radius: 50upx;
	background:linear-gradient(to bottom, #66CC66,#00B07B);
	.toolbar-icon {
		align-self: center;
		width: 60upx;
		height: 60upx;
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
