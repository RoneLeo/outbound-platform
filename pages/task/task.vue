<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view v-show="toolbarShow" class="mask" @tap="toolBarShowChange">
			<view v-show="isRecording" class="recording-box">
				<image src="../../static/icon/record.png" class="recording-img"></image>
			</view>
		</view>
		<view class="toolbar" v-show="toolbarShow">
			<view class="toolbar-item" @longpress="audioLongTap" @touchstart="audioTouchStart" @touchend="audioTouchEnd">
				<image src="../../static/icon/record.png" class="toolbar-icon"></image>
				<view class="toolbar-text">{{txt}}</view>
			</view>
			<!-- <view class="toolbar-item" @tap="gotoTakePhoto">
				<image src="../../static/icon/takePhoto.png" class="toolbar-icon"></image>
				<view class="toolbar-text">拍照</view>
			</view> -->
			<view class="toolbar-item" @tap="gotoTakeVideo">
				<image src="../../static/icon/video.png" class="toolbar-icon"></image>
				<view class="toolbar-text">点击录像</view>
			</view>
			<view class="toolbar-item" @tap="toolBarShowChange">
				<image src="../../static/icon/down.png" class="toolbar-icon"></image>
			</view>
		</view>
		<view class="cicle-toolbar" v-show="!toolbarShow" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				开始
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				外访
			</view>
		</view>


		<BasicCase :tagTxt="tabList[zt]"></BasicCase>

		<view class="page-block task-info record-block">
			<view class="block-name">
				本次催单记录表
				<view class="save-btn">上 传</view>
				<view class="save-btn" @tap="clearState" style="margin-right: 10upx;">清 空</view>
			</view>
			<view class="record-list">
				<view class="record-item">
					<view class="record-item-tt over-text">定 位</view>
					<view class="record-item-td addr-block">
						<textarea v-model="addressName" auto-height @change="addressChange" @blur="addressChange" @confirm="addressChange"
						 class="addr-textarea" />
						<view @tap="getLocation()" class="addr-btn">获取定位</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">记 录</view>
					<view class="record-item-td">
						<textarea :value="bz" placeholder="请填写本次记录" @change="bzChange" @blur="bzChange" @confirm="bzChange" auto-height cursor-spacing="10px" />
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
								<progress :percent="audio.percent" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
							</view>
							<view class="audio-length">{{audio.audio.time}}</view>
							<image src="../../static/icon/delete.png" class="audio-delete" @tap="deleteAudio(audioIndex)"></image>
						</view>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">视 频</view>
					<view class="record-item-td media-wrapper">
						<view class="video-media" v-for="(video, videoIndex) in videoSrcList" :key="videoIndex">
							<video :src="video" controls></video>
							<image src="../../static/icon/delete.png" class="video-delete" @tap="deleteVideo(videoIndex)" data-imgIndex="videoIndex"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="page-end">
			<view class="end-txt">-- END --</view>
		</view>
	</view>
</template>

