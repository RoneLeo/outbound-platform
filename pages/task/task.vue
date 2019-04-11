<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<cover-view v-show="rwzt<4 && toolbarShow" class="mask" @tap="toolBarShowChange">
			<cover-view v-show="isRecording" class="recording-box">
				<cover-image src="../../static/icon/record.png" class="recording-img"></cover-image>
			</cover-view>
		</cover-view>
		<cover-view class="toolbar" v-show="rwzt<4 && toolbarShow">
			<cover-view class="toolbar-item" @longpress="audioLongTap" @touchstart="audioTouchStart" @touchend="audioTouchEnd">
				<cover-image src="../../static/icon/record.png" class="toolbar-icon"></cover-image>
				<!-- <cover-view class="toolbar-text">{{txt}}</cover-view> -->
				<cover-view class="toolbar-text">长按</cover-view>
				<cover-view class="toolbar-text">录音</cover-view>
			</cover-view>
			<cover-view class="toolbar-item" @tap="gotoTakeVideo">
				<cover-image src="../../static/icon/video.png" class="toolbar-icon"></cover-image>
				<cover-view class="toolbar-text">点击</cover-view>
				<cover-view class="toolbar-text">录像</cover-view>
			</cover-view>
			<cover-view class="toolbar-item" @tap="toolBarShowChange">
				<cover-image src="../../static/icon/down.png" class="toolbar-icon"></cover-image>
			</cover-view>
		</cover-view>
		<view class="cicle-toolbar" v-show="rwzt<4 && !toolbarShow" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				开始
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				外访
			</view>
		</view>


		<BasicCase :tagTxt="tabList[rwzt]" :caseId="caseId" :taskId="taskId"></BasicCase>

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
		<view v-if="rwzt>3" class="page-block task-info record-block">
			<view class="block-name">
				历史催单记录
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
						<block v-if="feedbackTxt.fkfj">
							<view class="audio-media" v-for="(audio, audioIndex) in feedbackTxt.fkfj.audio" :key="audioIndex">
								<image v-show="!audio.isPlaying" src="../../static/icon/play.png" class="audio-icon" @tap="playFeedbackAudio(audioIndex)"></image>
								<image v-show="audio.isPlaying" src="../../static/icon/pause.png" class="audio-icon" @tap="playFeedbackAudio(audioIndex)"></image>
								<!-- <view class="audio-progress">
									<progress :percent="audio.percent" stroke-width="3" activeColor="#ffffff" backgroundColor="#aaaaaa" />
								</view> -->
								<!-- <view class="audio-length">{{audio.audio.time}}</view> -->
								<!-- <image src="../../static/icon/delete.png" class="audio-delete" @tap="deleteAudio(audioIndex)"></image> -->
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
				说明：微信小程序的使用内容占用较大，就会闪退，所以，建议录制视频的时长不可过长。
			</view>
		</view>
	</view>
</template>

<script>
	import BasicCase from '../../components/basic-case/basic-case.vue'
	import amap from '../../lib/amap-wx.js'
	// import util from '../../utils/util.js'
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
				caseId: 0,
				taskId: 0,
				user: {},
				rwzt: 0,
				recorderManager: {},
				innerAudioContext: {},
				innerAudioContexts: [],
				feedbackIAC: {},
				feedbackIACS: [],
				audioFileSrcs: [],
				amapPlugin: null,  
				amapKey: '4e8af665cf89ce76c04389a0719c67a5',
				txt: '长按录音',
				isRecording: false,
				toolbarShow: false,
				
				tabList: ['', '', '', '外访中', '已外访', '未通过', '已通过', '已发放'],
				feedbackTxt: {}
			};
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
					
				})
			}
			
			this.recorderManager = uni.getRecorderManager();
			this.innerAudioContext = uni.createInnerAudioContext();
			this.feedbackIAC = uni.createInnerAudioContext();
			
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
						console.log('录音的路径：', res.savedFilePath)
						this.audioFileSrcs.push(res.savedFilePath);
						setTimeout(() => {
							if (duration < 1000) {
								console.log('录音时间太短');
							} else {
								let audioSrc = Object.assign({}, {
										audio: {
											src: res.savedFilePath,
											date: this.$util.formatTime(new Date()),
											duration: duration > 0 ? duration : 0,
											time: this.$util.formateMSecond(Math.round(duration * 10) / 10)
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
			playFeedbackAudio(index) {
				
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
				console.log('任务id', this.taskId)
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
				console.log('length', files.length, files);
				
				uni.showLoading({
					title: '上传中...',
					mask: true
				})
				for(let i = 0; i < files.length; i ++) {
					let len = files[i].split('.').length;
						let uploadTask = uni.uploadFile({
							url: baseUrl + '/file/add', //仅为示例，非真实的接口地址
							header: header,
							name: 'file',
							filePath: files[i],
							formData: {
								rwid: this.taskId
							},
							success: (res) => {
								console.log(res, this.$store.state.formData.bz)
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
							}
						});
						uploadTask.onProgressUpdate((res) => {
							console.log('第'+ i + '个：' + res.progress, res.totalBytesSent, res.totalBytesExpectedToSend);
						});
				}
				
				//#endif
				
			},
			clearState() {
				this.resetFormData();
				uni.getSavedFileList({
					success: function(res) {
						let files = res.fileList;
						if (files.length > 0) {
							for(let i = 0; i < files.length; i ++) {
								uni.removeSavedFile({
									filePath: files[i].filePath,
									complete: function(res) {
									}
								});
							}
						}
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
						let tempFilePaths = res.tempFilePaths;
						let savedFiles = [];
						if(tempFilePaths.length) {
							for(let i = 0; i < tempFilePaths.length; i ++) {
								uni.saveFile({
									tempFilePath: tempFilePaths[i],
									success: (res) => {
										savedFiles.push(res.savedFilePath);
										if(i == tempFilePaths.length - 1) {
											console.log('图片的路径：', savedFiles)
											let tempArr = this.imgSrcList;
											tempArr = tempArr.concat(savedFiles);
											this.saveFormData({imgs: tempArr});
										}
									},
								})
							}
						}
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
