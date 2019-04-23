<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<cover-view v-show="rwzt<4 && toolbarShow" class="mask" @tap="toolBarShowChange">
			<cover-view v-show="isRecording" class="recording-box">
				<cover-image src="../../static/icon/record.png" class="recording-img"></cover-image>
			</cover-view>
		</cover-view>
		<cover-view class="toolbar" v-show="rwzt<4 && toolbarShow">
			<cover-view class="toolbar-item" @longpress="audioLongTap" @touchstart="audioTouchStart" @touchend="audioTouchEnd"
			 style="padding: 45upx 0 20upx 0;">
				<cover-image src="../../static/icon/record.png" class="toolbar-icon"></cover-image>
				<!-- <cover-view class="toolbar-text">{{txt}}</cover-view> -->
				<cover-view class="toolbar-text">长按</cover-view>
				<cover-view class="toolbar-text">录音</cover-view>
			</cover-view>
			<!-- <cover-view class="toolbar-item" @tap="gotoTakeVideo">
				<cover-image src="../../static/icon/video.png" class="toolbar-icon"></cover-image>
				<cover-view class="toolbar-text">点击</cover-view>
				<cover-view class="toolbar-text">录像</cover-view>
			</cover-view> -->
			<cover-view class="toolbar-item" @tap="toolBarShowChange">
				<cover-image src="../../static/icon/down.png" class="toolbar-icon"></cover-image>
			</cover-view>
		</cover-view>
		<view class="cicle-toolbar" v-show="rwzt<4 && !toolbarShow" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				录音
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				操作
			</view>
		</view>


		<BasicCase from="myTask" :caseId="caseId" :taskId="taskId"></BasicCase>

		<view v-if="rwzt<4" class="page-block task-info record-block">
			<view class="block-name">
				本次催单记录表
				<view class="save-btn" @tap="submitFeedbck">上 传</view>
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
							<view class="img-delete-wrapper">
								<image src="../../static/icon/deleteImg.png" class="img-delete" @tap="deleteImg(imgIndex)" :data-imgIndex="imgIndex"></image>
							</view>
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
							<video :src="video" controls>111</video>
							<cover-image src="../../static/icon/delete.png" class="video-delete" @tap="deleteVideo(videoIndex)" data-imgIndex="videoIndex"></cover-image>
						</view>
						<view class="video-media" style="padding: 10upx;align-self: center;height: 65upx;">
							<view @click="chooseVideo()" style="width: 98%; height: 55upx; display: flex;justify-content: center;align-items: center;border: 1px dashed #ccc;border-radius: 10upx">
								<image src="../../static/icon/addImg.png" style="width: 30upx; height: 30upx;"></image>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view v-if="rwzt>3" class="page-block task-info record-block">
			<view class="block-name">
				历史催单记录
				<!-- <view class="save-btn" @tap="clearState" style="margin-right: 10upx;">清 空</view> -->
			</view>
			<view class="record-list">
				<view class="record-item">
					<view class="record-item-tt over-text">记 录</view>
					<view class="record-item-td">
						{{feedbackTxt.fknr}}
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">图 片</view>
					<view class="record-item-td media-wrapper">
						<block v-if="feedbackTxt.fkfj">
							<view v-for="(img, imgIndex) in feedbackTxt.fkfj.photo" :key="imgIndex" class="img-media-block">
								<image :src="'http://182.151.22.247:8083/' + img" class="img-media" mode="aspectFill" @tap="lookImages(imgIndex)"></image>
							</view>
						</block>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">录 音</view>
					<view class="record-item-td media-wrapper">
						<block v-if="feedbackAudios.length">
							<view class="audio-media" v-for="(audio, audioIndex) in feedbackAudios" :key="audioIndex">
								<image v-show="!audio.isPlaying" src="../../static/icon/play.png" class="audio-icon" @tap="playFeedbackAudio(audioIndex)"></image>
								<image v-show="audio.isPlaying" src="../../static/icon/pause.png" class="audio-icon" @tap="playFeedbackAudio(audioIndex)"></image>
								<view class="audio-progress">
									<progress :percent="audio.percent" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
								</view>
								<view class="audio-length">{{audio.time}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="record-item">
					<view class="record-item-tt over-text">视 频</view>
					<view class="record-item-td media-wrapper">
						<block v-if="feedbackTxt.fkfj">
							<view class="video-media" v-for="(video, videoIndex) in feedbackTxt.fkfj.video" :key="videoIndex">
								<video :src="'http://182.151.22.247:8083/' + video" controls></video>
							</view>
						</block>
					</view>
				</view>
				
			</view>
		</view>
		<view class="page-end">
			<view class="end-txt">
				说明：建议录制音频的时长不可过长。
			</view>
		</view>
	</view>
</template>

<script>
	import BasicCase from '../../components/basic-case/basic-case.vue'
	import amap from '../../lib/amap-wx.js'
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
			videoSrcList: {
				get () {
					return this.$store.state.formData.videos
				}
			},
			addressName: {
				get () {
					return this.$store.state.formData.wz
				},
				set (value) {
					let temp = Object.assign({}, {wz: value});
					this.$store.commit('saveFormData', temp)
				}
			},
			bz: {
				get () {
					return this.$store.state.formData.bz
				},
				set (value) {
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
				caseId: 0,
				taskId: 0,
				user: {},
				rwzt: 0,
				recorderManager: {},
				innerAudioContext: {},
				// innerAudioContexts: [],
				feedbackIAC: {},
				feedbackCts: [],
				audioFileSrcs: [],
				amapPlugin: null,  
				amapKey: '4e8af665cf89ce76c04389a0719c67a5',
				txt: '长按录音',
				isRecording: false,
				toolbarShow: false,
				
				tabList: ['', '', '', '外访中', '已外访', '未通过', '已通过', '已发放'],
				feedbackTxt: {},
				feedbackAudios: []
			};
		},
		onUnload() {
			this.recorderManager = {};
			this.innerAudioContext = {};
			this.feedbackIAC = {};
		},
		onLoad(params) {
			this.caseId = params.caseId;
			this.taskId = params.taskId;
			this.rwzt = params.rwzt;
			this.user = this.getGlobalUser() != null ? this.getGlobalUser() : {};
			
			//#ifdef MP-WEIXIN
			uni.authorize({
				scope: 'scope.record',
				success() {
					uni.getRecorderManager();
				}
			});
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation();
				}
			});
			this.amapPlugin = new amap.AMapWX({key:this.amapKey});
			//#endif
			
			if(Number(this.rwzt) > 3) {
				this.$api.post('/feedback/findAllByRwid', {rwid: this.taskId}).then(res => {
					this.feedbackTxt = res.data;
					if(res.data.fkfj && res.data.fkfj.audio.length) {
						let audios = res.data.fkfj &&res.data.fkfj.audio;
						this.feedbackAudios = audios.map(item => {
							let strs = item.split('.');
							let str = strs[strs.length - 2];
							let len = str.split('=').length;
							let time = str.split('=')[len-1];
							console.log('time',str, time);
							return {src: item, isPlaying: false, percent: 0, time: time ? this.$util.formateMSecond(Math.round(time * 10) / 10):''}
						})
						
					}
				})
			}
			
			this.recorderManager = uni.getRecorderManager();
			this.innerAudioContext = uni.createInnerAudioContext();
			this.feedbackIAC = uni.createInnerAudioContext();
			
			this.recorderManager.onError((res) => {
				uni.showToast({
					title:'录音出错',
					icon: 'none'
				})
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
								uni.showToast({
									title:'录音时长太短',
									icon: 'none'
								})
							} else {
								let audioSrc = Object.assign({}, {
										audio: {
											src: res.savedFilePath,
											date: this.$util.formatTime(new Date()),
											duration: duration > 0 ? duration : 0,
											time: duration > 0 ? this.$util.formateMSecond(Math.round(duration)) : '00:00'
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
						uni.showToast({
							title:'录音文件缓存出错',
							icon: 'none'
						})
					}
				})
			})
		},
		methods:{
			...mapMutations(['saveFormData', 'resetFormData']),
			playFeedbackAudio(index) {
				if(this.feedbackAudios[index].isPlaying) {
					this.feedbackIAC.stop()
					this.feedbackIAC.onStop( () => {
						this.feedbackAudios[index].isPlaying = false;
					})
				}else {
					uni.downloadFile({
						url: this.$url + '/' + this.feedbackAudios[index].src, //仅为示例，并非真实的资源
						success: (res) => {
							if (res.statusCode === 200) {
								this.feedbackIAC.src = res.tempFilePath;
								this.feedbackIAC.play();
								this.feedbackIAC.onPlay(() => {
									for(let i = 0; i < this.feedbackAudios.length; i ++) {
										this.feedbackAudios[i].isPlaying = (i!= index) ? false : true;
									}
								});
			
								this.feedbackIAC.onTimeUpdate(() => {
									this.feedbackAudios[index].time = this.$util.formateSecondDigital(Math.round(this.feedbackIAC.currentTime))
									const time = this.feedbackIAC.currentTime, duration = this.feedbackIAC.duration;
									this.feedbackAudios[index].percent = (time/duration)*100
								})
							}else {
								uni.showToast({
									title:'音频文件下载出错',
									icon: 'none'
								})
							}
					
							this.feedbackIAC.onEnded(() => {
								console.log('播放结束')
								this.feedbackAudios[index].isPlaying = false;
								this.feedbackAudios[index].percent = 100;
							});
							this.feedbackIAC.onError((res) => {
								this.feedbackAudios[index].isPlaying = false;
								console.log('播放出错', res);
							});
						},
						fail(res) {
							uni.showToast({
								title:'音频文件下载出错',
								icon: 'none'
							})
						}
					});
					
				}
			},
			playAudio(index) {
				if(this.audioSrcList[index].isPlaying) {
					this.innerAudioContext.stop()
					this.innerAudioContext.onStop( () => {
						this.audioSrcList[index].isPlaying = false;
					})
				}else {
					this.innerAudioContext.src = this.audioFileSrcs[index];
					this.innerAudioContext.play();
					
					this.innerAudioContext.onPlay(() => {
						console.log('开始播放')
						this.audioSrcList[index].percent = 0;
						for(let i = 0; i < this.audioSrcList.length; i ++) {
							this.audioSrcList[i].isPlaying = (i!= index) ? false : true;
						}
					});
					
					this.innerAudioContext.onTimeUpdate(() => {
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
			lookImages(index) {
				if(this.feedbackTxt.fkfj && this.feedbackTxt.fkfj.photo.length) {
					let urls = this.feedbackTxt.fkfj.photo
					uni.previewImage({
						current: urls[index],
						urls: urls
					})
				}
			},
			submitFeedbck() {
				//#ifdef MP-WEIXIN
				uni.showModal({
					title: '提示',
					content: '是否确定外访任务已完成？',
					success: (res) => {
						if (res.confirm) {
							const baseUrl = "http://www.chiy.online:8083";
							const header = {
								'cookie': 'JSESSIONID=' + uni.getStorageSync("sessionId")
							}
							let imgs = this.$store.state.formData.imgs;
							let videos = this.$store.state.formData.videos;
							let audios = this.$store.state.formData.audios.map(item => {
								return item.audio.src
							});
							const files = [].concat(imgs).concat(videos).concat(audios);
            
							uni.showLoading({
								title: '上传中...',
								mask: true
							})
							for(let i = 0; i < files.length; i ++) {
								let uploadTask = uni.uploadFile({
									url: baseUrl + '/file/add', //仅为示例，非真实的接口地址
									header: header,
									name: 'file',
									filePath: files[i],
									formData: {
										rwid: this.taskId
									},
									success: (res) => {
										if(i == files.length - 1) {
											setTimeout(() => {
												this.$api.post('/feedback/add', {rwid: this.taskId, fkr: this.user.id, fknr: this.$store.state.formData.bz }).then(res => {
													uni.hideLoading();
													if(res.resCode == 200) {
														this.HMmessages.show('任务反馈成功！', {icon: 'success', closeButton: true, duration: 3000})
														this.clearState();
													}else {
														this.HMmessages.show(res.resMsg, {icon: 'error', closeButton: true, duration: 3000})
													}
												})
											}, 500);
										}
									},
									fail: () => {
										uni.showToast({
											title: '上传第' + (i + 1) + '文件时出错',
											icon: 'none'
										})
										uni.hideLoading();
									}
								});
								uploadTask.onProgressUpdate((res) => {
									// console.log('第'+ i + '个：' + res.progress, res.totalBytesSent, res.totalBytesExpectedToSend);
								});
							}
						} else if (res.cancel) {
							uni.showToast({
								title: '取消上传',
								icon: 'none'
							})
						}
					}
				});
				
				//#endif
				
			},
			clearState() {
				uni.showLoading({
					title: '清空中...',
					mask: true
				})
				this.resetFormData();
				uni.getSavedFileList({
					success: function(res) {
						let files = res.fileList;
						if (files.length > 0) {
							for(let i = 0; i < files.length; i ++) {
								uni.removeSavedFile({
									filePath: files[i].filePath,
									success: function(res) {
										if(i == files.length - 1) {
											uni.hideLoading()
										}
									},
									fail() {
										uni.hideLoading()
									}
								});
							}
						}
					},
					fail() {
						uni.hideLoading()
					}
				});
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
			chooseVideo() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: (res) => {
						let tempFilePaths = res.tempFilePath;
						if(tempFilePaths.length) {
							let tempArr = this.videoSrcList;
							tempArr = tempArr.concat(tempFilePaths);
							this.saveFormData({videos: tempArr});
						}
					},
					fail() {
						uni.showToast({
							title: '未选择到视频',
							icon: 'none'
						})
					}
				});
			},
			chooseImg() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success:  (res) => {
						let tempFilePaths = res.tempFilePaths;
						if(tempFilePaths.length) {
							let tempArr = this.imgSrcList;
							tempArr = tempArr.concat(tempFilePaths);
							this.saveFormData({imgs: tempArr});
						}
					},
					fail() {
						uni.showToast({
							title: '未选择到图片',
							icon: 'none'
						})
					}
				});
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.amapPlugin.getRegeo({
							success: (data) => {  
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
			toolBarShowChange() {
				this.toolbarShow = !this.toolbarShow
			}
		}
	}
</script>
	
<style>
	@import url("./task.css");
</style>
