<template>
	<view class="page">
		<view v-show="toolbarShow" class="mask" @tap="toolBarShowChange"></view>
		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				开始
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				外访
			</view>
		</view>
		<view class="toolbar" v-show="toolbarShow">
			<view class="toolbar-item" @longpress="audioLongTap" @touchstart="audioTouchStart" @touchend="audioTouchEnd">
				<image src="../../static/icon/record.png" class="toolbar-icon"></image>
				<view class="toolbar-text">{{txt}}</view>
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
					<view class="data-name">已还款金额</view>
					<view class="data-num">123元</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期天数</view>
					<view class="data-num">135天</view>
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
					<view class="list-item-td over-text">确认案件对象信息完整</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">外访说明</view>
					<view class="list-item-td over-text">到地址后仔细询问相关信息，并且记录下俩</view>
				</view>
			</view>
		</view>

		<view class="page-block task-info record-block">
			<view class="block-name">
				本次催单记录表
				<view class="save-btn">上 传</view>
			</view>
			<view class="record-list">
				<view class="record-item">
					<view class="record-item-tt over-text">定 位</view>
					<view class="record-item-td addr-block">
						<textarea :value="addressName" auto-height class="addr-textarea" />
						<view @tap="getLocation()" class="addr-btn">获取定位</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">记 录</view>
					<view class="record-item-td">
						<textarea value="" placeholder="请填写本次记录" auto-height cursor-spacing="10px" />
						<!-- <input type="text" value="" placeholder="请填写" /> -->
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">图 片</view>
					<view class="record-item-td media-wrapper">
						<view v-for="(img, imgIndex) in imgSrcList" :key="imgIndex" class="img-media-block">
							<image :src="img" class="img-media" mode="aspectFill"></image>
							<image src="../../static/icon/deleteImg.png" class="img-delete" @tap="deleteImg(imgIndex)" :data-imgIndex="imgIndex"></image>
						</view>
						<view class="img-media" style="padding: 10upx;align-self: center;">
							<view @click="chooseImg()" style="width: 160upx; height: 235upx; display: flex;justify-content: center;align-items: center;border: 1px dashed #ccc;">
								<image src="../../static/icon/addImg.png" style="width: 60upx; height: 70upx;"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">录 音</view>
					<view class="record-item-td media-wrapper">
						<view class="audio-media" v-for="(audio, audioIndex) in audioSrcList" :key="audioIndex">
							<image v-show="!audio.isPlaying" src="../../static/icon/play.png" class="audio-icon" @tap="playAudio(audioIndex)"></image>
							<image v-show="audio.isPlaying" src="../../static/icon/pause.png" class="audio-icon" @tap="playAudio(audioIndex)"></image>
							<view class="audio-progress">
								<progress percent="20" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
							</view>
							<view class="audio-length">0:10</view>
							<image src="../../static/icon/delete.png" class="audio-delete" @tap="deleteAudio(audioIndex)"></image>
						</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">视 频</view>
					<view class="record-item-td media-wrapper">
						<view class="video-media">
							<video src="https://www.itzixi.com:99/superhero/MARVEL/Thor3/trailer.mp4" controls></video>
						</view>
						<!-- <view class="video-media">
							<video src="https://www.itzixi.com:99/superhero/MARVEL/SpiderManHomecoming/trailer.mp4" controls></video>
						</view> -->
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/stzhang-tab/stzhang-tab'
	import amap from '../../lib/amap-wx.js'
	import util from '../../utils/util.js'
	const recorderManager = uni.getRecorderManager(); //录音管理器实例
	const innerAudioContext = uni.createInnerAudioContext()
	export default {
		components:{
			Tab
		},
		data() {
			return {
				amapPlugin: null,  
				amapKey: '4e8af665cf89ce76c04389a0719c67a5',
				imgSrcList: [
					"../../static/indexPng/photo2.png",
					"../../static/indexPng/photo1.png"
				],
				toolbarShow: false,
				addressName: '成都市',
				audioSrcList: [],
				txt: '长按录音'
			};
		},
		onLoad(params) {
			this.amapPlugin = new amap.AMapWX({  
				key: this.amapKey  
			}); 
			console.log(util.formatTime(new Date()))
			console.log(params, params.taskId)
		},
		methods:{
			playAudio(index) {
				innerAudioContext.play();
				innerAudioContext.onPlay(() => {
					this.audioSrcList[index].isPlaying = true;
					console.log('开始播放')
				});
				innerAudioContext.onTimeUpdate(() => {
					const time = Math.floor(this.audioSrcList[index].audio.duration / 0.25);
					console.log('监听进度', time);
				});
				innerAudioContext.onEnded( () => {
					this.audioSrcList[index].isPlaying = false;
				});
			},
			audioLongTap() {

			},
			audioTouchStart() {
				this.txt = '录音中...';
				this.bindRecordAudio();
			},
			audioTouchEnd() {
				this.bindStopAudio();
				this.toolBarShowChange();
			},
			bindStopAudio() {
				recorderManager.stop();
				recorderManager.onStop((res) => {
					console.log('recorder stop', res)
					this.txt = '长按录音';
					const { tempFilePath } = res;
					innerAudioContext.src = tempFilePath;
					console.log('档期内音频', innerAudioContext, innerAudioContext.duration)
					setTimeout(() => {
// 						if (s < 1) {
// 							console.log('录音时间太短');
// 						} else {
							let audioSrc = Object.assign({}, {
								audio: {
									src: tempFilePath,
									date: util.formatTime(new Date()),
									duration: innerAudioContext.duration,
									time: util.formateSecond(Math.round(innerAudioContext.duration * 10) / 10)
								},
								percent: 0,
								isPlaying: false
							});
							let arr = [];
							arr.push(audioSrc);
							console.log(arr, audioSrc)
							this.audioSrcList = this.audioSrcList.concat(arr);
							console.log('audioSrcList', this.audioSrcList);
						// }
					}, 500)
				})
			},
			bindRecordAudio() {
				const options = { //录音配置选项
					duration: 300000,
					sampleRate: 44100,
					numberOfChannels: 1,
					encodeBitRate: 192000,
					format: 'aac'
				}
				recorderManager.start(options);
				recorderManager.onStart(() => {
					console.log('recorder start')
				})

			},
			chooseImg() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.imgSrcList = this.imgSrcList.concat(res.tempFilePaths)
					}
				});
			},
			getAddrName() {  
				uni.showLoading({  
					title: '获取信息中'  
				});  
				this.amapPlugin.getRegeo({
					success: (data) => {  
						console.log(data)  
						this.addressName = data.geocodes.formatted_address;  
						console.log(this.addressName)
						uni.hideLoading();  
					},
					fail: (info) => {
						console.log(info)
					}
				});  
			},
			getLocation(e) {
				console.log(e)
				// let position = Object.assign({}, {longitude})
				// this.getAddrName();
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log(res)
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			deleteAudio(index) {
				this.audioSrcList.splice(index,1);
			},
			deleteImg(index) {
				this.imgSrcList.splice(index,1);
			},
			previewImgs(index) {
				//#ifdef APP-PLUS || MP-WEIXIN
				console.log(index);    //这里打印为undefined
				var me = this;
				var imgIndex = index;
				// var imgIndex = e.currentTarget.dataset.imgindex;   //这里报错
				var newStaffArray = [];
				newStaffArray = newStaffArray.concat(me.imgSrcList);
				
				var urls = [];
				urls = newStaffArray.concat();
				uni.previewImage({
					current: urls[imgIndex],
					urls: urls
				})
				//#endif
			},
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