<script>
	import BasicCase from '../../components/basic-case/basic-case.vue'
	import amap from '../../lib/amap-wx.js'
	import util from '../../utils/util.js'
	import HMmessages from '../../components/HM-messages/HM-messages'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		computed: {
			...mapState(['formData']),
			imgSrcList: {
				get () {
					return this.$store.state.formData.imgs
				}
			},
			audioSrcList: {
				get () {
					return this.$store.state.formData.audios
				}
			},
			videoSrcList(){
				return this.$store.state.formData.videos;
			},
			addressName: {
				get () {
					return this.$store.state.formData.wz
				},
				set (value) {
					console.log('wz:', value);
					let temp = Object.assign({}, {wz: value});
					this.$store.commit('saveFormData', temp)
				}
			},
			bz: {
				get () {
					return this.$store.state.formData.bz
				},
				set (value) {
					console.log('bz:', value);
					let temp = Object.assign({}, {bz: value});
					this.$store.commit('saveFormData', temp)
				}
			}
		},
		components:{
			BasicCase,
			HMmessages
		},
		data() {
			return {
				recorderManager: {},
				innerAudioContext: {},
				innerAudioContexts: [],
				audioFileSrcs: [],
				amapPlugin: null,  
				amapKey: '4e8af665cf89ce76c04389a0719c67a5',
				txt: '长按录音',
				isRecording: false,
				toolbarShow: false,
				
				tabList: ['外访中', '已外访', '未通过', '已通过', '已发放'],
				zt: '0'
			};
		},
		onLoad(params) {
			console.log(params, params.id, params.zt)
			this.zt = Number(params.zt)
			//#ifdef MP-WEIXIN
			uni.authorize({
				scope: 'scope.record',
				success() {
					uni.getRecorderManager()
				}
			});
			uni.authorize({
				scope: 'scope.userLocation',
				success: () => {
					this.getLocation()
				}
			});
			this.amapPlugin = new amap.AMapWX({key:this.amapKey});
			//#endif
			
			this.recorderManager = uni.getRecorderManager();
			this.innerAudioContext = uni.createInnerAudioContext();
			this.recorderManager.onError((res) => {
				console.log('录音错误', res)
			})
			
			this.recorderManager.onStop((res) => {
				console.log("结束录音", res)
				this.txt = '长按录音';
				const { tempFilePath, duration } = res;
				uni.saveFile({
					tempFilePath: tempFilePath,
					success: (res) => {
						this.audioFileSrcs.push(res.savedFilePath);
						setTimeout(() => {
							if (duration < 1000) {
								console.log('录音时间太短');
							} else {
								let audioSrc = Object.assign({}, {
										audio: {
											src: tempFilePath,
											date: util.formatTime(new Date()),
											duration: duration > 0 ? duration : 0,
											time: util.formateMSecond(Math.round(duration * 10) / 10)
										},
										percent: 0,
										isPlaying: false
									});
								let arr = new Array(audioSrc);
																	
								let tempArr = this.audioSrcList;
								tempArr = tempArr.concat(arr);
								this.saveFormData({audios: tempArr});
							}
						}, 500)
					},
					fail: (res) => {
						console.log('录音文件保存失败')
					},
					complete: (res) => {
						console.log('录音文件保存完成')
					}
				})
			})
		},
		methods:{
			...mapMutations(['saveFormData', 'resetFormData']),
			clearState() {
				this.resetFormData();
			},
			addressChange(e) {
				let data = e.detail.value;
				this.addressName = data;
			},
			bzChange(e) {
				let data = e.detail.value;
				this.bz = data;
			},
			gotoTakePhoto() {
				uni.navigateTo({
					url: '../takephoto/takephoto'
				});
			},
			gotoTakeVideo() {
				uni.navigateTo({
					url: '../takevideo/takevideo'
				});
			},
			playAudio(index) {
				if(this.audioSrcList[index].isPlaying) {
					this.innerAudioContext.stop()
					this.innerAudioContext.onStop( () => {
						console.log('stop')
						this.audioSrcList[index].isPlaying = false;
					})
				}else {
					console.log(index, this.audioSrcList[index], this.audioFileSrcs[index],  this.innerAudioContext)
					this.innerAudioContext.src = this.audioFileSrcs[index];
					this.innerAudioContext.play();
					
					this.innerAudioContext.onPlay(() => {
						console.log('开始播放')
						for(let i = 0; i < this.audioSrcList.length; i ++) {
							this.audioSrcList[i].isPlaying = (i!= index) ? false : true;
						}
					});
					
					this.innerAudioContext.onTimeUpdate(() => {
						console.log('进度更新', this.innerAudioContext.currentTime, this.innerAudioContext.duration, this.audioSrcList[index].audio.duration)
						// const time = Math.floor(this.audioSrcList[index].audio.duration / 250);
						// this.audioSrcList[index].percent = this.audioSrcList[index].percent + Math.ceil(100 / time);
						const time = this.innerAudioContext.currentTime, duration = this.innerAudioContext.duration;
						this.audioSrcList[index].percent = (time/duration)*100
					})
							
					this.innerAudioContext.onEnded(() => {
						console.log('播放结束')
						this.audioSrcList[index].isPlaying = false;
						this.audioSrcList[index].percent = 100;
					});
					this.innerAudioContext.onError((res) => {
						this.audioSrcList[index].isPlaying = false;
						console.log('播放出错', res);
					});
					
						
				}
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
				this.isRecording = false;
			},
			bindStopAudio() {
				this.recorderManager.stop();
				console.log("this.recorderManager.stop")
				
			},
			bindRecordAudio() {
				const options = { //录音配置选项
					duration: 300000,
					sampleRate: 44100,
					numberOfChannels: 1,
					encodeBitRate: 192000,
					format: 'mp3'
				}
				this.recorderManager.start(options);
				this.isRecording = true;
				this.recorderManager.onStart(() => {
					console.log('recorder start')
				})
			},
			chooseImg() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success:  (res) => {
						let tempArr = this.imgSrcList;
						tempArr = tempArr.concat(res.tempFilePaths);
						this.saveFormData({imgs: tempArr});
					}
				});
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.amapPlugin.getRegeo({
							success: (data) => {  
								console.log(res)
								console.log('getRegeo', data);
								this.addressName = data[0].regeocodeData.formatted_address;  
							},
							fail: (info) => {
								this.HMmessages.show('获取地址失败，请自己填写！', {icon: 'success', closeButton: true, duration: 3000})
							}
						});  
					}
				});
			},
			deleteVideo(index) {
				let tempArr = this.videoSrcList;
				tempArr.splice(index,1);
				this.saveFormData({videos: tempArr});
			},
			deleteAudio(index) {
				let tempArr = this.audioSrcList;
				tempArr.splice(index,1);
				this.audioFileSrcs.splice(index, 1);
				this.saveFormData({audios: tempArr});
			},
			deleteImg(index) {
				let tempArr = this.imgSrcList;
				tempArr.splice(index,1);
				this.saveFormData({imgs: tempArr});
			},
			previewImgs(index) {
				//#ifdef APP-PLUS || MP-WEIXIN
				console.log(index);  
				var me = this;
				var imgIndex = index;
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
