<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" previous-margin="25rpx" next-margin="25rpx" interval="4000" circular  autoplay skip-hidden-item-layout>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem" >
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		computed: {
			imgList() {
				let imgs = [];
				for(let i = 1; i < 7; i ++) {
					imgs.push(this.$staticUrl + '/swiper' + i + '.jpg');
				}
				return imgs;
			}
		},
		data(){
			return {
				currentIndex: 0
			}
		},
		methods: {
			handleChange() {
				this.currentIndex ++;
				if(this.currentIndex == this.imgList.length) {
					this.currentIndex = 0;
				}
			},
		}
	}	
</script>
<style lang="scss">
	// 3D轮播样式
	.imageContainer {
		width: 100%;
		height: 345upx;
		background-color: #fff;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 305upx;
		padding: 0upx 10upx;
		box-sizing: border-box;
		position: relative;
	}
	
	.itemImg {
		position: absolute;
		width: 98%;
		height: 305upx;
		border-radius: 15rpx;
		opacity: 0.7;
		top: 5%;
		
	}
	
	.swiperactive {
		width: 98%;
		opacity: 1;
		height: 340upx;
		top: 0%;
		transition: all .2s ease-in 0s;
		box-shadow: 5upx 10upx 10upx 0upx RGBA(248, 210, 0, .1);
	}
</style>