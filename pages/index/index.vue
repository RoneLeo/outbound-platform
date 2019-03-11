<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="(carousel,index) in carouselList" :key="index">
				<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
		</swiper>
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
			<scroll-view scroll-x="true" class="page-block hot">
				<view class="single-post" v-for="hot in hots" :key="index">
					<view class="post-wrapper">
						<image :src="hot.cover" class="poster" ></image>
						<view class="movie-name">{{hot.name}}}</view>
						<view class="movie-score-wrapper">
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-gray.png" class="star-icon"></image>
							<view class="movie-score">
								{{hot.score}}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Stars from '../../components/trailerStars.vue'
	export default {
		components: {
			Stars
		},
		data() {
			return {
				title: 'Hello',
				carouselList: [],
				hots: []
			}
		},
		// 页面加载
		onLoad() {
			uni.request({
				url: this.$url + '/index/carousel/list', //仅为示例，并非真实接口地址。
				method: 'POST',
				success: (res) => {
					let data = res.data;
					if(data.status === 200) {
						this.carouselList = data.data;
					}
					console.log(res.data, this.carouselList);
					// this.text = 'request success';
				}
			});
			
			uni.request({
				url: this.$url + '/index/movie/hot?type=superhero', //仅为示例，并非真实接口地址。
				method: 'POST',
				success: (res) => {
					let data = res.data;
					if(data.status === 200) {
						this.hots = data.data;
					}
					console.log(res.data, this.hots);
					// this.text = 'request success';
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
</style>
