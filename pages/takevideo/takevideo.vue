<template>
	<view>
		<view class="page">
			<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
			<camera  class="camera" device-position="back" flash="off" @error="cameraError" @stop="cameraStop">
				<cover-view v-show="isRecording" class="record-time">
					<cover-view class='record-bling'>
						<cover-view v-show="isbling" class='bling'></cover-view>
					</cover-view>
					<cover-view style="width: 120upx;color: #f1f1f1;">{{time}}</cover-view>
				</cover-view>
				<cover-view class="tool-box">
					<cover-view class="img-box">
						<cover-image :src="tempsrc" class="img"></cover-image>
					</cover-view>
					<cover-view>
						<cover-view v-if="!isRecording" class="icon-box" @tap="btnClick()">
							<cover-view class="btn"></cover-view>
						</cover-view>
						<cover-view v-if="isRecording" id="circle" @tap="btnClick()">
							<cover-view class="squre"></cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="icon-box change-box">
					</cover-view>
				</cover-view>
			</camera>
		</view>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	import { mapState, mapMutations } from 'vuex'

	let interval = '', interval5 = '';
	export default {
		computed:{
			...mapState(['formData']),
			videoSrcList: {
				get () {
					return this.$store.state.formData.videos
				}
			},
		},
		data() {
			return {
				ctx: {},
				isRecording: false,
				src: '',
				tempsrc: '',
				recordTime: 0,
				time: '00:00',
				isbling: false
			};
		},
		onUnload() {
			clearInterval(interval);
			clearInterval(interval5);
		},
		onLoad() {
			this.ctx = uni.createCameraContext();
			uni.authorize({
				scope: 'scope.camera',
				success: () => {
					console.log('相机授权成功！')
				}
			});
		},
		methods: {
			btnClick() {
				if (this.isRecording) {
					this.stopRecord();
				} else {
					this.recordTime = 0;
					this.time = util.formateSecondDigital(this.recordTime);
					this.startRecord();
				}
			},
			stopRecord() {
				this.ctx.stopRecord({
					success: (res) => {
						this.tempsrc = res.tempThumbPath;
						this.src = res.tempVideoPath;
						this.isRecording = false;
						this.isbling = false;
						let arr = new Array(this.src);
						
						let temp = this.videoSrcList;
						temp = temp.concat(arr);
						this.$store.commit('saveFormData', {videos: temp});
					},
					fail: (res) => {
						this.HMmessages.show('Error！', {
							icon: 'error',
							closeButton: true,
							duration: 3000
						})
					}
				})
				clearInterval(interval);
				clearInterval(interval5);
			},
			startRecord() {
				console.log('startRecord');
				this.isRecording = true;
				this.ctx.startRecord({
					success: (res) => {
						console.log('success', res);
					},
					fail: (res) => {
						this.HMmessages.show('请确认是否打开摄像头权限！', {
							icon: 'error',
							closeButton: true,
							duration: 3000
						})
					}
				});
				interval = setInterval(() => {
					this.recordTime = this.recordTime + 1;
					this.time = util.formateSecondDigital(this.recordTime);
				}, 1000);
				interval5 = setInterval(() => {
					this.isbling = !this.isbling;
				}, 500);
			},
			saveVideo() {
				console.log(this.src)
			},
			
			cameraError(e) {
				console.log(e.detail);
			},
			cameraStop(e) {
				console.log('stop', e);
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/global.scss';
	
	#circle {
		width: 120upx;
		height: 120upx;
		border: 8upx #ff5500 solid;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.record-time {
		position: absolute;
		top: 0upx;
		left: 0;
		height: 30upx;
		width: 100%;
		background-color: #000;
		padding: 10px 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.record-bling {
		display: inline-block;
		width: 10upx;
		height: 10upx;
		margin-right: 5px;
	}

	.bling {
		width: 10upx;
		height: 10upx;
		background: #ff1c00;
		border-radius: 50%;
	}
	.squre {
		width: 50upx;
		height: 50upx;
		background-color: #ff1c00;
	}
</style>
