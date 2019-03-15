<template>
	<view class="page">
		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				开始
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;"> 
				外访
			</view>
		</view>
		<view class="toolbar" v-show="toolbarShow">
			<view class="toolbar-item">
				<image src="../../static/icon/record.png" class="toolbar-icon"></image>
				<view class="toolbar-text">录音</view>
			</view>
			<view class="toolbar-item">
				<image src="../../static/icon/takePhoto.png" class="toolbar-icon"></image>
				<view class="toolbar-text">拍照</view>
			</view>
			<view class="toolbar-item">
				<image src="../../static/icon/video.png" class="toolbar-icon"></image>
				<view class="toolbar-text">录像</view>
			</view>
			<view class="toolbar-item" @tap="toolBarShowChange">
				<image src="../../static/icon/down.png" class="toolbar-icon"></image>
			</view>
		</view>
		<view class="page-block case-head">
			<view class="basic-info">
				<view class="head-img-wrapper">
					<image src="../../static/icon/man.png" class="head-img"></image>
				</view>
				<view class="head-info">
					<view class="info-data info-title">
						<view class="info-name">张三</view>
						<view class="info-age">37岁</view>
						<view class="info-addr">四川省成都市</view>
					</view>
					<view class="info-data">
						委案到期日：2019-03-14
					</view>
					<view class="info-data">
						身份证号：511922177408299999
					</view>
				</view>
			</view>
			<view class="data-wrapper">
				<view class="data-item">
					<view class="data-name">逾期金额</view>
					<view class="data-num">12345.6元</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期金额</view>
					<view class="data-num">12345.6元</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期金额</view>
					<view class="data-num">12345.6元</view>
				</view>
			</view>
			<view class="case-staus">
				已接单
			</view>
		</view>
		<view class="page-block other-info">
			<Tab @change="tabchange($event,Defined)"></Tab>
			<view class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
			</view>
		</view>
		<!-- <view class="block-title">
			外访说明
		</view> -->
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
					<view class="list-item-tt over-text">外访说明</view>
					<view class="list-item-td over-text">到地址后仔细询问相关信息，并且记录下俩</view>
				</view>
			</view>
		</view>
		<!-- <view class="block-title">
			本次催单记录
		</view> -->
		<view class="page-block task-info record-block">
			<view class="block-name">
				本次催单记录表
				<view class="save-btn">上 传</view>
			</view>
			<view class="record-list">
				<view class="record-item">
					<view class="record-item-tt over-text">定 位</view>
					<view class="record-item-td">
						四川省成都市
						<view style="float: right;padding-right: 20upx;color: #333;">获取定位</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">图 片</view>
					<view class="record-item-td media-wrapper">
						<image src="../../static/indexPng/photo.png" class="img-media"></image>
						<image src="../../static/indexPng/bg.jpeg" class="img-media"></image>
						<image src="../../static/indexPng/bg.jpeg" class="img-media"></image>
						<image src="../../static/indexPng/bg.jpeg" class="img-media"></image>
						<image src="../../static/indexPng/bg.jpeg" class="img-media"></image>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">录 音</view>
					<view class="record-item-td media-wrapper">
						<view class="audio-media">
							<image src="../../static/icon/play.png" class="audio-icon"></image>
							<view class="audio-progress">
								<progress percent="20" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
							</view>
							<view class="audio-length">3:50</view>
						</view>
						<view class="audio-media">
							<image src="../../static/icon/play.png" class="audio-icon"></image>
							<view class="audio-progress">
								<progress percent="70" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
							</view>
							<view class="audio-length">3:50</view>
						</view>
						<view class="audio-media">
							<image src="../../static/icon/play.png" class="audio-icon"></image>
							<view class="audio-progress">
								<progress percent="90" stroke-width="3" activeColor="#ffffff" backgroundColor="#bbbbbb" />
							</view>
							<view class="audio-length">3:50</view>
						</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">视 频</view>
					<view class="record-item-td media-wrapper">
						<view class="video-media">
							<video src="https://www.itzixi.com:99/superhero/MARVEL/Thor3/trailer.mp4" controls></video>
						</view>
						<view class="video-media">
							<video src="https://www.itzixi.com:99/superhero/MARVEL/SpiderManHomecoming/trailer.mp4" controls></video>
						</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">记 录</view>
					<view class="record-item-td">
						<textarea value="" placeholder="请填写本次记录" auto-height cursor-spacing="10px" />
						<!-- <input type="text" value="" placeholder="请填写" /> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/stzhang-tab/stzhang-tab'
	export default {
		components:{
			Tab
		},
		data: {
			toolbarShow: false,
		},
		onLoad(params) {
			console.log(params, params.taskId)
		},
		methods:{
			tabchange(index, e) {
				console.log(index)
			},
			toolBarShowChange() {
				this.toolbarShow = !this.toolbarShow
			}
		}
	}
</script>
	
<style>
	@import url("./task.css");
</style>
