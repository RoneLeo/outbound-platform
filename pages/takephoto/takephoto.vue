<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<camera class="camera" device-position="back" flash="off" @error="cameraError" @stop="cameraStop">
			<cover-view class="tool-box">
				<cover-view class="img-box">
					<cover-image :src="src" class="img"></cover-image>
				</cover-view>
				<cover-view class="icon-box" @tap="takePhoto()">
					<cover-view class="btn"></cover-view>
				</cover-view>
				<cover-view class="icon-box change-box">
					{{userName}}
					<!-- <cover-image :src="src" class="img"></cover-image> -->
				</cover-view>
			</cover-view>
		</camera>
	</view>
</template>

<script>
	import HMmessages from '../../components/HM-messages/HM-messages'
	import {  
        mapState,  
        mapMutations  
    } from 'vuex'
	export default {
		components: {
			HMmessages
		},
		computed: {
			imgSrcList: {
				get () {
					return this.$store.state.formData.imgs
				},
				set (value) {
					let temp = Object.assign({}, {imgs: value});
					this.$store.commit('saveFormData', temp)
				}
			},
		},
		data() {
			return {
				src: '',
				cameraShow: true
			};
		},
		onLoad() {
			uni.authorize({
				scope: 'scope.camera',
				success: () => {
					console.log('相机授权成功！')
				}
			});
		},
		methods: {
			...mapMutations(['saveFormData']),
			saveImg() {
				let arr = new Array(this.src);
				let tempArr = this.imgSrcList;
				tempArr = tempArr.concat(arr);
				this.saveFormData({imgs: tempArr});
			},
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath;
						this.saveImg();
					},
					fail: (res) => {
						this.HMmessages.show('请确认是否打开摄像头权限！', {icon: 'error', closeButton: true, duration: 3000})
					}
				});
			},
			error(e) {
				console.log(e.detail);
			},
			cameraError(e) {
				console.log(' camera error', e.detail);
			},
			cameraStop(e) {
				console.log(' camera stop', e);
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/global.scss';
	
</style>
