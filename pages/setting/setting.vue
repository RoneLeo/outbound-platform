<template>
	<view class="page">
		<view class="list">
			<view class="list-item">
				<view class="list-tt">姓名</view>
				<view class="list-td">
					刘柳
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
			</view>
			<view class="list-item">
				<view class="list-tt">性别</view>
				<view class="list-td">
					女
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
			</view>
			<view class="list-item">
				<view class="list-tt">年龄</view>
				<view class="list-td">
					27岁
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
			</view>
			<view class="list-item">
				<view class="list-tt">账号</view>
				<view class="list-td">
					admin
					<image src="../../static/icon/right.png" class="list-right"></image>
				</view>
			</view>
		</view>
		<view class="logout">
			<button type="primary" class="logout-btn">退出当前账号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list {
		background: #ffffff;
		padding: 0 30upx;
		.list-item {
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			// font-weight: 300;
			color: #313131;
			padding: 20upx 5upx;
			border-bottom: 1px solid #f1f1f1;
			.list-tt, .list-td {
				align-self: center;
			}
			.list-td {
				display: flex;
				.list-right {
					align-self: center;
					width: 30upx;
					height: 30upx;
				}
			}
		}
		.list-item:last-child {
			border-bottom: 0;
		}
	}
	.logout {
		position: fixed;
		bottom: 100upx;
		padding: 30upx;
		width: 690upx;
		.logout-btn {
			height: 90upx;
			line-height: 90upx;
			border: 0;
			border-radius: 45upx;
			font-size: 16px;
			background: linear-gradient(to right, #66CC66, #00B07B);
			width: 600upx;
		}
	}
	
	

</style>
